import { cn } from "@/lib/cn";
import { CopyButton } from "./CopyButton";

export interface SwatchProps {
  name: string;
  hex: string;
  cssVar?: string;
  role?: string;
  onDark?: boolean;
  className?: string;
}

export function Swatch({ name, hex, cssVar, role, onDark, className }: SwatchProps) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-[12px] border border-border bg-surface",
        className,
      )}
    >
      <div
        className="h-28 w-full relative"
        style={{ background: hex }}
      >
        {onDark && (
          <span className="absolute left-3 top-3 font-mono text-[11px] text-white/75">
            Aa
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-[var(--font-display)] text-[15px] font-semibold text-fg">
            {name}
          </span>
          <CopyButton value={hex} label={hex} tone="light" />
        </div>
        <div className="flex flex-col gap-0.5 font-mono text-[11.5px] text-muted">
          <span>{hex}</span>
          {cssVar && <span>{cssVar}</span>}
        </div>
        {role && (
          <p className="mt-1 text-[12.5px] leading-[1.5] text-muted">{role}</p>
        )}
      </div>
    </div>
  );
}
