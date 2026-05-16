"use client";

import { useState } from "react";

const ROWS = [
  {
    dur: 80,
    name: "instant",
    use: (
      <>Tap feedback, focus ring, checkbox tick. Below perceptual threshold &mdash; feels immediate.</>
    ),
  },
  {
    dur: 150,
    name: "micro",
    use: (
      <>
        Button hover, chip toggle, arrow nudge, color fade. <strong>Default for all interactive states.</strong>
      </>
    ),
  },
  {
    dur: 200,
    name: "small",
    use: <>Card lift, tooltip fade, filter chip dismiss. Things that change position a few pixels.</>,
  },
  {
    dur: 240,
    name: "medium",
    use: <>Modal open, drawer slide, tooltip popover. Things that reveal new content.</>,
  },
  {
    dur: 320,
    name: "page",
    use: <>Full-screen transitions only &mdash; route change, mobile search overlay. Used sparingly.</>,
  },
] as const;

function MotionRow({ dur, name, use }: { dur: number; name: string; use: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(false);
    requestAnimationFrame(() => {
      setPlaying(true);
      window.setTimeout(() => setPlaying(false), dur + 350);
    });
  };

  return (
    <div className={`motion-row${playing ? " is-playing" : ""}`} data-dur={dur}>
      <div className="dur-label">
        <div className="dur-num">{dur}ms</div>
        <div className="dur-name">{name}</div>
      </div>
      <div className="track">
        <div className="bar" />
        <div className="ball" />
      </div>
      <div className="dur-use">{use}</div>
      <button type="button" className="motion-play" onClick={handlePlay}>
        &#9654; Play
      </button>
    </div>
  );
}

export function MotionScale() {
  return (
    <div className="motion-scale">
      {ROWS.map((row) => (
        <MotionRow key={row.dur} dur={row.dur} name={row.name} use={row.use} />
      ))}
    </div>
  );
}
