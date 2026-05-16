/**
 * MVP session helper.
 *
 * The real OAuth + Supabase wiring is a follow-up feature. At MVP, the
 * contributor workspace gate is driven by a simple, opaque `ws-session`
 * cookie with the form `userId|tier`. Any other shape returns null
 * (treated as signed-out). This keeps the route surface area testable and
 * lets the rest of US5 build out without blocking on the auth provider.
 *
 * The shape of `Session` is the contract real auth will satisfy, so
 * downstream consumers (layouts, middleware, AccountMenu) don't need to
 * change when the placeholder is replaced.
 */

import { cookies } from "next/headers";

export type ContributorTier = "new" | "established" | "moderator";

export type Session = { userId: string; tier: ContributorTier } | null;

const TIERS: readonly ContributorTier[] = ["new", "established", "moderator"];

/**
 * Parse a raw `ws-session` cookie value into a typed `Session`. Pure (no
 * I/O), exposed for tests so the parsing rules are exercisable without
 * touching `next/headers`.
 *
 * Accepts `"<userId>|<tier>"` where `<tier>` ∈ {`new`, `established`,
 * `moderator`} and `<userId>` is a non-empty string. Returns `null` for
 * any other input.
 */
export function parseSessionCookie(raw: string | undefined): Session {
  if (!raw) return null;
  const sep = raw.indexOf("|");
  if (sep <= 0 || sep === raw.length - 1) return null;
  const userId = raw.slice(0, sep);
  const tier = raw.slice(sep + 1);
  if (!userId) return null;
  if (!TIERS.includes(tier as ContributorTier)) return null;
  return { userId, tier: tier as ContributorTier };
}

/**
 * Read the contributor session from the request's cookies in a Server
 * Component-safe way. Returns null when signed-out or when the cookie is
 * malformed.
 */
export async function getSession(): Promise<Session> {
  const store = await cookies();
  const raw = store.get("ws-session")?.value;
  return parseSessionCookie(raw);
}

/**
 * Tier-gating helper used by the AccountMenu and the workspace sidebar.
 * Mirrors the rule in FR-021: the "Workspace" affordance is only shown to
 * established and moderator contributors — `new` contributors don't see it
 * surfaced in the consumer chrome (they still reach `/admin/contributions`
 * via direct link).
 */
export function isEstablishedTier(tier: ContributorTier | undefined): boolean {
  return tier === "established" || tier === "moderator";
}
