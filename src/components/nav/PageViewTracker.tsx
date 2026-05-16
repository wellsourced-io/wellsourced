"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  sendEvent,
  getViewportBucket,
  getReferrerCategory,
} from "@/lib/analytics/beacon";

/**
 * Emits a `page_view` beacon on initial mount and on subsequent App Router
 * navigations. Mounted once by AppShell so every consumer route is covered.
 */
export function PageViewTracker({ locale }: { locale: string }) {
  const pathname = usePathname();
  const lastReported = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastReported.current === pathname) return;
    lastReported.current = pathname;

    sendEvent({
      name: "page_view",
      path: pathname,
      viewport_bucket: getViewportBucket(),
      referrer_category: getReferrerCategory(
        document.referrer,
        window.location.origin,
      ),
      locale,
    });
  }, [pathname, locale]);

  return null;
}
