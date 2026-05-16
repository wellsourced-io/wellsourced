/**
 * Locale-redirect middleware — FR-029.
 *
 * Verifies the redirect contract from research.md R2:
 *   - Un-prefixed paths → 308 permanent redirect to /{locale}{path}.
 *   - Query / hash preserved.
 *   - Locale-prefixed paths pass through with an `x-pathname` header.
 */

import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

function makeRequest(url: string, acceptLanguage = "en-US,en;q=0.9") {
  return new NextRequest(url, {
    headers: { "accept-language": acceptLanguage },
  });
}

describe("locale middleware", () => {
  it("redirects /brand/patagonia → /en/brand/patagonia with 308", () => {
    const res = middleware(makeRequest("http://localhost/brand/patagonia"));
    expect(res.status).toBe(308);
    const location = res.headers.get("location");
    expect(location).not.toBeNull();
    const url = new URL(location!);
    expect(url.pathname).toBe("/en/brand/patagonia");
  });

  it("preserves query string on redirect", () => {
    const res = middleware(
      makeRequest("http://localhost/brand/patagonia?foo=bar"),
    );
    expect(res.status).toBe(308);
    const url = new URL(res.headers.get("location")!);
    expect(url.pathname).toBe("/en/brand/patagonia");
    expect(url.searchParams.get("foo")).toBe("bar");
  });

  it("redirects / → /en with 308", () => {
    const res = middleware(makeRequest("http://localhost/"));
    expect(res.status).toBe(308);
    const url = new URL(res.headers.get("location")!);
    expect(url.pathname).toBe("/en");
  });

  it("passes through /en/about with x-pathname header set", () => {
    const res = middleware(makeRequest("http://localhost/en/about"));
    // Pass-through responses from middleware return 200 with no Location.
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
    expect(res.headers.get("x-pathname")).toBe("/en/about");
  });

  it("passes through /en/brand/x", () => {
    const res = middleware(makeRequest("http://localhost/en/brand/x"));
    expect(res.status).toBe(200);
    expect(res.headers.get("x-pathname")).toBe("/en/brand/x");
  });
});
