import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrandProfileSubNav } from "@/components/nav/BrandProfileSubNav";
import { Breadcrumb } from "@/components/nav/Breadcrumb";

describe("US2 — BrandProfileSubNav", () => {
  it("renders three tabs in order", () => {
    render(
      <BrandProfileSubNav
        locale="en"
        slug="foo"
        brandName="Foo"
        active="overview"
      />,
    );
    expect(screen.getByRole("link", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Products" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Trust data" })).toBeInTheDocument();
  });

  it("marks the active tab with aria-current and only the active one", () => {
    render(
      <BrandProfileSubNav
        locale="en"
        slug="foo"
        brandName="Foo"
        active="overview"
      />,
    );
    const overview = screen.getByRole("link", { name: "Overview" });
    const products = screen.getByRole("link", { name: "Products" });
    expect(overview).toHaveAttribute("aria-current", "page");
    expect(products).not.toHaveAttribute("aria-current");
  });

  it("wires Products to the locale-prefixed catalog route", () => {
    render(
      <BrandProfileSubNav
        locale="en"
        slug="foo"
        brandName="Foo"
        active="overview"
      />,
    );
    const products = screen.getByRole("link", { name: "Products" });
    expect(products).toHaveAttribute("href", "/en/brand/foo/products");
  });

  it("wires Trust data to the #trust-data in-page anchor", () => {
    render(
      <BrandProfileSubNav
        locale="en"
        slug="foo"
        brandName="Foo"
        active="overview"
      />,
    );
    const trust = screen.getByRole("link", { name: "Trust data" });
    expect(trust).toHaveAttribute("href", "#trust-data");
  });

  it("exposes a brand-scoped landmark name", () => {
    render(
      <BrandProfileSubNav
        locale="en"
        slug="foo"
        brandName="Foo Brand"
        active="overview"
      />,
    );
    expect(
      screen.getByRole("navigation", { name: /foo brand sections/i }),
    ).toBeInTheDocument();
  });
});

describe("US2 — Breadcrumb (back-link pattern)", () => {
  it("renders a single back-link for a 1-item trail", () => {
    render(
      <Breadcrumb
        trail={[{ label: "Foo Brand", href: "/en/brand/foo" }]}
      />,
    );
    const link = screen.getByRole("link", { name: /foo brand/i });
    expect(link).toHaveAttribute("href", "/en/brand/foo");
  });

  it("renders nothing for an empty trail", () => {
    const { container } = render(<Breadcrumb trail={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders a multi-item chain when the trail is longer than 1", () => {
    render(
      <Breadcrumb
        trail={[
          { label: "Workspace", href: "/en/admin" },
          { label: "Suggest", href: "/en/admin/suggest" },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: "Workspace" })).toHaveAttribute(
      "href",
      "/en/admin",
    );
    expect(screen.getByRole("link", { name: "Suggest" })).toHaveAttribute(
      "href",
      "/en/admin/suggest",
    );
  });
});
