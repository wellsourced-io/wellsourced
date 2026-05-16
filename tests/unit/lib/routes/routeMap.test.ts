/**
 * routeMap invariants (T033 in tasks.md).
 *
 * Locks the source-of-truth IA contract from spec 001-ia-navigation:
 *   - 15 routes (FR-001)
 *   - 4 header-nav entries (FR-005)
 *   - i18n parity (routes/messages cannot drift)
 *   - active-section inference (R10)
 */

import { describe, it, expect } from "vitest";
import {
  routeMap,
  getActiveSection,
  headerNavRoutes,
  footerGroups,
  getPageByPath,
} from "@/lib/routes/routeMap";
import en from "@/lib/i18n/messages/en.json";

describe("routeMap invariants", () => {
  it("contains exactly 15 entries", () => {
    expect(routeMap).toHaveLength(15);
  });

  it("has unique paths", () => {
    const paths = routeMap.map((p) => p.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("has unique ids", () => {
    const ids = routeMap.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has exactly 4 header-nav entries (FR-005)", () => {
    const headerEntries = routeMap.filter((p) => p.headerNav);
    expect(headerEntries).toHaveLength(4);
  });

  it("every route id has a matching i18n key under routes.*", () => {
    const dictKeys = Object.keys(
      (en as { routes: Record<string, unknown> }).routes,
    );
    const missing: string[] = [];
    for (const page of routeMap) {
      if (!dictKeys.includes(page.id)) missing.push(page.id);
    }
    expect(missing).toEqual([]);
  });
});

describe("getActiveSection", () => {
  it.each<[string, string | null]>([
    ["/search", "discover"],
    ["/brand/foo", "profile"],
    ["/brand/foo/products", "profile"],
    ["/c/foo", "discover"],
    ["/about", "about"],
    ["/manifesto", "about"],
    ["/unknown", null],
    ["/", "discover"],
    ["/en/search", "discover"],
  ])("getActiveSection(%j) → %j", (path, expected) => {
    expect(getActiveSection(path)).toBe(expected);
  });
});

describe("headerNavRoutes", () => {
  it("returns 4 entries with ids matching FR-005 (search, brands, categories, about)", () => {
    const entries = headerNavRoutes();
    expect(entries).toHaveLength(4);
    const ids = entries.map((e) => e.id).sort();
    expect(ids).toEqual(["about", "brands", "categories", "search"]);
  });
});

describe("footerGroups", () => {
  it("returns a record containing all 5 FooterGroup keys", () => {
    const groups = footerGroups();
    const keys = Object.keys(groups).sort();
    expect(keys).toEqual(
      ["about", "contribute", "discover", "operators", "system"].sort(),
    );
  });

  it("every footer group is an array", () => {
    const groups = footerGroups();
    for (const value of Object.values(groups)) {
      expect(Array.isArray(value)).toBe(true);
    }
  });
});

describe("getPageByPath", () => {
  it("resolves /en/brand/foo → brand profile entry (strips locale, matches [slug])", () => {
    const page = getPageByPath("/en/brand/foo");
    expect(page).not.toBeNull();
    expect(page?.id).toBe("brand");
    expect(page?.path).toBe("/brand/[slug]");
  });

  it("resolves /en/brand/foo/products → brand-products entry (longest-prefix wins)", () => {
    const page = getPageByPath("/en/brand/foo/products");
    expect(page?.id).toBe("brand-products");
  });

  it("returns null for unknown paths", () => {
    expect(getPageByPath("/no-such-path")).toBeNull();
  });

  it("resolves homepage", () => {
    const page = getPageByPath("/en");
    expect(page?.id).toBe("home");
  });
});
