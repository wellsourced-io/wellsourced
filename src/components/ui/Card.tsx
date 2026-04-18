import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const PADDING: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-10",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { interactive = false, padding = "md", className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-surface border border-border rounded-[16px] shadow-[var(--shadow-card)]",
        interactive &&
          "cursor-pointer transition-[transform,box-shadow,border-color] duration-[200ms] [transition-timing-function:var(--ease-standard)] hover:shadow-[var(--shadow-hover)] hover:-translate-y-px hover:border-cloud-2",
        PADDING[padding],
        className,
      )}
      {...rest}
    />
  );
});
