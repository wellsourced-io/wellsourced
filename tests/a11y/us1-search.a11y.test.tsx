/**
 * US1 — axe-core accessibility sweep on the hero search affordance.
 * Verifies FR-028 (WCAG 2.1 AA) and SC-007 for the homepage's primary
 * interactive surface.
 */
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/lib/analytics/beacon", () => ({
  sendEvent: vi.fn(),
  getViewportBucket: () => "desktop" as const,
  getReferrerCategory: () => "direct" as const,
}));

import { HeroSearchForm } from "@/components/nav/HeroSearchForm";

describe("US1 — accessibility of the hero search affordance", () => {
  it("has no axe-core violations", async () => {
    const { container } = render(
      <HeroSearchForm locale="en" placeholder="Search organic cotton…" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("exposes a search landmark and an accessible name on the input", () => {
    const { getByRole } = render(
      <HeroSearchForm locale="en" placeholder="Search…" />,
    );
    expect(getByRole("search")).toBeInTheDocument();
    expect(getByRole("searchbox", { name: /search wellsourced/i })).toBeInTheDocument();
  });
});
