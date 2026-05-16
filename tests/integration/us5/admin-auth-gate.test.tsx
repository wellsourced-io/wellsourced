/**
 * US5 — admin auth gate (FR-022).
 *
 * Verifies the middleware contract for `/[locale]/admin/*`:
 *   - No `ws-session` cookie → 307 redirect to
 *     `/[locale]/contribute?next=<original-path-with-query>`.
 *   - With a valid `ws-session` cookie → pass-through (200) and
 *     `x-pathname` header set so server components can read it.
 *   - Non-admin authenticated paths are unaffected (locale pass-through
 *     remains the default for everything outside `/admin/*`).
 */

import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

function makeRequest(url: string, cookieHeader?: string) {
  const headers: Record<string, string> = {
    "accept-language": "en-US,en;q=0.9",
  };
  if (cookieHeader) headers["cookie"] = cookieHeader;
  return new NextRequest(url, { headers });
}

describe("US5 — admin auth gate", () => {
  it("redirects /en/admin without ws-session cookie to /en/contribute?next=...", () => {
    const res = middleware(makeRequest("http://localhost/en/admin"));
    expect(res.status).toBe(307);
    const location = res.headers.get("location");
    expect(location).not.toBeNull();
    const url = new URL(location!);
    expect(url.pathname).toBe("/en/contribute");
    expect(url.searchParams.get("next")).toBe("/en/admin");
  });

  it("redirects nested admin paths and preserves the full original path + query", () => {
    const res = middleware(
      makeRequest(
        "http://localhost/en/admin/suggest?brand=patagonia&field=ownership_type",
      ),
    );
    expect(res.status).toBe(307);
    const url = new URL(res.headers.get("location")!);
    expect(url.pathname).toBe("/en/contribute");
    expect(url.searchParams.get("next")).toBe(
      "/en/admin/suggest?brand=patagonia&field=ownership_type",
    );
  });

  it("passes through /en/admin when a ws-session cookie is present", () => {
    const res = middleware(
      makeRequest("http://localhost/en/admin", "ws-session=user-123|established"),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
    expect(res.headers.get("x-pathname")).toBe("/en/admin");
  });

  it("passes through nested admin paths with a ws-session cookie", () => {
    const res = middleware(
      makeRequest(
        "http://localhost/en/admin/queue",
        "ws-session=user-123|moderator",
      ),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("x-pathname")).toBe("/en/admin/queue");
  });

  it("does NOT auth-gate /en/contribute (the auth landing page)", () => {
    const res = middleware(makeRequest("http://localhost/en/contribute"));
    expect(res.status).toBe(200);
    expect(res.headers.get("x-pathname")).toBe("/en/contribute");
  });

  it("does NOT auth-gate other locale-prefixed paths", () => {
    const res = middleware(makeRequest("http://localhost/en/brand/patagonia"));
    expect(res.status).toBe(200);
    expect(res.headers.get("x-pathname")).toBe("/en/brand/patagonia");
  });
});
