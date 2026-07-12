"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Computes 0..1 scroll progress through a tall wrapper.
//
// The pinned layout is rendered on the server AND on the client's first render
// (mounted=false, progress=0 → an idle terminal), so hydration does NOT change
// the layout and the page does not jump when React takes over. `active` only
// gates whether scrolling updates the progress. `staticFallback` is true only
// once we confirm reduced-motion on the client, and swaps to the full static
// content — that is the one case that intentionally restructures after mount.
export function useJourneyScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const active = mounted && !prefersReduced;
  const staticFallback = mounted && !!prefersReduced;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let last = -1;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      // Skip work when the wrapper is fully outside the viewport.
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const scrollable = el.offsetHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      // 500 steps across the whole journey: half the re-renders of a 1000-step
      // quantum, still fine-grained enough that the short commands type out
      // character by character.
      const rounded = Math.round(p * 500) / 500;
      if (rounded !== last) {
        last = rounded;
        setProgress(rounded);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [active]);

  return { ref, active, staticFallback, progress };
}
