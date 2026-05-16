import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Breadcrumb as Crumb } from "@/lib/routes/breadcrumbs";

export interface BreadcrumbProps {
  trail: Crumb[];
}

/**
 * Back-link breadcrumb per FR-017. For the common single-item trail
 * (e.g. brand-products → brand profile), renders as `← {parent}`. For
 * multi-item trails (admin sub-pages), falls back to a chain with chevron
 * separators — but the back-link to the immediate parent stays prominent.
 */
export function Breadcrumb({ trail }: BreadcrumbProps) {
  if (trail.length === 0) return null;

  if (trail.length === 1) {
    const [parent] = trail;
    return (
      <nav aria-label="Breadcrumb">
        <Link
          href={parent.href}
          className="inline-flex items-center gap-1.5 text-[14px] text-muted transition-colors duration-[150ms] hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded-sm"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          {parent.label}
        </Link>
      </nav>
    );
  }

  // Multi-item trail (admin sub-pages) — chain with chevrons; the immediate
  // parent (last item) still gets the back-arrow treatment.
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 text-[13px] text-muted">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.href} className="inline-flex items-center gap-1.5">
              {isLast && (
                <ArrowLeft size={14} aria-hidden="true" />
              )}
              <Link
                href={crumb.href}
                className="hover:text-fg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded-sm"
              >
                {crumb.label}
              </Link>
              {!isLast && <span aria-hidden="true">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
