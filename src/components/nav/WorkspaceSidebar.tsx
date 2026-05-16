import Link from "next/link";
import type { ContributorTier } from "@/lib/auth/session";
import { cn } from "@/lib/cn";

interface WorkspaceSidebarProps {
  locale: string;
  /** The current pathname, e.g. `/en/admin/queue`. Used to compute active state. */
  active: string;
  tier: ContributorTier;
}

interface SidebarItem {
  label: string;
  /** Path relative to `/[locale]`, e.g. `/admin/queue`. */
  href: string;
  /** Tiers permitted to see this item. */
  tiers: ReadonlyArray<ContributorTier>;
}

const ITEMS: ReadonlyArray<SidebarItem> = [
  {
    label: "My contributions",
    href: "/admin/contributions",
    tiers: ["new", "established", "moderator"],
  },
  {
    label: "Submissions queue",
    href: "/admin/queue",
    tiers: ["established", "moderator"],
  },
  {
    label: "Disputes",
    href: "/admin/disputes",
    tiers: ["moderator"],
  },
  {
    label: "Settings",
    href: "/admin/settings",
    tiers: ["new", "established", "moderator"],
  },
];

/**
 * Workspace sidebar (FR-015).
 *
 * Per the spec, the contributor workspace does NOT get its own app shell.
 * The consumer header from `AppShell` remains visible at the top; this
 * sidebar sits BELOW it, beside the page content. Pattern is
 * `DocShell`-style (see `src/components/design-site/DocShell.tsx`).
 *
 * Active state follows DESIGN.md §5 Navigation rules: deep-teal text +
 * medium weight for the active item, no pill background. The chrome rule
 * matches the global header so the entire site reads as one surface.
 */
export function WorkspaceSidebar({
  locale,
  active,
  tier,
}: WorkspaceSidebarProps) {
  const items = ITEMS.filter((item) => item.tiers.includes(tier));

  return (
    <nav
      aria-label="Workspace navigation"
      className="flex flex-col gap-1 py-8 pr-6"
    >
      <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        Workspace
      </div>
      <ul className="flex flex-col gap-px">
        {items.map((item) => {
          const href = `/${locale}${item.href}`;
          const isActive = active === href;
          return (
            <li key={item.href}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "block rounded-[8px] px-3 py-1.5 text-[13.5px] leading-[1.4]",
                  "transition-[color,background] duration-[150ms] [transition-timing-function:var(--ease-standard)]",
                  isActive
                    ? "font-medium text-teal-fg"
                    : "text-muted hover:bg-cloud hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
