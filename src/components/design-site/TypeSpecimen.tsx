import { cn } from "@/lib/cn";

export interface TypeSpecimenProps {
  name: string;
  font: "display" | "sans" | "mono" | "serif";
  weight: number | string;
  size: number;
  lineHeight?: number | string;
  letterSpacing?: string;
  sample?: string;
  className?: string;
}

const FONT_STYLES = {
  display: "var(--font-display)",
  sans: "var(--font-sans)",
  mono: "var(--font-mono)",
  serif: "var(--font-serif)",
} as const;

export function TypeSpecimen({
  name,
  font,
  weight,
  size,
  lineHeight = 1.25,
  letterSpacing,
  sample = "Find what's actually made well.",
  className,
}: TypeSpecimenProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-border py-8 first:pt-0 last:border-b-0",
        className,
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-[var(--font-display)] text-[14px] font-semibold text-fg">
          {name}
        </span>
        <span className="font-mono text-[11.5px] text-muted">
          {size}px · {weight} · {font}
          {letterSpacing ? ` · ${letterSpacing}` : ""}
        </span>
      </div>
      <p
        className="text-fg m-0"
        style={{
          fontFamily: FONT_STYLES[font],
          fontWeight: weight,
          fontSize: `${size}px`,
          lineHeight,
          letterSpacing: letterSpacing ?? undefined,
        }}
      >
        {sample}
      </p>
    </div>
  );
}
