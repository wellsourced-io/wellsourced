"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DurationRow {
  ms: 80 | 200 | 240 | 320;
  name: string;
  usage: string;
}

export interface DurationVisualizerProps {
  rows?: DurationRow[];
  className?: string;
}

const DEFAULT_ROWS: DurationRow[] = [
  { ms: 80, name: "Tick", usage: "Micro-feedback. Button press, chip tap, tick states." },
  { ms: 200, name: "Crisp", usage: "Component transitions. Hover, filter chip active, input focus." },
  { ms: 240, name: "Tip", usage: "Tooltips, popovers, inline hints." },
  { ms: 320, name: "Reveal", usage: "Modal, drawer, layout changes." },
];

export function DurationVisualizer({
  rows = DEFAULT_ROWS,
  className,
}: DurationVisualizerProps) {
  const [playing, setPlaying] = useState<number | null>(null);

  function play(ms: number) {
    setPlaying(ms);
    window.setTimeout(() => setPlaying(null), ms + 80);
  }

  return (
    <div className={cn("my-8 flex flex-col gap-4", className)}>
      {rows.map((r) => {
        const isPlaying = playing === r.ms;
        return (
          <div
            key={r.ms}
            className="grid items-center gap-5 md:grid-cols-[110px_1fr_2fr_100px]"
          >
            <div>
              <div className="font-mono text-[16px] font-medium text-fg">
                {r.ms}ms
              </div>
              <div className="mt-0.5 text-[11.5px] uppercase tracking-[0.1em] text-muted">
                {r.name}
              </div>
            </div>

            <div className="relative h-2.5 overflow-hidden rounded-full bg-cloud">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-teal"
                style={{
                  width: isPlaying ? "100%" : "0%",
                  transitionProperty: "width",
                  transitionDuration: `${r.ms}ms`,
                  transitionTimingFunction: "var(--ease-standard)",
                }}
              />
            </div>

            <p className="text-[13px] leading-[1.5] text-muted">{r.usage}</p>

            <button
              type="button"
              onClick={() => play(r.ms)}
              className={cn(
                "inline-flex h-8 items-center justify-center rounded-full " +
                  "border border-border bg-surface px-3 text-[12.5px] font-medium text-fg cursor-pointer " +
                  "transition-[color,border] duration-[150ms] [transition-timing-function:var(--ease-standard)] " +
                  "hover:text-teal hover:border-teal " +
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)]",
              )}
            >
              Play
            </button>
          </div>
        );
      })}
    </div>
  );
}
