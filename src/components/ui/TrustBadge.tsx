"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { UserCheck, Users, ShieldCheck } from "lucide-react";
import type { ComponentType } from "react";
import { cn } from "@/lib/cn";

type Tier = "t1" | "t2" | "t3";

export interface TrustBadgeProps {
  tier: Tier;
  label?: string;
  sourceUrl?: string;
  className?: string;
}

const TIERS: Record<
  Tier,
  {
    label: string;
    helper: string;
    bg: string;
    fg: string;
    icon: ComponentType<{ className?: string }>;
  }
> = {
  t1: {
    label: "Self-reported",
    helper:
      "The brand provided this information. Not independently checked. Treat as a starting point.",
    bg: "bg-t1-bg",
    fg: "text-[color:var(--color-t1-fg)]",
    icon: UserCheck,
  },
  t2: {
    label: "Community-verified",
    helper:
      "A contributor cross-checked this claim against public sources. Traceable to a sourcing link.",
    bg: "bg-t2-bg",
    fg: "text-[color:var(--color-t2-fg)]",
    icon: Users,
  },
  t3: {
    label: "Independently audited",
    helper:
      "Backed by a third-party certification or audit we trust. The highest verification tier.",
    bg: "bg-t3-bg",
    fg: "text-[color:var(--color-t3-fg)]",
    icon: ShieldCheck,
  },
};

export function TrustBadge({ tier, label, sourceUrl, className }: TrustBadgeProps) {
  const t = TIERS[tier];
  const Icon = t.icon;
  const text = label ?? t.label;

  const pill = (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 " +
          "text-[11.5px] font-medium leading-none tracking-[0.02em] " +
          "transition-opacity duration-[200ms] [transition-timing-function:var(--ease-standard)]",
        t.bg,
        t.fg,
        sourceUrl && "hover:opacity-90",
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {text}
    </span>
  );

  const trigger = sourceUrl ? (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${text} — view source`}
    >
      {pill}
    </a>
  ) : (
    pill
  );

  return (
    <Tooltip.Provider delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{trigger}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={6}
            className={cn(
              "z-50 max-w-[240px] rounded-[8px] px-3 py-2 " +
                "text-[12px] leading-[1.5] " +
                "bg-ink text-[color:var(--color-sand)] shadow-[var(--shadow-modal)]",
              "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out",
            )}
          >
            {t.helper}
            <Tooltip.Arrow className="fill-[color:var(--color-ink)]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
