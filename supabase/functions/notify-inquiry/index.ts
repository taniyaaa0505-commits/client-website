// Supabase Edge Function: emails the admin when a new inquiry is inserted.
//
// Triggered by a Database Webhook on `public.inquiries` (INSERT). Sends the
// email through Resend (https://resend.com). All secrets stay server-side —
// nothing here ships to the browser.
//
// Required function secrets (set with `supabase secrets set ...`):
//   RESEND_API_KEY  – your Resend API key
//   NOTIFY_FROM     – verified sender, e.g. "Widespread <noreply@yourdomain.com>"
//                     (for testing you can use "onboarding@resend.dev")
//   NOTIFY_TO       – where notifications go, e.g. "you@gmail.com"
//   WEBHOOK_SECRET  – shared secret; the webhook must send it as
//                     "Authorization: Bearer <WEBHOOK_SECRET>"

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const NOTIFY_FROM = Deno.env.get('NOTIFY_FROM') ?? 'onboarding@resend.dev'
const NOTIFY_TO = Deno.env.get('NOTIFY_TO')
const WEBHOOK_SECRET = Deno.env.get('WEBHOOK_SECRET')

const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

serve(async (req) => {
  // Reject anything that doesn't present the shared secret.
  if (WEBHOOK_SECRET) {
    const auth = req.headers.get('Authorization')
    if (auth !== `Bearer ${WEBHOOK_SECRET}`) {
      return new Response('Unauthorized', { status: 401 })
    }
  }

  if (!RESEND_API_KEY || !NOTIFY_TO) {
    console.error('Missing RESEND_API_KEY or NOTIFY_TO secret.')
    return new Response('Server not configured', { status: 500 })
  }

  let record: Record<string, unknown> = {}
  try {
    const body = await req.json()
    record = body.record ?? body
  } catch {
    return new Response('Bad request', { status: 400 })
  }

  const name = esc(record.name) || 'Someone'
  const rows = [
    ['Name', record.name],
    ['Phone', record.phone],
    ['Email', record.email],
    ['City', record.city],
    ['Type', record.type],
    ['Message', record.message],
  ]
    .filter(([, v]) => v)
    .map(
      ([label, v]) =>
        `<tr><td style="padding:6px 12px;color:#78716c;font-weight:600">${label}</td>` +
        `<td style="padding:6px 12px;color:#1c1917">${esc(v)}</td></tr>`
    )
    .join('')

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
      <h2 style="color:#1c1917">New inquiry from ${name}</h2>
      <table style="border-collapse:collapse;width:100%;background:#fafaf9;border-radius:12px">${rows}</table>
      <p style="color:#a8a29e;font-size:12px;margin-top:16px">
        Sent automatically from your Widespread Distribution website.
      </p>
    </div>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: NOTIFY_TO.split(',').map((s) => s.trim()),
      reply_to: typeof record.email === 'string' ? record.email : undefined,
      subject: `New inquiry: ${name}`,
      html,
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    console.error('Resend error:', res.status, detail)
    return new Response('Email failed', { status: 502 })
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
