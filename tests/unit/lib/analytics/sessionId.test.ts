/**
 * deriveSessionId — R6 / FR-034.
 *
 * Verifies:
 *   - Determinism within a 30-minute bucket.
 *   - Rotation across bucket boundaries.
 *   - Sensitivity to IP / UA.
 *   - Output is a 64-char hex sha256 digest.
 *   - Raw IP / UA never leak into the output.
 *   - Missing SESSION_HASH_SECRET throws a descriptive error.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { deriveSessionId } from "@/lib/analytics/sessionId";

interface MockHeaders {
  "x-forwarded-for"?: string;
  "user-agent"?: string;
}

function makeRequest(headers: MockHeaders) {
  return {
    headers: {
      get(name: string): string | null {
        const key = name.toLowerCase() as keyof MockHeaders;
        return headers[key] ?? null;
      },
    },
  };
}

const BASE_HEADERS: MockHeaders = {
  "x-forwarded-for": "203.0.113.42",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
};

describe("deriveSessionId", () => {
  beforeEach(() => {
    process.env.SESSION_HASH_SECRET = "test-secret-deterministic";
    vi.useFakeTimers();
    // Pin to an arbitrary instant mid-bucket so we can advance freely.
    vi.setSystemTime(new Date("2026-05-15T10:05:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("produces identical IDs for the same request within the same 30-min bucket", () => {
    const req = makeRequest(BASE_HEADERS);
    const first = deriveSessionId(req);
    vi.advanceTimersByTime(20 * 60 * 1000); // +20 minutes, still same bucket
    const second = deriveSessionId(req);
    expect(first).toBe(second);
  });

  it("produces different IDs across a 30-min bucket boundary", () => {
    const req = makeRequest(BASE_HEADERS);
    const first = deriveSessionId(req);
    vi.advanceTimersByTime(31 * 60 * 1000); // +31 minutes
    const second = deriveSessionId(req);
    expect(first).not.toBe(second);
  });

  it("produces different IDs for different IPs", () => {
    const a = deriveSessionId(
      makeRequest({ ...BASE_HEADERS, "x-forwarded-for": "203.0.113.1" }),
    );
    const b = deriveSessionId(
      makeRequest({ ...BASE_HEADERS, "x-forwarded-for": "203.0.113.99" }),
    );
    expect(a).not.toBe(b);
  });

  it("produces different IDs for different user-agents", () => {
    const a = deriveSessionId(
      makeRequest({ ...BASE_HEADERS, "user-agent": "Mozilla/5.0 (UA-A)" }),
    );
    const b = deriveSessionId(
      makeRequest({ ...BASE_HEADERS, "user-agent": "Mozilla/5.0 (UA-B)" }),
    );
    expect(a).not.toBe(b);
  });

  it("returns a 64-char hex string (sha256)", () => {
    const id = deriveSessionId(makeRequest(BASE_HEADERS));
    expect(id).toMatch(/^[0-9a-f]{64}$/);
  });

  it("never embeds raw IP or UA in the output", () => {
    const id = deriveSessionId(makeRequest(BASE_HEADERS));
    expect(id).not.toContain("203.0.113.42");
    expect(id.toLowerCase()).not.toContain("mozilla");
    expect(id.toLowerCase()).not.toContain("macintosh");
  });

  it("throws a descriptive error when SESSION_HASH_SECRET is unset", () => {
    delete process.env.SESSION_HASH_SECRET;
    expect(() => deriveSessionId(makeRequest(BASE_HEADERS))).toThrowError(
      /SESSION_HASH_SECRET/,
    );
  });
});
