export type NavItem = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const DESIGN_NAV: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Introduction", href: "/design" },
      { label: "Getting started", href: "/design/getting-started" },
    ],
  },
  {
    label: "Foundations",
    items: [
      { label: "Color", href: "/design/foundations/color" },
      { label: "Typography", href: "/design/foundations/typography" },
      { label: "Space", href: "/design/foundations/space" },
      { label: "Radius", href: "/design/foundations/radius" },
      { label: "Elevation", href: "/design/foundations/elevation" },
      { label: "Motion", href: "/design/foundations/motion" },
      { label: "Iconography", href: "/design/foundations/iconography" },
    ],
  },
  {
    label: "Tokens",
    items: [{ label: "Browse tokens", href: "/design/tokens" }],
  },
  {
    label: "Components",
    items: [
      { label: "Button", href: "/design/components/button" },
      { label: "Badge", href: "/design/components/badge" },
      { label: "Trust badge", href: "/design/components/trust-badge" },
      { label: "Filter chip", href: "/design/components/filter-chip" },
      { label: "Search bar", href: "/design/components/search-bar" },
      { label: "Input", href: "/design/components/input" },
      { label: "Card", href: "/design/components/card" },
      { label: "Product card", href: "/design/components/product-card" },
      { label: "Skeleton", href: "/design/components/skeleton" },
      { label: "Nav bar", href: "/design/components/nav-bar" },
    ],
  },
  {
    label: "Patterns",
    items: [
      { label: "Empty states", href: "/design/patterns/empty-states" },
      { label: "Error states", href: "/design/patterns/error-states" },
      { label: "Brand profile", href: "/design/patterns/brand-profile" },
      { label: "Category grid", href: "/design/patterns/category-grid" },
    ],
  },
  {
    label: "Voice & brand",
    items: [
      { label: "Content", href: "/design/content" },
      { label: "Brand", href: "/design/brand" },
    ],
  },
  {
    label: "Meta",
    items: [
      { label: "Accessibility", href: "/design/accessibility" },
      { label: "Changelog", href: "/design/changelog" },
    ],
  },
];
