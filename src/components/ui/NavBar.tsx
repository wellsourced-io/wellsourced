import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Lockup } from "./Logo";

export interface NavBarLink {
  label: string;
  href: string;
}

export interface NavBarProps {
  current?: string;
  links?: NavBarLink[];
  rightSlot?: ReactNode;
  right?: ReactNode;
  surface?: "sand" | "white";
  className?: string;
}

const DEFAULT_LINKS: NavBarLink[] = [
  { label: "Find", href: "/search" },
  { label: "Brands", href: "/brands" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
];

export function NavBar({
  current,
  links = DEFAULT_LINKS,
  rightSlot,
  right,
  surface = "sand",
  className,
}: NavBarProps) {
  return (
    <header
      className={cn(
        "w-full border-b border-border",
        surface === "white" ? "bg-surface" : "bg-bg",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-6">
        <Link href="/" aria-label="WellSourced — home" className="shrink-0">
          <Lockup size="sm" />
        </Link>
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-1"
        >
          {links.map((l) => {
            const active = current === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "h-9 px-3 text-[14px] font-medium inline-flex items-center",
                  "border-b-2 -mb-px",
                  "transition-[color,border-color] duration-[150ms] [transition-timing-function:var(--ease-standard)]",
                  active
                    ? "text-fg border-teal"
                    : "text-muted border-transparent hover:text-fg",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          {rightSlot}
          {right}
        </div>
      </div>
    </header>
  );
}
