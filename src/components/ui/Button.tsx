import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
} from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  asChild?: boolean;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-teal text-white hover:bg-teal-700 active:bg-teal-700 shadow-[var(--shadow-card)]",
  secondary:
    "bg-surface text-fg border border-border hover:border-teal hover:text-teal",
  ghost: "bg-transparent text-fg hover:bg-cloud",
  destructive: "bg-err text-white hover:brightness-95",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[13.5px]",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-6 text-[16px]",
};

const BASE =
  "inline-flex items-center justify-center gap-2 font-medium rounded-full " +
  "whitespace-nowrap select-none cursor-pointer " +
  "transition-[background,color,border,box-shadow] duration-[200ms] [transition-timing-function:var(--ease-standard)] " +
  "disabled:opacity-50 disabled:cursor-not-allowed " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)]";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    disabled,
    className,
    children,
    asChild = false,
    type,
    ...rest
  },
  ref,
) {
  const classes = cn(BASE, VARIANT_STYLES[variant], SIZE_STYLES[size], className);

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    const existing = child.props.className ?? "";
    return cloneElement(child, {
      className: cn(classes, existing),
    });
  }

  return (
    <button
      ref={ref}
      type={type ?? "button"}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
      {...rest}
    >
      {loading ? (
        <>
          <span
            aria-hidden
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
});
