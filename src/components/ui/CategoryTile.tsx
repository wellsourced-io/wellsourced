import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/cn";

export interface CategoryTileProps {
  label: string;
  count: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href?: string;
  className?: string;
}

export function CategoryTile({
  label,
  count,
  icon: Icon,
  href,
  className,
}: CategoryTileProps) {
  const Tag = (href ? "a" : "div") as "a" | "div";
  return (
    <Tag
      {...(href ? { href } : {})}
      className={cn(
        "group flex flex-col gap-3 rounded-[12px] border border-border bg-surface p-5 " +
          "transition-[border-color,transform,box-shadow] duration-[200ms] [transition-timing-function:var(--ease-standard)] " +
          (href ? "hover:border-teal hover:-translate-y-px hover:shadow-[var(--shadow-hover)] cursor-pointer " : ""),
        className,
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-teal-light text-teal">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="mt-auto flex items-baseline justify-between gap-2">
        <span className="font-[var(--font-display)] text-[16px] font-semibold text-fg">
          {label}
        </span>
        <span className="font-mono text-[12px] text-muted tabular-nums">{count}</span>
      </div>
    </Tag>
  );
}
