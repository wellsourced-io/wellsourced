import { headers } from "next/headers";
import type { ReactNode } from "react";
import { NavBar, type NavBarLink } from "@/components/ui/NavBar";
import {
  getPageByPath,
  getActiveSection,
  headerNavRoutes,
} from "@/lib/routes/routeMap";
import type { Dictionary, RouteId } from "@/lib/i18n/dictionary";
import { Footer } from "./Footer";
import { ThemeToggle } from "./ThemeToggle";
import { AccountMenu } from "./AccountMenu";
import { MobileDrawer } from "./MobileDrawer";
import { HeaderSearchForm } from "./HeaderSearchForm";
import { PageViewTracker } from "./PageViewTracker";

interface AppShellProps {
  locale: string;
  dictionary: Dictionary;
  children: ReactNode;
  /** Override auth state — defaults to signed-out. Wired by US5. */
  signedIn?: boolean;
  isEstablishedContributor?: boolean;
}

function stripLocale(pathname: string, locale: string): string {
  if (pathname === `/${locale}`) return "/";
  if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  return pathname;
}

export async function AppShell({
  locale,
  dictionary,
  children,
  signedIn = false,
  isEstablishedContributor = false,
}: AppShellProps) {
  const hdrs = await headers();
  const fullPath = hdrs.get("x-pathname") ?? `/${locale}`;
  const localelessPath = stripLocale(fullPath, locale);
  const page = getPageByPath(localelessPath);

  const isHome = localelessPath === "/";
  const stickyHeader = page?.stickyHeader ?? false;
  const surface: "sand" | "white" = page?.headerSurface ?? "sand";

  const activeSection = getActiveSection(localelessPath);
  const links: NavBarLink[] = headerNavRoutes().map((route) => ({
    label:
      dictionary.nav[
        route.id === "search"
          ? "find"
          : (route.id as Exclude<keyof Dictionary["nav"], "find">)
      ],
    href: `/${locale}${route.path}`,
  }));
  const currentHref = (() => {
    if (!activeSection) return undefined;
    const route = headerNavRoutes().find((r) => r.section === activeSection);
    return route ? `/${locale}${route.path}` : undefined;
  })();

  const navBarClass = stickyHeader ? "sticky top-0 z-30" : "";

  const themeToggle = (
    <ThemeToggle label={dictionary.theme.label} pathname={fullPath} />
  );

  const accountMenu = (
    <AccountMenu
      pathname={fullPath}
      signedIn={signedIn}
      isEstablishedContributor={isEstablishedContributor}
      locale={locale}
      copy={dictionary.account}
    />
  );

  // FR-007: no compact search in header on the homepage; hero search owns it.
  const compactSearch = isHome ? null : (
    <HeaderSearchForm
      locale={locale}
      pathname={fullPath}
      placeholder={dictionary.drawer.searchPlaceholder}
    />
  );

  const mobileDrawer = (
    <MobileDrawer
      pathname={fullPath}
      locale={locale}
      links={headerNavRoutes().map((route) => ({
        label:
          dictionary.nav[
            route.id === "search"
              ? "find"
              : (route.id as Exclude<keyof Dictionary["nav"], "find">)
          ],
        href: route.path,
      }))}
      copy={{
        open: dictionary.drawer.open,
        close: dictionary.drawer.close,
        searchPlaceholder: dictionary.drawer.searchPlaceholder,
        theme: dictionary.theme,
      }}
      themeControl={themeToggle}
    />
  );

  return (
    <>
      <PageViewTracker locale={locale} />
      <NavBar
        className={navBarClass}
        current={currentHref}
        surface={surface}
        links={links}
        rightSlot={
          <div className="flex items-center gap-2">
            {compactSearch}
            {themeToggle}
            {accountMenu}
            {mobileDrawer}
          </div>
        }
      />
      <main id="main" className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
      <Footer locale={locale} dictionary={dictionary} />
    </>
  );
}
