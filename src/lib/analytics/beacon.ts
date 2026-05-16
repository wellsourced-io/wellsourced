/**
 * Client-only beacon transport per FR-033 / FR-036 and research.md R5.
 *
 * Fire-and-forget: never awaits, never throws, never blocks navigation. Safe
 * to import from SSR contexts — all functions guard for missing browser
 * globals.
 */

import type { EventPayload, ReferrerCategory, ViewportBucket } from './events';

/** Hostname substrings that classify a referrer as a search engine. */
const SEARCH_ENGINE_HOSTS = [
  'google.',
  'bing.',
  'duckduckgo.',
  'ecosia.',
  'yahoo.',
  'baidu.',
  'yandex.',
  'brave.com',
  'kagi.com',
  'startpage.com',
  'qwant.com',
];

/**
 * Post a single navigation event to `/api/events` using the beacon API, with
 * a `fetch(..., { keepalive: true })` fallback when `sendBeacon` is
 * unavailable or refuses the request.
 *
 * Per FR-036: this MUST NOT surface errors, MUST NOT block navigation, and
 * MUST return synchronously. It is a no-op when called during SSR.
 */
export function sendEvent(event: EventPayload): void {
  if (typeof navigator === 'undefined') return;

  // Wire format uses `event_name` per the OpenAPI contract; internal TS uses
  // `name` as the discriminator. Rename at the boundary so the typed surface
  // stays idiomatic without coupling to the API field name.
  const { name, ...rest } = event;
  const body = JSON.stringify({ event_name: name, ...rest });

  const beacon = navigator.sendBeacon?.bind(navigator);
  if (beacon) {
    try {
      const blob = new Blob([body], { type: 'application/json' });
      if (beacon('/api/events', blob)) return;
    } catch {
      // Some browsers throw on oversized payloads — fall through to fetch.
    }
  }

  try {
    void fetch('/api/events', {
      method: 'POST',
      body,
      headers: { 'content-type': 'application/json' },
      keepalive: true,
    }).catch(() => {
      /* FR-036: never surface, never block */
    });
  } catch {
    /* FR-036: never surface, never block */
  }
}

/**
 * Bucket `window.innerWidth` into the three viewport buckets used by
 * `nav_events.viewport_bucket`. Returns `'desktop'` in SSR contexts so the
 * function is safely callable anywhere (the value is overwritten before the
 * first real beacon fires from the client).
 */
export function getViewportBucket(): ViewportBucket {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Classify a referrer string into one of the four buckets used by
 * `nav_events.referrer_category`. Pure function — accepts `currentOrigin`
 * so it can be unit-tested without `window`.
 *
 *   - empty string  → 'direct'
 *   - search engine → 'search_engine'
 *   - same origin   → 'internal'
 *   - otherwise     → 'external'
 *
 * Unparseable referrers fall through to 'external' rather than throwing.
 */
export function getReferrerCategory(
  referrer: string,
  currentOrigin?: string,
): ReferrerCategory {
  if (referrer === '') return 'direct';

  let host: string;
  let origin: string;
  try {
    const url = new URL(referrer);
    host = url.hostname.toLowerCase();
    origin = url.origin;
  } catch {
    return 'external';
  }

  if (SEARCH_ENGINE_HOSTS.some((needle) => host.includes(needle))) {
    return 'search_engine';
  }

  if (currentOrigin && origin === currentOrigin) {
    return 'internal';
  }

  return 'external';
}
