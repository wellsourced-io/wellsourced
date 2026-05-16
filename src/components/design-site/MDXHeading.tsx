import {
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type Level = 1 | 2 | 3 | 4;

interface MDXHeadingProps extends ComponentPropsWithoutRef<"h1"> {
  level: Level;
}

function flatten(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flatten).join("");
  if (isValidElement(node)) {
    const { children } = node.props as { children?: ReactNode };
    return flatten(children);
  }
  return "";
}

function slugify(children: ReactNode): string {
  return flatten(children)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const STYLES: Record<Level, string> = {
  1: "font-[var(--font-display)] text-[44px] md:text-[56px] font-bold tracking-[-0.025em] leading-[1.05] text-fg mt-0 mb-6",
  2: "font-[var(--font-display)] text-[28px] md:text-[32px] font-semibold tracking-[-0.015em] leading-[1.15] text-fg mt-14 mb-4 scroll-mt-24",
  3: "font-[var(--font-display)] text-[20px] md:text-[22px] font-semibold leading-[1.3] text-fg mt-10 mb-3 scroll-mt-24",
  4: "font-[var(--font-display)] text-[16px] font-semibold leading-[1.3] text-fg mt-6 mb-2",
};

export function MDXHeading({ level, children, className, id, ...rest }: MDXHeadingProps) {
  const Tag = (`h${level}`) as "h1" | "h2" | "h3" | "h4";
  const resolvedId = id ?? (level >= 2 ? slugify(children) : undefined);
  return (
    <Tag
      id={resolvedId}
      className={cn(STYLES[level], "group relative", className)}
      {...rest}
    >
      {children}
      {resolvedId && level >= 2 && (
        <a
          href={`#${resolvedId}`}
          aria-label="Link to this section"
          className="ml-2 text-muted/40 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 focus-visible:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)] transition-opacity text-[0.7em] font-normal no-underline"
        >
          #
        </a>
      )}
    </Tag>
  );
}
