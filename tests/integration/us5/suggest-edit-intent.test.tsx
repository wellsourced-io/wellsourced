/**
 * US5 — suggest-edit intent round-trip (FR-022).
 *
 * The flow being verified:
 *   1. Signed-out user clicks "Suggest an edit" on a brand profile,
 *      which links to `/[locale]/admin/suggest?brand=...&field=...`.
 *   2. Middleware sees no `ws-session` cookie and redirects to
 *      `/[locale]/contribute?next=<the-original-path-with-query>`.
 *   3. After the (future) OAuth callback sets the cookie, the user is
 *      returned to the original URL with both query params intact.
 *
 * At MVP we can't drive a real OAuth callback, but we CAN assert the URL
 * contract: the encoded `next` survives the redirect and decodes back to
 * the exact intent the user clicked.
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

describe("US5 — suggest-edit intent survives the auth round-trip", () => {
  it("encodes brand + field params into the `next` query when redirecting unauthenticated users", () => {
    const original =
      "/en/admin/suggest?brand=patagonia&field=ownership_type";
    const res = middleware(makeRequest(`http://localhost${original}`));
    expect(res.status).toBe(307);
    const location = res.headers.get("location");
    expect(location).not.toBeNull();
    const url = new URL(location!);

    expect(url.pathname).toBe("/en/contribute");
    // `next` must be a percent-encoded copy of the original path+query.
    const next = url.searchParams.get("next");
    expect(next).toBe(original);

    // The raw redirect target's query string MUST contain the percent-encoded
    // form (not raw `&` / `?` inside `next`), otherwise downstream consumers
    // can't reliably parse it.
    const rawSearch = url.search;
    expect(rawSearch).toContain("next=");
    expect(rawSearch).toContain(encodeURIComponent("?brand=patagonia"));
    expect(rawSearch).toContain(encodeURIComponent("&field=ownership_type"));
  });

  it("preserves the intent unchanged when decoded — same URL the user clicked", () => {
    const original =
      "/en/admin/suggest?brand=field-and-forge&field=country_hq";
    const res = middleware(makeRequest(`http://localhost${original}`));
    const url = new URL(res.headers.get("location")!);
    const decoded = url.searchParams.get("next");
    expect(decoded).toBe(original);

    // Round-trip: parse `next` as a URL and recover the original params.
    const recovered = new URL(`http://localhost${decoded!}`);
    expect(recovered.pathname).toBe("/en/admin/suggest");
    expect(recovered.searchParams.get("brand")).toBe("field-and-forge");
    expect(recovered.searchParams.get("field")).toBe("country_hq");
  });

  it("passes through to the suggest page when the user IS authenticated", () => {
    const res = middleware(
      makeRequest(
        "http://localhost/en/admin/suggest?brand=patagonia&field=ownership_type",
        "ws-session=user-123|new",
      ),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
    expect(res.headers.get("x-pathname")).toBe("/en/admin/suggest");
  });

  it("handles a suggest URL with no params (no field/brand context) without crashing", () => {
    const original = "/en/admin/suggest";
    const res = middleware(makeRequest(`http://localhost${original}`));
    expect(res.status).toBe(307);
    const url = new URL(res.headers.get("location")!);
    expect(url.searchParams.get("next")).toBe(original);
  });
});
