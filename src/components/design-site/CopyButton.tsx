"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";

export interface CopyButtonProps {
  value: string;
  label?: string;
  tone?: "dark" | "light";
  className?: string;
}

export function CopyButton({
  value,
  label = "Copy",
  tone = "dark",
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked — noop */
    }
  }, [value]);

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Copied" : label}
      className={cn(
        "inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full " +
          "text-[11.5px] font-medium leading-none cursor-pointer " +
          "transition-[color,background,border] duration-[150ms] [transition-timing-function:var(--ease-standard)] " +
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)]",
        tone === "dark"
          ? "text-white/70 border border-white/10 hover:text-white hover:bg-white/5"
          : "text-muted border border-border hover:text-fg hover:border-teal",
        className,
      )}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" aria-hidden />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" aria-hidden />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
