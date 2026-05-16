/**
 * US5 — axe-core accessibility sweep on the WorkspaceSidebar.
 *
 * Verifies FR-028 (WCAG 2.1 AA) and the landmark/keyboard contract
 * implied by FR-015 (the workspace must feel like part of the same site,
 * which includes consistent navigation semantics).
 */

import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { WorkspaceSidebar } from "@/components/nav/WorkspaceSidebar";

describe("US5 — workspace sidebar accessibility", () => {
  it("has no axe-core violations for an established contributor", async () => {
    const { container } = render(
      <WorkspaceSidebar locale="en" active="/en/admin" tier="established" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no axe-core violations for a new contributor with the reduced item set", async () => {
    const { container } = render(
      <WorkspaceSidebar locale="en" active="/en/admin/contributions" tier="new" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("exposes a 'Workspace navigation' landmark", () => {
    const { getByRole } = render(
      <WorkspaceSidebar locale="en" active="/en/admin" tier="established" />,
    );
    expect(
      getByRole("navigation", { name: /workspace navigation/i }),
    ).toBeInTheDocument();
  });

  it("marks the active item with aria-current=page", () => {
    const { getByRole } = render(
      <WorkspaceSidebar
        locale="en"
        active="/en/admin/queue"
        tier="established"
      />,
    );
    const activeLink = getByRole("link", { name: /submissions queue/i });
    expect(activeLink).toHaveAttribute("aria-current", "page");
  });

  it("does NOT mark inactive items with aria-current", () => {
    const { getByRole } = render(
      <WorkspaceSidebar
        locale="en"
        active="/en/admin/queue"
        tier="established"
      />,
    );
    const inactiveLink = getByRole("link", { name: /settings/i });
    expect(inactiveLink).not.toHaveAttribute("aria-current");
  });

  it("hides moderator-only items from established contributors", () => {
    const { queryByRole } = render(
      <WorkspaceSidebar locale="en" active="/en/admin" tier="established" />,
    );
    expect(queryByRole("link", { name: /disputes/i })).toBeNull();
  });

  it("hides queue + disputes from new contributors", () => {
    const { queryByRole } = render(
      <WorkspaceSidebar locale="en" active="/en/admin" tier="new" />,
    );
    expect(queryByRole("link", { name: /submissions queue/i })).toBeNull();
    expect(queryByRole("link", { name: /disputes/i })).toBeNull();
  });

  it("shows disputes to moderators", () => {
    const { getByRole } = render(
      <WorkspaceSidebar locale="en" active="/en/admin" tier="moderator" />,
    );
    expect(getByRole("link", { name: /disputes/i })).toBeInTheDocument();
  });
});
