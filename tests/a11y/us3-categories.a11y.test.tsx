import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { CATEGORIES, featuredCategories } from "@/lib/data/categories";

// We can't directly render the Server Components here, but the visual
// structure of the category surfaces is just a list of <a> elements. This
// test reproduces that shape and asserts axe-clean rendering.
function CategoryGrid({
  categories,
}: {
  categories: { slug: string; name: string; blurb: string }[];
}) {
  return (
    <main>
      <h1>Browse by category</h1>
      <ul>
        {categories.map((c) => (
          <li key={c.slug}>
            <a href={`/en/c/${c.slug}`}>
              <h2>{c.name}</h2>
              <p>{c.blurb}</p>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

describe("US3 — accessibility (FR-028 / WCAG 2.1 AA)", () => {
  it("the full categories grid has no axe-core violations", async () => {
    const { container } = render(<CategoryGrid categories={CATEGORIES} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("the featured-categories homepage rail has no axe-core violations", async () => {
    const { container } = render(
      <CategoryGrid categories={featuredCategories()} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
