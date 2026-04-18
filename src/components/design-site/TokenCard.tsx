import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CopyButton } from "./CopyButton";

export interface TokenCardProps {
  name: string;
  value: string;
  cssVar?: string;
  usage?: string;
  visual?: ReactNode;
  className?: string;
}

export function TokenCard({
  name,
  value,
  cssVar,
  usage,
  visual,
  className,
}: TokenCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 overflow-hidden rounded-[12px] border border-border bg-surface p-5",
        className,
      )}
    >
      {visual && (
        <div className="flex h-24 items-center justify-center rounded-[8px] bg-sand">
          {visual}
        </div>
      )}
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-[var(--font-display)] text-[15px] font-semibold text-fg">
          {name}
        </span>
        <CopyButton value={cssVar ?? value} label={value} tone="light" />
      </div>
      <div className="flex flex-col gap-0.5 font-mono text-[11.5px] text-muted">
        <span>{value}</span>
        {cssVar && <span>{cssVar}</span>}
      </div>
      {usage && <p className="text-[12.5px] leading-[1.5] text-muted">{usage}</p>}
    </div>
  );
}
