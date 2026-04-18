import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

interface SharedProps {
  label?: string;
  helper?: string;
  error?: string;
}

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    SharedProps {}

function FieldShell({
  id,
  label,
  helper,
  error,
  children,
}: {
  id: string;
  label?: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  const describedById = `${id}-helper`;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-[13px] font-medium text-fg leading-none"
        >
          {label}
        </label>
      )}
      {children}
      {(helper || error) && (
        <p
          id={describedById}
          className={cn(
            "text-[12.5px] leading-tight",
            error ? "text-[color:var(--color-err)]" : "text-muted",
          )}
        >
          {error || helper}
        </p>
      )}
    </div>
  );
}

const FIELD_BASE =
  "w-full bg-surface border rounded-[12px] px-3.5 " +
  "text-[14px] text-fg placeholder:text-muted/70 " +
  "transition-[border-color,box-shadow] duration-[200ms] [transition-timing-function:var(--ease-standard)] " +
  "focus:outline-none focus:border-teal focus:shadow-[0_0_0_4px_var(--color-teal-light)] " +
  "disabled:opacity-60 disabled:cursor-not-allowed";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, helper, error, className, id, ...rest },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  return (
    <FieldShell id={fieldId} label={label} helper={helper} error={error}>
      <input
        ref={ref}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={helper || error ? `${fieldId}-helper` : undefined}
        className={cn(
          FIELD_BASE,
          "h-11",
          error ? "border-[color:var(--color-err)]" : "border-border",
          className,
        )}
        {...rest}
      />
    </FieldShell>
  );
});

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    SharedProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, helper, error, className, id, ...rest }, ref) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    return (
      <FieldShell id={fieldId} label={label} helper={helper} error={error}>
        <textarea
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={helper || error ? `${fieldId}-helper` : undefined}
          className={cn(
            FIELD_BASE,
            "py-3 min-h-[96px] resize-y",
            error ? "border-[color:var(--color-err)]" : "border-border",
            className,
          )}
          {...rest}
        />
      </FieldShell>
    );
  },
);
