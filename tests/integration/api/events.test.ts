/**
 * /api/events POST handler — FR-033, FR-036, OpenAPI contract.
 *
 * Mocks `@/lib/supabase/server` to avoid Supabase network I/O. Asserts:
 *   - Valid payloads → 204.
 *   - Validation errors → 400 with descriptive body.
 *   - PII rejection.
 *   - FR-036 resilience: DB rejections still return 204.
 *   - Naive in-memory rate limit → 429 after 200/min per session.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { NextRequest } from "next/server";

// `vi.hoisted` lets us define mocks that are accessible inside the
// hoisted `vi.mock` factory while staying typed and visible to tests.
const mocks = vi.hoisted(() => {
  const insertMock = vi.fn(async () => ({ error: null }));
  const fromMock = vi.fn(() => ({ insert: insertMock }));
  return { insertMock, fromMock };
});

vi.mock("@/lib/supabase/server", () => ({
  getServiceClient: () => ({ from: mocks.fromMock }),
}));

const { insertMock } = mocks;

const BASE_BODY = {
  event_name: "page_view" as const,
  path: "/en/search",
  viewport_bucket: "desktop" as const,
  referrer_category: "direct" as const,
};

function makePost(body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest("http://localhost/api/events", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "203.0.113.10",
      "user-agent": "test-agent/1.0",
      ...headers,
    },
  });
}

describe("POST /api/events", () => {
  beforeEach(() => {
    process.env.SESSION_HASH_SECRET = "test-secret";
    insertMock.mockReset();
    insertMock.mockResolvedValue({ error: null });
    mocks.fromMock.mockClear();
    // Reset rate-limit state inside the route module by re-importing.
    vi.resetModules();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("valid page_view payload → 204", async () => {
    const mod = await import("@/app/api/events/route");
    const res = await mod.POST(makePost(BASE_BODY));
    expect(res.status).toBe(204);
  });

  it("missing event_name → 400 with error body", async () => {
    const mod = await import("@/app/api/events/route");
    const body: Record<string, unknown> = { ...BASE_BODY };
    delete body.event_name;
    const res = await mod.POST(makePost(body));
    expect(res.status).toBe(400);
    const json = (await res.json()) as { error: string };
    expect(json.error).toMatch(/event_name/);
  });

  it("unknown event_name → 400", async () => {
    const mod = await import("@/app/api/events/route");
    const res = await mod.POST(
      makePost({ ...BASE_BODY, event_name: "not_a_real_event" }),
    );
    expect(res.status).toBe(400);
    const json = (await res.json()) as { error: string };
    expect(json.error).toMatch(/unknown event_name/);
  });

  it("invalid viewport_bucket → 400", async () => {
    const mod = await import("@/app/api/events/route");
    const res = await mod.POST(
      makePost({ ...BASE_BODY, viewport_bucket: "phablet" }),
    );
    expect(res.status).toBe(400);
    const json = (await res.json()) as { error: string };
    expect(json.error).toMatch(/viewport_bucket/);
  });

  it("path not starting with / → 400", async () => {
    const mod = await import("@/app/api/events/route");
    const res = await mod.POST(makePost({ ...BASE_BODY, path: "search" }));
    expect(res.status).toBe(400);
    const json = (await res.json()) as { error: string };
    expect(json.error).toMatch(/path/);
  });

  it("PII in meta (email) → 400 with 'PII detected'", async () => {
    const mod = await import("@/app/api/events/route");
    const res = await mod.POST(
      makePost({ ...BASE_BODY, meta: { email: "leaked@example.com" } }),
    );
    expect(res.status).toBe(400);
    const json = (await res.json()) as { error: string };
    expect(json.error).toMatch(/PII detected/);
  });

  it("DB insert rejection → still returns 204 (FR-036 resilience)", async () => {
    const mod = await import("@/app/api/events/route");
    insertMock.mockRejectedValueOnce(new Error("db down"));
    const res = await mod.POST(makePost(BASE_BODY));
    expect(res.status).toBe(204);
  });

  it("201 rapid events on the same session → final returns 429", async () => {
    const mod = await import("@/app/api/events/route");
    // 200 allowed within the window, the 201st must be rejected.
    let lastStatus = 0;
    for (let i = 0; i < 201; i++) {
      const res = await mod.POST(makePost(BASE_BODY));
      lastStatus = res.status;
    }
    expect(lastStatus).toBe(429);
  });
});
