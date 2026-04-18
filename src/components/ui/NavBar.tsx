import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Lockup } from "./Logo";

export interface NavBarProps {
  current?: string;
  right?: ReactNode;
  className?: string;
}

const LINKS = [
  { label: "Brands", href: "/brands" },
  { label: "Categories", href: "/categories" },
  { label: "Submit", href: "/submit" },
  { label: "About", href: "/about" },
];

export function NavBar({ current, right, className }: NavBarProps) {
  return (
    <header
      className={cn(
        "w-full border-b border-border bg-surface/70 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-8 px-6">
        <Link href="/" aria-label="WellSourced — home" className="shrink-0">
          <Lockup size="sm" />
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => {
            const active = current === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "h-9 px-3 rounded-full text-[14px] font-medium " +
                    "transition-[color,background] duration-[150ms] [transition-timing-function:var(--ease-standard)] " +
                    "inline-flex items-center",
                  active
                    ? "text-teal bg-teal-light"
                    : "text-muted hover:text-fg hover:bg-cloud",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">{right}</div>
      </div>
    </header>
  );
}
