# Email notifications on new inquiries

When a visitor submits the contact form, a Supabase **Edge Function**
(`supabase/functions/notify-inquiry`) emails you the details via
[Resend](https://resend.com). It's triggered by a **Database Webhook** on the
`inquiries` table, so the email API key stays server-side and never ships to
the browser.

Prerequisite: you've completed [SUPABASE_SETUP.md](SUPABASE_SETUP.md).

## 1. Get a Resend API key

1. Sign up free at [resend.com](https://resend.com).
2. **API Keys → Create API Key**, copy it (starts with `re_`).
3. Sending address:
   - **Testing:** use `onboarding@resend.dev` as the sender and send to the
     email you signed up with — works immediately, no domain needed.
   - **Production:** verify your domain (Resend → Domains) and send from
     something like `noreply@yourdomain.com` so mail doesn't land in spam.

## 2. Install the Supabase CLI and link the project

```bash
npm install -g supabase
supabase login
supabase link --project-ref <your-project-ref>   # ref is in your project URL
```

## 3. Set the function secrets

Pick any long random string for `WEBHOOK_SECRET` (e.g. from a password manager).

```bash
supabase secrets set \
  RESEND_API_KEY="re_xxxxxxxx" \
  NOTIFY_FROM="Widespread <onboarding@resend.dev>" \
  NOTIFY_TO="you@gmail.com" \
  WEBHOOK_SECRET="paste-a-long-random-string"
```

`NOTIFY_TO` can be a comma-separated list to notify more than one person.

## 4. Deploy the function

```bash
supabase functions deploy notify-inquiry
```

Note the function URL it prints:
`https://<project-ref>.supabase.co/functions/v1/notify-inquiry`

## 5. Create the Database Webhook

In the Supabase dashboard: **Database → Webhooks → Create a new hook**.

- **Table:** `inquiries`
- **Events:** `Insert` only
- **Type:** HTTP Request → `POST`
- **URL:** the function URL from step 4
- **HTTP Headers:** add one header
  - Name: `Authorization`
  - Value: `Bearer paste-a-long-random-string`  ← the same `WEBHOOK_SECRET`

Save it.

## 6. Test

Submit the contact form on the site (or insert a test row in the SQL editor).
Within a few seconds you should get an email. If not, check
**Edge Functions → notify-inquiry → Logs** in the dashboard.

## Notes

- The `Authorization` header check means only your webhook can trigger the
  function — random callers get a `401`.
- The visitor's email is set as `reply_to`, so you can reply to them directly
  from your inbox.
- Free tiers: Resend ~3,000 emails/month, Supabase Edge Functions 500k
  invocations/month — far more than a contact form needs.
