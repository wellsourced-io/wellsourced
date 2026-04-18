"use client";

import { Search } from "lucide-react";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "hero" | "compact";
  shortcut?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  function SearchBar(
    {
      variant = "hero",
      shortcut,
      placeholder = "Search organic cotton shirts, Japanese denim, …",
      className,
      ...rest
    },
    ref,
  ) {
    const isHero = variant === "hero";
    return (
      <label
        className={cn(
          "group flex items-center gap-3 bg-surface border border-border " +
            "transition-[border-color,box-shadow] duration-[200ms] [transition-timing-function:var(--ease-standard)] " +
            "focus-within:border-teal focus-within:shadow-[0_0_0_4px_var(--color-teal-light)]",
          isHero
            ? "h-[60px] rounded-full px-5 text-[16px]"
            : "h-10 rounded-full px-3.5 text-[14px]",
          className,
        )}
      >
        <Search
          className={cn("shrink-0 text-muted", isHero ? "h-5 w-5" : "h-4 w-4")}
          aria-hidden
        />
        <input
          ref={ref}
          type="search"
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-transparent outline-none border-0 " +
              "text-fg placeholder:text-muted/80",
            isHero ? "text-[16px]" : "text-[14px]",
          )}
          {...rest}
        />
        {shortcut && (
          <kbd
            className={cn(
              "hidden sm:inline-flex items-center justify-center px-1.5 " +
                "font-mono text-[11.5px] text-muted rounded-md border border-border bg-cloud",
              isHero ? "h-7 min-w-7" : "h-6 min-w-6",
            )}
            aria-hidden
          >
            {shortcut}
          </kbd>
        )}
      </label>
    );
  },
);
