import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Lockup } from "@/components/ui/Logo";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6">
        <Lockup size="sm" />
        <nav className="flex items-center gap-2">
          <Link
            href="/design"
            className="inline-flex h-9 items-center gap-1 rounded-full border border-border bg-surface px-3 text-[13px] font-medium text-muted transition-[color,border] duration-[150ms] hover:text-teal hover:border-teal"
          >
            Design system
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex max-w-[880px] flex-col items-center px-6 py-16 md:py-28 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
          Early preview
        </span>

        <h1 className="font-[var(--font-display)] text-[52px] md:text-[72px] font-black leading-[1.03] tracking-[-0.035em] text-fg">
          Find what&rsquo;s actually
          <br />
          <span className="text-teal">made well.</span>
        </h1>

        <p className="mt-6 max-w-[58ch] text-[17px] md:text-[19px] leading-[1.55] text-muted">
          A directory of brands whose origin, materials, and makers are verifiable. We don&rsquo;t
          sell anything. We just show you who made it — and whether anyone checked.
        </p>

        <div className="mt-10 w-full max-w-[560px]">
          <SearchBar shortcut="⌘K" />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/brands">
              Browse the directory
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/design">See the design system</Link>
          </Button>
        </div>
      </main>

      <footer className="mx-auto mt-10 max-w-[1280px] px-6 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-[12.5px] text-muted">
          <span>
            &copy; {new Date().getFullYear()} WellSourced — a directory of what&rsquo;s actually made well.
          </span>
          <div className="flex gap-5">
            <Link href="/about" className="hover:text-fg">About</Link>
            <Link href="/contribute" className="hover:text-fg">Contribute</Link>
            <Link href="/design" className="hover:text-fg">Design</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
