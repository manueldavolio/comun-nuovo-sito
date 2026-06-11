import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase per il pannello admin (lato browser).
 * A differenza di `getSupabaseClient` mantiene la sessione di Supabase Auth
 * (login email + password) in localStorage.
 * Ritorna `null` se le variabili d'ambiente non sono configurate.
 */
let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  if (!browserClient) {
    browserClient = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: "cn-admin-auth",
      },
    });
  }

  return browserClient;
}
