import { describe, expect, it } from "vitest";
import {
  activeFilterCount,
  emptyState,
  fromSearchParams,
  removeMulti,
  toQueryString,
  toSearchParams,
  toggleMulti,
} from "@/lib/routes/filterParams";

describe("filterParams: round-trip", () => {
  it("emptyState ↔ URL is the empty string", () => {
    const state = emptyState();
    expect(toQueryString(state)).toBe("");
  });

  it("round-trips a fully populated state", () => {
    const params = new URLSearchParams(
      "q=shirts&category=clothing&category=footwear&ownership=worker-owned&certification=b-corp&country=US&price=%24%24&sort=price-asc&tier=3&page=2",
    );
    const state = fromSearchParams(params);
    expect(state).toEqual({
      q: "shirts",
      category: ["clothing", "footwear"],
      ownership: ["worker-owned"],
      certification: ["b-corp"],
      country: ["US"],
      price: "$$",
      sort: "price-asc",
      tier: 3,
      page: 2,
    });
    // Encode then decode → identity
    const restored = fromSearchParams(toSearchParams(state));
    expect(restored).toEqual(state);
  });

  it("default sort and page=1 are omitted from the URL", () => {
    const state = emptyState();
    state.q = "shirts";
    const qs = toQueryString(state);
    expect(qs).toBe("q=shirts");
    expect(qs).not.toContain("sort=");
    expect(qs).not.toContain("page=");
  });
});

describe("filterParams: edge cases", () => {
  it("trims whitespace in q", () => {
    const params = new URLSearchParams("q=  spaced  ");
    expect(fromSearchParams(params).q).toBe("spaced");
  });

  it("ignores unknown sort values", () => {
    const params = new URLSearchParams("sort=nope");
    expect(fromSearchParams(params).sort).toBe("relevance");
  });

  it("ignores invalid price tier", () => {
    const params = new URLSearchParams("price=banana");
    expect(fromSearchParams(params).price).toBeUndefined();
  });

  it("ignores non-integer page values", () => {
    const params = new URLSearchParams("page=abc");
    expect(fromSearchParams(params).page).toBe(1);
  });

  it("ignores zero or negative pages", () => {
    const params = new URLSearchParams("page=0");
    expect(fromSearchParams(params).page).toBe(1);
  });

  it("accepts the object form (Next.js searchParams shape)", () => {
    const state = fromSearchParams({
      q: "shirts",
      category: ["clothing", "footwear"],
      sort: "trust",
    });
    expect(state.q).toBe("shirts");
    expect(state.category).toEqual(["clothing", "footwear"]);
    expect(state.sort).toBe("trust");
  });

  it("handles single-string multi-value (Next.js may pass either)", () => {
    const state = fromSearchParams({ category: "clothing" });
    expect(state.category).toEqual(["clothing"]);
  });
});

describe("filterParams: toggleMulti / removeMulti", () => {
  it("toggleMulti adds a missing value", () => {
    const state = emptyState();
    const next = toggleMulti(state, "category", "clothing");
    expect(next.category).toEqual(["clothing"]);
    expect(next.page).toBe(1);
  });

  it("toggleMulti removes a present value", () => {
    const state = { ...emptyState(), category: ["clothing", "footwear"] };
    const next = toggleMulti(state, "category", "clothing");
    expect(next.category).toEqual(["footwear"]);
  });

  it("toggleMulti resets page to 1 (avoid lingering on an empty page)", () => {
    const state = { ...emptyState(), category: ["x"], page: 5 };
    const next = toggleMulti(state, "category", "y");
    expect(next.page).toBe(1);
  });

  it("removeMulti is a no-op for missing values", () => {
    const state = { ...emptyState(), category: ["clothing"] };
    const next = removeMulti(state, "category", "footwear");
    expect(next.category).toEqual(["clothing"]);
  });

  it("removeMulti returns a new object (no mutation)", () => {
    const state = { ...emptyState(), category: ["clothing"] };
    const next = removeMulti(state, "category", "clothing");
    expect(next).not.toBe(state);
    expect(state.category).toEqual(["clothing"]);
  });
});

describe("filterParams: activeFilterCount", () => {
  it("counts every active filter except q and sort", () => {
    const state: ReturnType<typeof emptyState> = {
      ...emptyState(),
      q: "ignored",
      sort: "trust",
      category: ["a", "b"],
      ownership: ["w"],
      price: "$$",
      tier: 2,
    };
    expect(activeFilterCount(state)).toBe(2 + 1 + 1 + 1);
  });

  it("returns 0 for empty state", () => {
    expect(activeFilterCount(emptyState())).toBe(0);
  });
});
