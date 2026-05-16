import Link from "next/link";
import { cn } from "@/lib/cn";

export interface BrandProfileSubNavProps {
  locale: string;
  slug: string;
  brandName: string;
  active: "overview" | "products";
}

interface Tab {
  id: "overview" | "products" | "trust-data";
  label: string;
  href: string;
  external: boolean;
}

/**
 * Sub-navigation for the brand profile per FR-014. Uses the chip pattern
 * (ink-filled active state per DESIGN.md §5 Filter Chips), explicitly NOT
 * the deep-teal underline that the primary header uses — that distinction
 * keeps the sub-nav from competing visually with global navigation.
 */
export function BrandProfileSubNav({
  locale,
  slug,
  brandName,
  active,
}: BrandProfileSubNavProps) {
  const tabs: Tab[] = [
    {
      id: "overview",
      label: "Overview",
      href: `/${locale}/brand/${slug}`,
      external: false,
    },
    {
      id: "products",
      label: "Products",
      href: `/${locale}/brand/${slug}/products`,
      external: false,
    },
    {
      id: "trust-data",
      label: "Trust data",
      href: "#trust-data",
      external: false,
    },
  ];

  return (
    <nav
      aria-label={`${brandName} sections`}
      className="flex flex-wrap items-center gap-2"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex h-8 items-center rounded-full px-3 text-[13px] font-medium",
              "transition-colors duration-[150ms] [transition-timing-function:var(--ease-standard)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2",
              isActive
                ? "bg-ink text-sand"
                : "border border-border bg-surface text-fg hover:border-fg",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
