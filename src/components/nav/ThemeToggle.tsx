"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme/ThemeProvider";
import {
  sendEvent,
  getViewportBucket,
  getReferrerCategory,
} from "@/lib/analytics/beacon";

interface ThemeToggleProps {
  label: string;
  pathname: string;
}

export function ThemeToggle({ label, pathname }: ThemeToggleProps) {
  const { theme, cycle } = useTheme();

  const Icon = theme === "system" ? Monitor : theme === "light" ? Sun : Moon;

  const handleClick = () => {
    const previous = theme;
    cycle();
    const next =
      previous === "system" ? "light" : previous === "light" ? "dark" : "system";
    if (typeof window !== "undefined") {
      sendEvent({
        name: "theme_change",
        path: pathname,
        viewport_bucket: getViewportBucket(),
        referrer_category: getReferrerCategory(
          document.referrer,
          window.location.origin,
        ),
        meta: { from: previous, to: next },
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`${label}: ${theme}`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors duration-[150ms] [transition-timing-function:var(--ease-standard)] hover:text-fg hover:bg-cloud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}
