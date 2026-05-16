/**
 * US1 — verifies FR-007: hero search on `/`, compact in header on `/search`.
 * We can't render AppShell directly because it depends on Next.js `headers()`
 * (server-only API). Instead we assert the structural rules at the
 * routeMap + helper level — the same source of truth AppShell reads.
 */
import { describe, expect, it } from "vitest";
import { getPageByPath } from "@/lib/routes/routeMap";

describe("US1 — FR-007: hero vs compact search wiring", () => {
  it("the homepage route does NOT enable sticky header", () => {
    const home = getPageByPath("/en/");
    expect(home).not.toBeNull();
    expect(home?.stickyHeader).toBe(false);
  });

  it("the /search route enables sticky header so compact search stays visible while refining", () => {
    const search = getPageByPath("/en/search");
    expect(search).not.toBeNull();
    expect(search?.stickyHeader).toBe(true);
  });

  it("the homepage is in the discover section (active state of Find/Brands/Categories cluster)", () => {
    const home = getPageByPath("/en/");
    expect(home?.section).toBe("discover");
  });

  it("the homepage targets James — the search-first persona", () => {
    const home = getPageByPath("/en/");
    expect(home?.primaryPersona).toBe("james");
  });
});
