import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { BrandProfileSubNav } from "@/components/nav/BrandProfileSubNav";
import { Breadcrumb } from "@/components/nav/Breadcrumb";

describe("US2 — accessibility (WCAG 2.1 AA per FR-028)", () => {
  it("BrandProfileSubNav has no axe-core violations", async () => {
    const { container } = render(
      <BrandProfileSubNav
        locale="en"
        slug="foo"
        brandName="Foo Brand"
        active="overview"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Breadcrumb (single back-link) has no axe-core violations", async () => {
    const { container } = render(
      <Breadcrumb trail={[{ label: "Foo Brand", href: "/en/brand/foo" }]} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Breadcrumb (multi-item chain) has no axe-core violations", async () => {
    const { container } = render(
      <Breadcrumb
        trail={[
          { label: "Workspace", href: "/en/admin" },
          { label: "Suggest", href: "/en/admin/suggest" },
        ]}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
