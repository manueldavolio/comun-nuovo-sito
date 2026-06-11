import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase (sola lettura, anon key) per i contenuti del CMS.
 * Ritorna `null` se le variabili d'ambiente non sono configurate:
 * in quel caso il sito usa i contenuti statici / placeholder.
 */
export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
