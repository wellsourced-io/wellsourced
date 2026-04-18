"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FilterChipProps {
  children: ReactNode;
  active?: boolean;
  defaultActive?: boolean;
  onToggle?: (next: boolean) => void;
  count?: number;
  disabled?: boolean;
  className?: string;
}

export function FilterChip({
  children,
  active,
  defaultActive = false,
  onToggle,
  count,
  disabled,
  className,
}: FilterChipProps) {
  const [internal, setInternal] = useState(defaultActive);
  const isControlled = active !== undefined;
  const isActive = isControlled ? active : internal;

  function handleClick() {
    const next = !isActive;
    if (!isControlled) setInternal(next);
    onToggle?.(next);
  }

  return (
    <button
      type="button"
      aria-pressed={isActive}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-full px-3 " +
          "text-[13px] font-medium leading-none cursor-pointer " +
          "transition-[background,color,border] duration-[150ms] [transition-timing-function:var(--ease-standard)] " +
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)] " +
          "disabled:opacity-50 disabled:cursor-not-allowed",
        isActive
          ? "bg-ink text-[color:var(--color-sand)] border border-transparent"
          : "bg-surface text-fg border border-border hover:border-teal hover:text-teal",
        className,
      )}
    >
      <span>{children}</span>
      {typeof count === "number" && (
        <span
          className={cn(
            "font-mono text-[11.5px] tabular-nums",
            isActive ? "opacity-70" : "text-muted",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
