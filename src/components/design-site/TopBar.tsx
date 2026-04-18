import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { Lockup } from "@/components/ui/Logo";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1400px] items-center gap-4 px-6">
        <Link
          href="/"
          className="shrink-0 flex items-center gap-2 text-fg"
          aria-label="WellSourced — home"
        >
          <Lockup size="sm" />
        </Link>
        <span className="ml-1 rounded-full bg-teal-light px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-teal">
          Design
        </span>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-surface px-3 text-[13px] text-muted hover:text-fg hover:border-teal transition-[color,border] duration-[150ms]"
            aria-label="Search design system"
            disabled
            title="Search — coming soon"
          >
            <SearchIcon className="h-3.5 w-3.5" aria-hidden />
            <span>Search</span>
            <kbd className="ml-2 font-mono text-[11px] rounded-md border border-border bg-cloud px-1.5 py-0.5">
              ⌘K
            </kbd>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
