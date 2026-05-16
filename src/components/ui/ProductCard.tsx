import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Card } from "./Card";
import { TrustBadge } from "./TrustBadge";

export interface ProductCardProps {
  title: string;
  brand: string;
  price: string;
  tier: "t1" | "t2" | "t3";
  image?: string;
  buyUrl: string;
  className?: string;
}

export function ProductCard({
  title,
  brand,
  price,
  tier,
  image,
  buyUrl,
  className,
}: ProductCardProps) {
  return (
    <Card interactive padding="none" className={cn("overflow-hidden flex flex-col", className)}>
      <div className="relative aspect-[4/3] w-full bg-placeholder overflow-hidden">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted">
            <svg
              aria-hidden
              viewBox="0 0 48 48"
              className="h-10 w-10 opacity-40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <rect x="4" y="6" width="40" height="36" rx="4" />
              <circle cx="16" cy="18" r="3" />
              <path d="M4 34l12-12 10 10 6-6 12 12" />
            </svg>
          </div>
        )}
        <div className="absolute left-3 top-3">
          <TrustBadge tier={tier} />
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11.5px] uppercase tracking-[0.14em] text-muted font-medium">
              {brand}
            </div>
            <h3 className="mt-1 font-[var(--font-display)] text-[17px] font-semibold leading-[1.25] text-fg line-clamp-2">
              {title}
            </h3>
          </div>
          <div className="font-[var(--font-display)] text-[20px] font-semibold tabular-nums text-fg whitespace-nowrap">
            {price}
          </div>
        </div>

        <a
          href={buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-1 inline-flex h-10 items-center justify-center gap-1.5 rounded-full " +
              "bg-teal text-white px-4 text-[14px] font-medium " +
              "transition-[background] duration-[200ms] [transition-timing-function:var(--ease-standard)] " +
              "hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)]",
          )}
        >
          Buy direct
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </Card>
  );
}
