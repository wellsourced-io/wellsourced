"use client";

import { useState } from "react";

export function MotionStagger() {
  const [seed, setSeed] = useState(0);
  const widths = ["80%", "65%", "90%", "70%"] as const;

  return (
    <div
      className="m-stage"
      style={{
        flexDirection: "column",
        gap: 8,
        padding: "22px 22px",
      }}
    >
      {widths.map((w, i) => (
        <div
          key={`${seed}-${i}`}
          className={`m-result stagger-${i + 1}`}
        >
          <div className="dot" />
          <div className="m-result-bar" style={{ width: w }} />
        </div>
      ))}
      <button
        type="button"
        className="m-restart"
        onClick={() => setSeed((s) => s + 1)}
      >
        &#x21BB; Replay
      </button>
    </div>
  );
}
