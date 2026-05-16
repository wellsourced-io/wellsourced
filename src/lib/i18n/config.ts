/**
 * i18n configuration.
 *
 * The single source of truth for the set of locales the app supports and the
 * default locale used when matching falls through.
 *
 * MVP ships with one locale (`en`). The shape here is forward-compatible:
 * adding a locale is a content change (new `messages/<locale>.json` plus an
 * entry in `locales`) — no consumer of `Locale` needs to be modified.
 */

export const locales = ["en"] as const;

export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];
