import { locales } from "@/lib/i18n/config";

interface LocaleSwitcherProps {
  localeName: string;
}

/**
 * MVP variant: a non-interactive label showing the current locale. The visual
 * slot is preserved so adding a second locale (when `locales.length > 1`)
 * upgrades this to an interactive selector with no layout change (FR-031).
 */
export function LocaleSwitcher({ localeName }: LocaleSwitcherProps) {
  if (locales.length === 1) {
    return (
      <span className="text-[12px] uppercase tracking-[0.04em] text-muted">
        {localeName}
      </span>
    );
  }

  // Future-ready: when locales.length > 1, render a select. Kept here so
  // the upgrade path is obvious; the branch is dead code at MVP.
  return (
    <span className="text-[12px] uppercase tracking-[0.04em] text-muted">
      {localeName}
    </span>
  );
}
