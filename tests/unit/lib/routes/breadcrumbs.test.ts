import { describe, expect, it } from "vitest";
import { getBreadcrumbTrail } from "@/lib/routes/breadcrumbs";

// Minimal mock dictionary covering the breadcrumb helper's reads.
const mockDictionary = {
  routes: {
    home: { label: "Home" },
    search: { label: "Search" },
    brands: { label: "Brands" },
    brand: { label: "Brand" },
    "brand-products": { label: "Products" },
    categories: { label: "Categories" },
    category: { label: "Category" },
    submit: { label: "Suggest a brand" },
    "for-brands": { label: "For brands" },
    contribute: { label: "Contribute" },
    admin: { label: "Workspace" },
    about: { label: "About" },
    manifesto: { label: "Manifesto" },
    donate: { label: "Donate" },
    design: { label: "Design system" },
  },
  breadcrumb: { backTo: "← {0}" },
};

describe("getBreadcrumbTrail", () => {
  it("returns a trail to the brand profile from /brand/<slug>/products", () => {
    const trail = getBreadcrumbTrail(
      "/en/brand/foo/products",
      mockDictionary,
      { brand: "Foo Brand" },
    );
    expect(trail).toEqual([
      { label: "Foo Brand", href: "/en/brand/foo" },
    ]);
  });

  it("falls back to the slug when no dynamic brand label is supplied", () => {
    const trail = getBreadcrumbTrail("/en/brand/foo/products", mockDictionary);
    expect(trail).toHaveLength(1);
    expect(trail[0].label).toBe("foo");
    expect(trail[0].href).toBe("/en/brand/foo");
  });

  it("returns an empty trail for the brand profile root", () => {
    expect(
      getBreadcrumbTrail("/en/brand/foo", mockDictionary),
    ).toEqual([]);
  });

  it("returns a trail back to /categories from /c/<slug>", () => {
    const trail = getBreadcrumbTrail("/en/c/home-kitchen", mockDictionary);
    expect(trail).toEqual([
      { label: "Categories", href: "/en/categories" },
    ]);
  });

  it("returns no trail for top-level editorial pages", () => {
    expect(getBreadcrumbTrail("/en/about", mockDictionary)).toEqual([]);
    expect(getBreadcrumbTrail("/en/manifesto", mockDictionary)).toEqual([]);
    expect(getBreadcrumbTrail("/en/donate", mockDictionary)).toEqual([]);
  });

  it("returns no trail for the homepage", () => {
    expect(getBreadcrumbTrail("/en/", mockDictionary)).toEqual([]);
    expect(getBreadcrumbTrail("/en", mockDictionary)).toEqual([]);
  });

  it("starts admin sub-page trails with a link to /admin", () => {
    const trail = getBreadcrumbTrail("/en/admin/suggest", mockDictionary);
    expect(trail.length).toBeGreaterThanOrEqual(1);
    expect(trail[0]).toEqual({ label: "Workspace", href: "/en/admin" });
  });
});
