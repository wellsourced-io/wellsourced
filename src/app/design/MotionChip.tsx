"use client";

import { useState } from "react";

export function MotionChip({
  defaultActive = false,
  children,
}: {
  defaultActive?: boolean;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(defaultActive);
  return (
    <button
      type="button"
      className="m-chip"
      data-active={active ? "true" : "false"}
      onClick={() => setActive((a) => !a)}
    >
      {children}
    </button>
  );
}
