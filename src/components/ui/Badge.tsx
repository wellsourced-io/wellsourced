import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "neutral" | "teal" | "success" | "warn" | "err";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const TONES: Record<BadgeTone, string> = {
  neutral: "bg-cloud text-fg",
  teal: "bg-teal-light text-[color:var(--color-teal-tint-fg)]",
  success: "bg-t3-bg text-[color:var(--color-t3-fg)]",
  warn: "bg-warn-bg text-[color:var(--color-warn-fg)]",
  err: "bg-err-bg text-[color:var(--color-err-fg)]",
};

export function Badge({ tone = "neutral", className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] " +
          "font-[var(--font-sans)] text-[12px] font-medium leading-none tracking-[0.02em]",
        TONES[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
