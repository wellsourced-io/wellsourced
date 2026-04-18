import { ArrowUpRight, MapPin } from "lucide-react";
import { Badge } from "./Badge";
import { cn } from "@/lib/cn";

export interface BrandProfileHeaderProps {
  name: string;
  tagline?: string;
  hq?: string;
  ownership?: string;
  productCount?: number;
  establishedYear?: number;
  shopUrl: string;
  logoText?: string;
  className?: string;
}

export function BrandProfileHeader({
  name,
  tagline,
  hq,
  ownership,
  productCount,
  establishedYear,
  shopUrl,
  logoText,
  className,
}: BrandProfileHeaderProps) {
  return (
    <section
      className={cn(
        "bg-surface border border-border rounded-[16px] p-8 md:p-10",
        "grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-end",
        className,
      )}
    >
      <div className="h-20 w-20 md:h-24 md:w-24 rounded-[12px] bg-sand flex items-center justify-center text-muted">
        <span className="font-[var(--font-display)] text-[28px] font-bold tracking-[-0.025em] text-ink/70">
          {logoText ?? name.slice(0, 2).toUpperCase()}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {ownership && <Badge tone="teal">{ownership}</Badge>}
          {hq && (
            <span className="inline-flex items-center gap-1 text-[13px] text-muted">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              {hq}
            </span>
          )}
        </div>
        <h1 className="font-[var(--font-display)] text-[36px] md:text-[44px] font-bold tracking-[-0.02em] leading-[1.05] text-fg">
          {name}
        </h1>
        {tagline && (
          <p className="max-w-[44ch] text-[15px] leading-[1.55] text-muted">{tagline}</p>
        )}
        <div className="mt-2 flex gap-6 text-[13px] text-muted">
          {typeof productCount === "number" && (
            <span>
              <strong className="text-fg font-medium">{productCount}</strong> products
            </span>
          )}
          {typeof establishedYear === "number" && (
            <span>
              Est. <strong className="text-fg font-medium">{establishedYear}</strong>
            </span>
          )}
        </div>
      </div>

      <a
        href={shopUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex h-12 items-center justify-center gap-1.5 rounded-full px-6 " +
            "bg-teal text-white text-[15px] font-medium " +
            "transition-[background] duration-[200ms] [transition-timing-function:var(--ease-standard)] " +
            "hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)]",
        )}
      >
        Visit shop
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </a>
    </section>
  );
}
