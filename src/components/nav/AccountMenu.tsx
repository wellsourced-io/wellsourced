"use client";

import Link from "next/link";
import { UserCircle } from "lucide-react";
import * as Dropdown from "@radix-ui/react-tooltip";
import {
  sendEvent,
  getViewportBucket,
  getReferrerCategory,
} from "@/lib/analytics/beacon";

export interface AccountMenuProps {
  pathname: string;
  signedIn: boolean;
  isEstablishedContributor?: boolean;
  locale: string;
  copy: {
    signIn: string;
    myContributions: string;
    workspace: string;
    settings: string;
    signOut: string;
    avatarLabel: string;
  };
}

export function AccountMenu({
  pathname,
  signedIn,
  isEstablishedContributor = false,
  locale,
  copy,
}: AccountMenuProps) {
  const onSignIn = () => {
    if (typeof window !== "undefined") {
      sendEvent({
        name: "signin_initiated",
        path: pathname,
        viewport_bucket: getViewportBucket(),
        referrer_category: getReferrerCategory(
          document.referrer,
          window.location.origin,
        ),
      });
    }
  };

  if (!signedIn) {
    return (
      <Link
        href={`/${locale}/contribute`}
        onClick={onSignIn}
        className="inline-flex h-9 items-center rounded-full px-3 text-[14px] font-medium text-muted transition-colors duration-[150ms] [transition-timing-function:var(--ease-standard)] hover:text-fg hover:bg-cloud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
      >
        {copy.signIn}
      </Link>
    );
  }

  return (
    <Dropdown.Provider>
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <button
            type="button"
            aria-label={copy.avatarLabel}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors duration-[150ms] [transition-timing-function:var(--ease-standard)] hover:text-fg hover:bg-cloud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
          >
            <UserCircle size={20} aria-hidden="true" />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Content
            sideOffset={8}
            align="end"
            className="z-50 min-w-[200px] rounded-md border border-border bg-surface p-1 shadow-modal"
          >
            <AccountMenuItem
              href={`/${locale}/admin/contributions`}
              label={copy.myContributions}
            />
            {isEstablishedContributor && (
              <AccountMenuItem
                href={`/${locale}/admin`}
                label={copy.workspace}
              />
            )}
            <AccountMenuItem
              href={`/${locale}/admin/settings`}
              label={copy.settings}
            />
            <AccountMenuItem href="/api/auth/signout" label={copy.signOut} />
          </Dropdown.Content>
        </Dropdown.Portal>
      </Dropdown.Root>
    </Dropdown.Provider>
  );
}

function AccountMenuItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block rounded px-3 py-2 text-[14px] text-fg transition-colors hover:bg-cloud focus-visible:outline-none focus-visible:bg-cloud"
    >
      {label}
    </Link>
  );
}
