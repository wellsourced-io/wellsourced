import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface PreviewProps {
  children: ReactNode;
  background?: "sand" | "surface" | "ink";
  padding?: "sm" | "md" | "lg";
  align?: "start" | "center";
  className?: string;
  caption?: string;
}

export function Preview({
  children,
  background = "sand",
  padding = "lg",
  align = "center",
  className,
  caption,
}: PreviewProps) {
  return (
    <figure className="my-8">
      <div
        className={cn(
          "relative overflow-hidden rounded-[16px] border border-border",
          background === "sand" && "bg-sand",
          background === "surface" && "bg-surface",
          background === "ink" && "bg-ink",
          padding === "sm" && "p-6",
          padding === "md" && "p-10",
          padding === "lg" && "p-14",
          className,
        )}
      >
        <div
          className={cn(
            "flex flex-wrap gap-4",
            align === "center" ? "items-center justify-center" : "items-start justify-start",
          )}
        >
          {children}
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-[13px] text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
