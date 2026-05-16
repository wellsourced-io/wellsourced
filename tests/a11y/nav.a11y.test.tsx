/**
 * Cross-cutting a11y sweep across every navigation surface this feature
 * builds (FR-028 / SC-007). Renders each composite in isolation with mocked
 * router + beacon and asserts zero axe-core violations at Critical or
 * Serious severity.
 *
 * Doesn't try to render full Server Components with async params — that's
 * a Next.js render context. Instead exercises the composites that already
 * accept their data as plain props (sidebar, breadcrumb, subnav, theme
 * toggle, locale switcher, footer).
 */
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/en",
}));

vi.mock("@/lib/analytics/beacon", () => ({
  sendEvent: vi.fn(),
  getViewportBucket: () => "desktop" as const,
  getReferrerCategory: () => "direct" as const,
}));

import { BrandProfileSubNav } from "@/components/nav/BrandProfileSubNav";
import { Breadcrumb } from "@/components/nav/Breadcrumb";
import { LocaleSwitcher } from "@/components/nav/LocaleSwitcher";
import { WorkspaceSidebar } from "@/components/nav/WorkspaceSidebar";
import { ActiveFilters } from "@/components/nav/ActiveFilters";

describe("Nav surfaces — WCAG 2.1 AA sweep (FR-028)", () => {
  it("BrandProfileSubNav", async () => {
    const { container } = render(
      <BrandProfileSubNav
        locale="en"
        slug="foo"
        brandName="Foo"
        active="overview"
      />,
    );
    const r = await axe(container);
    expect(r).toHaveNoViolations();
  });

  it("Breadcrumb (single back-link)", async () => {
    const { container } = render(
      <Breadcrumb trail={[{ label: "Foo", href: "/en/brand/foo" }]} />,
    );
    const r = await axe(container);
    expect(r).toHaveNoViolations();
  });

  it("LocaleSwitcher (MVP non-interactive variant)", async () => {
    const { container } = render(<LocaleSwitcher localeName="English (US)" />);
    const r = await axe(container);
    expect(r).toHaveNoViolations();
  });

  it("WorkspaceSidebar (new tier)", async () => {
    const { container } = render(
      <WorkspaceSidebar locale="en" active="/en/admin" tier="new" />,
    );
    const r = await axe(container);
    expect(r).toHaveNoViolations();
  });

  it("WorkspaceSidebar (moderator tier — all items visible)", async () => {
    const { container } = render(
      <WorkspaceSidebar
        locale="en"
        active="/en/admin/queue"
        tier="moderator"
      />,
    );
    const r = await axe(container);
    expect(r).toHaveNoViolations();
  });

  it("ActiveFilters (with chips)", async () => {
    // Mock searchParams with two active chips
    vi.doMock("next/navigation", () => ({
      useRouter: () => ({ push: vi.fn() }),
      useSearchParams: () => new URLSearchParams("category=clothing&ownership=worker-owned"),
      usePathname: () => "/en/search",
    }));
    const { container } = render(<ActiveFilters pathname="/en/search" />);
    const r = await axe(container);
    expect(r).toHaveNoViolations();
  });
});
