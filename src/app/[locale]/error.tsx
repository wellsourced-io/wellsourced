"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Surface to server logs without leaking to the user.
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sand-deep text-fg">
        <AlertTriangle size={28} aria-hidden="true" />
      </div>
      <h1 className="mt-8 text-display font-display font-bold text-fg">
        Something snagged.
      </h1>
      <p className="mx-auto mt-4 max-w-[56ch] text-[16px] leading-[1.55] text-muted">
        Reload to try again, or head back to search and start fresh.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 items-center rounded-full bg-teal px-5 text-[14px] font-medium text-white transition-colors hover:bg-teal-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          Try again
        </button>
        <Link
          href="/en"
          className="inline-flex h-11 items-center rounded-full px-5 text-[14px] font-medium text-fg transition-colors hover:bg-cloud"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
