import { describe, expect, it } from "vitest";
import {
  CATEGORIES,
  FEATURED_CATEGORY_SLUGS,
  featuredCategories,
  findCategory,
} from "@/lib/data/categories";

describe("US3 — categories catalog", () => {
  it("has 12 categories covering the planned MVP verticals", () => {
    expect(CATEGORIES.length).toBe(12);
  });

  it("every category has a unique slug, name, and blurb", () => {
    const slugs = new Set(CATEGORIES.map((c) => c.slug));
    expect(slugs.size).toBe(CATEGORIES.length);
    for (const c of CATEGORIES) {
      expect(c.name).toBeTruthy();
      expect(c.blurb).toBeTruthy();
    }
  });

  it("the homepage rail has exactly 6 featured categories, all valid slugs", () => {
    expect(FEATURED_CATEGORY_SLUGS).toHaveLength(6);
    for (const slug of FEATURED_CATEGORY_SLUGS) {
      expect(findCategory(slug)).not.toBeNull();
    }
  });

  it("featuredCategories() returns the 6 in order", () => {
    const featured = featuredCategories();
    expect(featured.map((c) => c.slug)).toEqual(FEATURED_CATEGORY_SLUGS);
  });

  it("findCategory returns null for unknown slugs", () => {
    expect(findCategory("not-a-real-category")).toBeNull();
  });
});
