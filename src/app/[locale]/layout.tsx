import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { AppShell } from "@/components/nav/AppShell";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);

  return (
    <ThemeProvider>
      <AppShell locale={typedLocale} dictionary={dictionary}>
        {children}
      </AppShell>
    </ThemeProvider>
  );
}
