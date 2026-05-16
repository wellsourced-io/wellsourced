import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n/config";

/**
 * Root-level 404 — un-prefixed paths that escape middleware (e.g. paths
 * matched by the exclusion list) get bounced to the locale-prefixed
 * not-found page so the chrome renders correctly.
 */
export default function RootNotFound() {
  redirect(`/${defaultLocale}/not-found`);
}
