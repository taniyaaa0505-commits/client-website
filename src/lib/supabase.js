import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// True only when real credentials are present. The rest of the app can check
// this to show a friendly state instead of firing doomed network calls.
export const isSupabaseConfigured = Boolean(
  url && anonKey && !url.includes('your-project-ref')
)

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase is not configured yet. The site renders, but the contact form ' +
      'and admin login are inactive until VITE_SUPABASE_URL and ' +
      'VITE_SUPABASE_ANON_KEY are set. See SUPABASE_SETUP.md.'
  )
}

// Fall back to harmless placeholder strings so createClient never throws at
// import time (which would blank the whole page). The anon key is meant to be
// public — it only grants what Row Level Security policies allow.
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  anonKey || 'placeholder-anon-key'
)
