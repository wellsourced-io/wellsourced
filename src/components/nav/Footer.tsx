import Link from "next/link";
import { Lockup } from "@/components/ui/Logo";
import { footerGroups, type FooterGroup } from "@/lib/routes/routeMap";
import type { Dictionary, RouteId } from "@/lib/i18n/dictionary";
import { LocaleSwitcher } from "./LocaleSwitcher";

interface FooterProps {
  locale: string;
  dictionary: Dictionary;
}

const GROUP_ORDER: FooterGroup[] = [
  "discover",
  "contribute",
  "about",
  "operators",
  "system",
];

const GITHUB_REPO_URL = "https://github.com/wellsourced-io/wellsourced";

export function Footer({ locale, dictionary }: FooterProps) {
  const groups = footerGroups();
  const groupLabel: Record<FooterGroup, string> = {
    discover: dictionary.footer.discover,
    contribute: dictionary.footer.contribute,
    about: dictionary.footer.about,
    operators: dictionary.footer.operators,
    system: dictionary.footer.system,
  };

  return (
    <footer className="w-full border-t border-border bg-bg">
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2 md:col-span-2">
            <Lockup size="md" />
            <p className="mt-4 max-w-[36ch] text-[14px] leading-[1.55] text-muted">
              {dictionary.footer.tagline}
            </p>
          </div>
          {GROUP_ORDER.map((groupKey) => {
            const pages = groups[groupKey];
            if (!pages || pages.length === 0) return null;
            return (
              <div key={groupKey} className="col-span-1">
                <h2 className="text-[12px] uppercase tracking-[0.04em] font-medium text-fg">
                  {groupLabel[groupKey]}
                </h2>
                <ul className="mt-4 space-y-2">
                  {pages.map((page) => {
                    const routeCopy =
                      dictionary.routes[page.id as RouteId]?.label ?? page.id;
                    const href = resolveHref(locale, page.path);
                    return (
                      <li key={page.id}>
                        <Link
                          href={href}
                          className="text-[14px] text-muted transition-colors hover:text-fg"
                        >
                          {routeCopy}
                        </Link>
                      </li>
                    );
                  })}
                  {groupKey === "contribute" && (
                    <li>
                      <a
                        href={GITHUB_REPO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] text-muted transition-colors hover:text-fg"
                      >
                        GitHub
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <LocaleSwitcher localeName={dictionary.localeName} />
          <p className="text-[12px] uppercase tracking-[0.04em] text-muted">
            Public infrastructure · No accounts required
          </p>
        </div>
      </div>
    </footer>
  );
}

function resolveHref(locale: string, path: string): string {
  // path is "/" or "/search" — never includes locale or dynamic segments
  if (path === "/") return `/${locale}`;
  // strip any [slug] etc. if present (footer should never link dynamic pages)
  return `/${locale}${path}`;
}
