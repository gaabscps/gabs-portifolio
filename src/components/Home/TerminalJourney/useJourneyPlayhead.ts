"use client";

import { useEffect, useRef, useState } from "react";

const BASE_MS = 6000; // natural full-play duration when pinned and not scrolling (deliberate typing)
const MIN_MS = 3000; // fastest full-play when scrolling hard: rate cap so scroll never blasts the typing
const FLOOR_START = 0.08; // section scroll fraction where the scroll floor starts rising
const FLOOR_END = 0.9; // section scroll fraction where the scroll floor reaches 1 (skip)

// Monotonic 0..1 playhead for a journey's terminal animation. It reads the same
// wrapper as useJourneyScroll (shared ref) but produces a different signal:
// once the section pins, the playhead advances on its own over ~BASE_MS, and
// scrolling forward raises a smooth floor (smoothstep of the section's scroll
// position) that accelerates it and, near the end of the section, eases it to
// completion (a soft skip). It never runs backward, so scrolling back up does
// not un-type the terminal. Pair it with useJourneyScroll's reversible
// `progress` for spatial effects (zoom, parallax).
export function useJourneyPlayhead(
  ref: React.RefObject<HTMLElement>,
  active: boolean,
) {
  const [t, setT] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let lastTime = 0;
    let cur = 0;

    const smoothstep = (x: number) => {
      const c = Math.max(0, Math.min(1, x));
      return c * c * (3 - 2 * c);
    };

    const loop = (time: number) => {
      if (!lastTime) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;

      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const sectionP = scrollable > 0 ? -rect.top / scrollable : 0;
      const pinned = rect.top <= 0 && rect.bottom >= window.innerHeight;

      const natural = pinned ? dt / BASE_MS : 0;
      const floor = smoothstep((sectionP - FLOOR_START) / (FLOOR_END - FLOOR_START));

      // Target is the faster of the natural advance and the scroll floor, but
      // the actual advance is rate-capped (dt / MIN_MS) so scrolling accelerates
      // the typing without ever blasting through it. Monotonic (never < cur).
      const target = Math.max(cur + natural, floor);
      const next = Math.min(1, cur + Math.min(target - cur, dt / MIN_MS));
      if (next !== cur) {
        cur = next;
        setT(Math.round(next * 1000) / 1000);
      }

      if (cur >= 1) {
        done.current = true;
        raf = 0;
        return; // completed, stop the loop (monotonic, never restarts)
      }
      raf = requestAnimationFrame(loop);
    };

    if (!done.current) raf = requestAnimationFrame(loop);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active, ref]);

  return t;
}
