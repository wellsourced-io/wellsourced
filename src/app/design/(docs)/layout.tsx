import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DocShell } from "@/components/design-site";

export const metadata: Metadata = {
  title: {
    default: "Design",
    template: "%s · WellSourced Design",
  },
  description:
    "The WellSourced design system — tokens, components, patterns, and voice guidelines.",
};

export default function DesignLayout({ children }: { children: ReactNode }) {
  return <DocShell>{children}</DocShell>;
}
