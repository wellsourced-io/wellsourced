import Link from "next/link";
import { Lockup } from "@/components/ui/Logo";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-border bg-surface">
      <div className="mx-auto flex h-full max-w-[1400px] items-center gap-4 px-6">
        <Link
          href="/"
          className="shrink-0 flex items-center gap-2 text-fg"
          aria-label="WellSourced — home"
        >
          <Lockup size="sm" />
        </Link>
        <span
          className="ml-1 hidden text-[12px] text-muted sm:inline"
          aria-hidden="true"
        >
          / Design system
        </span>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
