"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DESIGN_NAV } from "@/lib/design-site/nav";
import { cn } from "@/lib/cn";

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Design system navigation"
      className={cn("flex flex-col gap-7 py-10 pr-6", className)}
    >
      {DESIGN_NAV.map((group) => (
        <div key={group.label} className="flex flex-col gap-1.5">
          <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            {group.label}
          </div>
          <ul className="flex flex-col gap-px">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-[8px] px-3 py-1.5 text-[13.5px] leading-[1.4] " +
                        "transition-[color,background] duration-[150ms] [transition-timing-function:var(--ease-standard)]",
                      active
                        ? "bg-teal-light text-teal font-medium"
                        : "text-muted hover:text-fg hover:bg-cloud",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
