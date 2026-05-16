import { cn } from "@/lib/cn";

export interface LogoMarkProps {
  className?: string;
  size?: number;
  title?: string;
}

/** Abstract WS mark — a quiet monogram, rendered in currentColor. */
export function LogoMark({ className, size = 28, title = "WellSourced" }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      role="img"
      aria-label={title}
      className={className}
    >
      <rect x="0.5" y="0.5" width="43" height="43" rx="12" fill="currentColor" opacity="0.08" />
      <path
        d="M10 15 L14.5 29 L19 18 L23.5 29 L28 15"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 21 c0 -2.5 2 -4 4.5 -4 c2.5 0 4.5 1.5 4.5 4 c0 4 -9 4 -9 8 c0 2.5 2 4 4.5 4 c2.5 0 4.5 -1.5 4.5 -4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface LockupProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  tone?: "default" | "inverse";
}

export function Lockup({ className, size = "md", tone = "default" }: LockupProps) {
  const fontSize = size === "sm" ? 20 : size === "lg" ? 32 : 26;
  const markSize = size === "sm" ? 22 : size === "lg" ? 36 : 30;
  const wordmarkColor =
    tone === "inverse" ? "text-white" : "text-fg";
  return (
    <span
      className={cn("inline-flex items-center gap-2.5 select-none", className)}
    >
      <LogoMark size={markSize} className="text-teal" />
      <span
        className={cn(
          "font-[var(--font-display)] font-bold tracking-[-0.025em] leading-none",
          wordmarkColor,
        )}
        style={{ fontSize }}
      >
        Well
        <span className="font-[var(--font-serif)] italic font-normal opacity-80">
          Sourced
        </span>
      </span>
    </span>
  );
}
