/**
 * Server-only session ID derivation per FR-034 and research.md R6.
 *
 * Anonymous, per-request derivation: `sha256(ip|ua|bucket|secret)`. Bucket is
 * floor(now / 30min), giving a rotation guarantee by construction:
 *
 *   - Two events from the same client within the same 30-minute wall-clock
 *     bucket → identical session ID. This is what the SC-001 / SC-002 / SC-009
 *     success-criteria queries need in order to sessionize events.
 *   - Two events that straddle a 30-minute boundary → different IDs. A user
 *     who returns 31 minutes later is treated as a new session.
 *
 * Never persists state. No cookies, no client-side identifier. The raw IP
 * and user agent never leave this function — only their hashed digest does.
 */

import { createHash } from 'node:crypto';

/** Subset of `Request`/`NextRequest` headers needed for derivation. */
interface RequestLike {
  headers: { get(name: string): string | null };
}

/**
 * Derive a 30-minute-rotating anonymous session hash for the request.
 *
 * @throws Error if `SESSION_HASH_SECRET` is not set. The secret is required
 *   to prevent reverse engineering the session ID from public request
 *   metadata (IP + UA + timestamp would otherwise be guessable).
 */
export function deriveSessionId(request: RequestLike): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() ?? 'unknown';
  const ua = request.headers.get('user-agent') ?? 'unknown';
  const bucket = Math.floor(Date.now() / (30 * 60 * 1000));

  const secret = process.env.SESSION_HASH_SECRET;
  if (!secret) {
    throw new Error('SESSION_HASH_SECRET env var is required');
  }

  return createHash('sha256')
    .update(`${ip}|${ua}|${bucket}|${secret}`)
    .digest('hex');
}
