import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  shape?: "text" | "block" | "circle";
}

const SHAPES: Record<NonNullable<SkeletonProps["shape"]>, string> = {
  text: "h-[1em] rounded-[4px]",
  block: "rounded-[12px]",
  circle: "rounded-full",
};

export function Skeleton({ shape = "block", className, ...rest }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-cloud via-cloud-2 to-cloud bg-[length:200%_100%] animate-[shimmer_1.4s_linear_infinite]",
        SHAPES[shape],
        className,
      )}
      style={{
        animation: "wsShimmer 1.4s linear infinite",
        backgroundImage:
          "linear-gradient(90deg, var(--color-cloud) 0%, var(--color-cloud-2) 50%, var(--color-cloud) 100%)",
        backgroundSize: "200% 100%",
      }}
      aria-hidden
      {...rest}
    />
  );
}
