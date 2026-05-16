import { PROPS } from "@/lib/design-site/props";
import { cn } from "@/lib/cn";

export interface PropsTableProps {
  component: keyof typeof PROPS | string;
  className?: string;
}

export function PropsTable({ component, className }: PropsTableProps) {
  const doc = PROPS[component];
  if (!doc) {
    return (
      <div className="my-6 rounded-[12px] border border-dashed border-border bg-cloud/40 p-4 text-[13px] text-muted">
        No props documented yet for <code>{component}</code>.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "my-8 overflow-hidden rounded-[12px] border border-border bg-surface",
        className,
      )}
    >
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-cloud/50">
            <th className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-muted">
              Name
            </th>
            <th className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-muted">
              Type
            </th>
            <th className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-muted">
              Default
            </th>
            <th className="px-4 py-3 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-muted">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="font-mono text-[12.5px]">
          {doc.props.map((p) => (
            <tr key={p.name} className="border-t border-border align-top">
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="text-fg">{p.name}</span>
                {p.required && (
                  <span className="ml-1 text-[color:var(--color-err)]" aria-label="required">
                    *
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-muted">
                <span className="break-words">{p.type}</span>
              </td>
              <td className="px-4 py-3 text-muted whitespace-nowrap">
                {p.default ?? "—"}
              </td>
              <td className="px-4 py-3 font-sans text-[13px] leading-[1.55] text-fg/90">
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
