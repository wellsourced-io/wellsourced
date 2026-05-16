"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Search, X } from "lucide-react";
import {
  sendEvent,
  getViewportBucket,
  getReferrerCategory,
} from "@/lib/analytics/beacon";
import type { NavBarLink } from "@/components/ui/NavBar";

export interface MobileDrawerProps {
  pathname: string;
  locale: string;
  links: NavBarLink[];
  copy: {
    open: string;
    close: string;
    searchPlaceholder: string;
    theme: { label: string; system: string; light: string; dark: string };
  };
  themeControl: React.ReactNode;
}

export function MobileDrawer({
  pathname,
  locale,
  links,
  copy,
  themeControl,
}: MobileDrawerProps) {
  const [open, setOpen] = useState(false);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (next && typeof window !== "undefined") {
      sendEvent({
        name: "drawer_open",
        path: pathname,
        viewport_bucket: getViewportBucket(),
        referrer_category: getReferrerCategory(
          document.referrer,
          window.location.origin,
        ),
      });
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={copy.open}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-cloud hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 md:hidden"
        >
          <Menu size={20} aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/40 motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:fade-in motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:fade-out" />
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col bg-bg motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:slide-in-from-right-8 motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:slide-out-to-right-8">
          <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>
          <header className="flex h-16 items-center justify-between border-b border-border px-6">
            <span className="text-[14px] font-medium uppercase tracking-[0.04em] text-muted">
              Menu
            </span>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={copy.close}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-cloud hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </header>

          <form
            action={`/${locale}/search`}
            method="get"
            className="border-b border-border px-6 py-4"
          >
            <label className="flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 focus-within:border-teal focus-within:ring-4 focus-within:ring-teal-light">
              <Search size={16} className="text-muted" aria-hidden="true" />
              <input
                name="q"
                type="search"
                placeholder={copy.searchPlaceholder}
                className="flex-1 bg-transparent text-[14px] text-fg placeholder:text-muted focus:outline-none"
              />
            </label>
          </form>

          <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-2 py-4">
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={`/${locale}${l.href}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-4 py-3 text-[16px] font-medium text-fg transition-colors hover:bg-cloud focus-visible:outline-none focus-visible:bg-cloud"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <footer className="flex items-center justify-between border-t border-border px-6 py-4">
            <span className="text-[14px] text-muted">{copy.theme.label}</span>
            {themeControl}
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
