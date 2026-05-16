import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function DocShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <TopBar />
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] gap-0 px-6">
        <aside className="hidden md:block border-r border-border">
          <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <Sidebar />
          </div>
        </aside>
        <main className="min-w-0 px-2 md:px-10 py-10 md:py-14">
          <article className="prose-ws max-w-[760px]">{children}</article>
        </main>
      </div>
    </div>
  );
}
