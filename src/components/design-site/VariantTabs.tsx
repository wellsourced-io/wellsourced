"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface Variant {
  label: string;
  /** Pre-rendered preview content. (Server-rendered in MDX — no function form.) */
  node: ReactNode;
}

export interface VariantTabsProps {
  variants: Variant[];
  defaultValue?: string;
  className?: string;
  background?: "sand" | "surface" | "ink";
  padding?: "sm" | "md" | "lg";
}

const BG: Record<NonNullable<VariantTabsProps["background"]>, string> = {
  sand: "bg-sand",
  surface: "bg-surface",
  ink: "bg-ink",
};

const PAD: Record<NonNullable<VariantTabsProps["padding"]>, string> = {
  sm: "p-6",
  md: "p-10",
  lg: "p-14",
};

export function VariantTabs({
  variants,
  defaultValue,
  className,
  background = "sand",
  padding = "lg",
}: VariantTabsProps) {
  const instanceId = useId();
  const first = variants[0]?.label ?? "";
  return (
    <Tabs.Root
      className={cn("my-8", className)}
      defaultValue={defaultValue ?? first}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[16px] border border-border",
          BG[background],
        )}
      >
        <div
          className={cn("flex items-center justify-center min-h-[220px]", PAD[padding])}
        >
          {variants.map((v) => (
            <Tabs.Content key={v.label} value={v.label} className="outline-none">
              <div className="flex flex-wrap items-center justify-center gap-4">
                {v.node}
              </div>
            </Tabs.Content>
          ))}
        </div>

        <Tabs.List
          aria-label="Variants"
          className="flex items-center justify-center gap-1 border-t border-border bg-surface/70 p-2 backdrop-blur"
        >
          {variants.map((v) => (
            <Tabs.Trigger
              key={v.label}
              value={v.label}
              id={`${instanceId}-${v.label}`}
              className={cn(
                "h-8 rounded-full px-3 text-[12.5px] font-medium leading-none " +
                  "text-muted cursor-pointer " +
                  "transition-[color,background] duration-[150ms] [transition-timing-function:var(--ease-standard)] " +
                  "hover:text-fg " +
                  "data-[state=active]:bg-ink data-[state=active]:text-[color:var(--color-sand)] " +
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)]",
              )}
            >
              {v.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>
    </Tabs.Root>
  );
}
