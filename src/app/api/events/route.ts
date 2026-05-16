import { NextResponse, type NextRequest } from "next/server";
import { deriveSessionId } from "@/lib/analytics/sessionId";
import { PII_KEYS, type EventName } from "@/lib/analytics/events";
import { getServiceClient } from "@/lib/supabase/server";

/**
 * POST /api/events
 *
 * Receives anonymous beacons from `src/lib/analytics/beacon.ts` and appends
 * to `nav_events`. Per FR-036 the handler MUST NOT block navigation:
 * any database failure is swallowed and returns 204.
 */

const ALLOWED_EVENT_NAMES = new Set<EventName>([
  "page_view",
  "search_submit",
  "filter_apply",
  "filter_remove",
  "nav_click",
  "drawer_open",
  "theme_change",
  "signin_initiated",
  "signin_completed",
  "buy_direct_clicked",
]);

const ALLOWED_REFERRER = new Set([
  "internal",
  "external",
  "search_engine",
  "direct",
]);
const ALLOWED_VIEWPORT = new Set(["mobile", "tablet", "desktop"]);

// Naive in-memory rate limiter — 200 events/min per session_hash. Acceptable
// for MVP scale (~50k events/day spread across many sessions). A future
// release can swap in a Redis-backed limiter when traffic justifies it.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 200;
const sessionCounters = new Map<string, { count: number; windowStart: number }>();

function checkRateLimit(sessionHash: string): {
  ok: boolean;
  retryAfter?: number;
} {
  const now = Date.now();
  const entry = sessionCounters.get(sessionHash);
  if (!entry || now - entry.windowStart >= RATE_LIMIT_WINDOW_MS) {
    sessionCounters.set(sessionHash, { count: 1, windowStart: now });
    return { ok: true };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - entry.windowStart)) / 1000,
    );
    return { ok: false, retryAfter };
  }
  entry.count += 1;
  return { ok: true };
}

interface IncomingEvent {
  event_name?: unknown;
  path?: unknown;
  viewport_bucket?: unknown;
  referrer_category?: unknown;
  locale?: unknown;
  meta?: unknown;
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function badRequest(error: string): NextResponse {
  return NextResponse.json({ error }, { status: 400 });
}

function validate(payload: IncomingEvent): {
  ok: true;
  data: {
    event_name: EventName;
    path: string;
    viewport_bucket: string;
    referrer_category: string;
    locale: string;
    meta: Record<string, unknown>;
  };
} | {
  ok: false;
  reason: string;
} {
  if (typeof payload.event_name !== "string") {
    return { ok: false, reason: "event_name is required" };
  }
  if (!ALLOWED_EVENT_NAMES.has(payload.event_name as EventName)) {
    return { ok: false, reason: `unknown event_name: ${payload.event_name}` };
  }
  if (typeof payload.path !== "string" || !payload.path.startsWith("/")) {
    return { ok: false, reason: "path must start with /" };
  }
  if (payload.path.length > 512) {
    return { ok: false, reason: "path too long" };
  }
  if (
    typeof payload.viewport_bucket !== "string" ||
    !ALLOWED_VIEWPORT.has(payload.viewport_bucket)
  ) {
    return { ok: false, reason: "invalid viewport_bucket" };
  }
  if (
    typeof payload.referrer_category !== "string" ||
    !ALLOWED_REFERRER.has(payload.referrer_category)
  ) {
    return { ok: false, reason: "invalid referrer_category" };
  }

  let locale = "en";
  if (payload.locale !== undefined) {
    if (
      typeof payload.locale !== "string" ||
      !/^[a-z]{2}(-[A-Z]{2})?$/.test(payload.locale)
    ) {
      return { ok: false, reason: "invalid locale" };
    }
    locale = payload.locale;
  }

  let meta: Record<string, unknown> = {};
  if (payload.meta !== undefined) {
    if (!isObject(payload.meta)) {
      return { ok: false, reason: "meta must be an object" };
    }
    for (const piiKey of PII_KEYS) {
      if (piiKey in payload.meta) {
        return { ok: false, reason: "PII detected in meta payload" };
      }
    }
    meta = payload.meta;
  }

  return {
    ok: true,
    data: {
      event_name: payload.event_name as EventName,
      path: payload.path,
      viewport_bucket: payload.viewport_bucket,
      referrer_category: payload.referrer_category,
      locale,
      meta,
    },
  };
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: IncomingEvent;
  try {
    body = (await request.json()) as IncomingEvent;
  } catch {
    return badRequest("malformed JSON");
  }

  const result = validate(body);
  if (!result.ok) {
    return badRequest(result.reason);
  }

  // Derive session ID from request metadata; throws only if env is missing.
  let sessionHash: string;
  try {
    sessionHash = deriveSessionId(request);
  } catch {
    // Misconfiguration — return 204 to preserve FR-036 (never block nav).
    return new NextResponse(null, { status: 204 });
  }

  const limit = checkRateLimit(sessionHash);
  if (!limit.ok) {
    const res = new NextResponse(null, { status: 429 });
    if (limit.retryAfter) {
      res.headers.set("Retry-After", String(limit.retryAfter));
    }
    return res;
  }

  // Best-effort insert. Per FR-036 we never surface DB errors.
  try {
    const client = getServiceClient();
    await client.from("nav_events").insert({
      event_name: result.data.event_name,
      session_hash: sessionHash,
      path: result.data.path,
      referrer_category: result.data.referrer_category,
      viewport_bucket: result.data.viewport_bucket,
      locale: result.data.locale,
      meta: result.data.meta,
    });
  } catch {
    // Swallow — chrome stays functional even if instrumentation is down.
  }

  return new NextResponse(null, { status: 204 });
}
