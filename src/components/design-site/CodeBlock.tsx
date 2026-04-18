import { highlightCode } from "@/lib/design-site/shiki";
import { cn } from "@/lib/cn";
import { CopyButton } from "./CopyButton";

export interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  className?: string;
}

/** Server component — runs shiki at render time. */
export async function CodeBlock({
  children,
  language = "tsx",
  filename,
  className,
}: CodeBlockProps) {
  const source = typeof children === "string" ? children.replace(/\n$/, "") : "";
  const html = await highlightCode(source, language);
  return (
    <div
      className={cn(
        "group my-6 overflow-hidden rounded-[12px] border border-border bg-ink text-[13px]",
        className,
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
        <span className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-white/50">
          {filename ?? language}
        </span>
        <CopyButton value={source} />
      </div>
      <div
        className="shiki-wrap overflow-x-auto px-4 py-4 leading-[1.7]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
