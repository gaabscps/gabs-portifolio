"use client";

import { useEffect, useRef, useState } from "react";

const BASE_MS = 6000; // natural full-play duration when pinned (deliberate typing)
const MIN_MS = 3200; // fastest full-play when scrolling hard: rate cap so scroll never blasts the typing
const TINY_BOOST = 0.00006; // per-pixel-of-scroll nudge: acceleration is nearly imperceptible
const FLOOR_START = 0.7; // scroll only starts guaranteeing completion late in the section
const FLOOR_END = 0.95; // ...and reaches full only near the very end (soft finish)

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
    let lastY = window.scrollY || 0;

    const smoothstep = (x: number) => {
      const c = Math.max(0, Math.min(1, x));
      return c * c * (3 - 2 * c);
    };

    // Only run the rAF loop when the section is near the viewport. Off-screen
    // journeys suspend and are re-armed by the scroll listener, so we never spin
    // a 60fps loop (with a per-frame layout read) for sections not yet reached.
    const nearViewport = () => {
      const rect = el.getBoundingClientRect();
      return rect.bottom > -window.innerHeight && rect.top < window.innerHeight * 2;
    };

    const loop = (time: number) => {
      if (!nearViewport()) {
        raf = 0;
        lastTime = 0;
        return;
      }
      if (!lastTime) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;

      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const sectionP = scrollable > 0 ? -rect.top / scrollable : 0;
      const pinned = rect.top <= 0 && rect.bottom >= window.innerHeight;

      const y = window.scrollY || 0;
      const dy = Math.abs(y - lastY);
      lastY = y;

      // The playhead mostly auto-plays at its natural pace; scrolling adds only a
      // tiny nudge, and the floor guarantees completion late in the section.
      const natural = pinned ? dt / BASE_MS : 0;
      const boost = pinned ? dy * TINY_BOOST : 0;
      const floor = smoothstep((sectionP - FLOOR_START) / (FLOOR_END - FLOOR_START));

      // Rate-capped (dt / MIN_MS) so scroll never blasts the typing. Monotonic.
      const target = Math.max(cur + natural + boost, floor);
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

    // Re-arm the suspended loop when the section scrolls back near the viewport.
    const onScroll = () => {
      if (!raf && !done.current && nearViewport()) {
        lastY = window.scrollY || 0;
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    if (!done.current) raf = requestAnimationFrame(loop);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [active, ref]);

  return t;
}
