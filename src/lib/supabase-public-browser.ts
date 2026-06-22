import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let publicBrowserClient: SupabaseClient | null = null;

export function getSupabasePublicBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  if (!publicBrowserClient) {
    publicBrowserClient = createClient(url, anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return publicBrowserClient;
}
