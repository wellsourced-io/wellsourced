import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key. Use ONLY in
 * route handlers, server actions, and other server-only contexts — the
 * service key bypasses RLS and must never reach the browser.
 *
 * For client-side / RLS-safe access, a separate `client.ts` will export an
 * anon-key client (not built in this feature — added when contributor auth
 * UI lands).
 */

let cached: SupabaseClient | null = null;

export function getServiceClient(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase service credentials missing: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY",
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
