"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section ID is currently active in the viewport.
 * Returns the topmost intersecting section, or the last passed section if
 * the user has scrolled past everything tracked.
 */
export const useActiveSection = (ids: string[]): string => {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;

    const visible = new Set<string>();

    const onScroll = () => {
      // Fallback for "passed all sections" case — pick the last section above viewport top + 100px
      if (visible.size === 0) {
        let bestId = ids[0];
        let bestTop = -Infinity;
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top;
          if (top <= 100 && top > bestTop) {
            bestTop = top;
            bestId = id;
          }
        }
        setActiveId(bestId);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        });
        const firstVisible = ids.find((id) => visible.has(id));
        if (firstVisible) {
          setActiveId(firstVisible);
        } else {
          onScroll();
        }
      },
      { rootMargin: "-92px 0px -55% 0px", threshold: 0 }
    );

    const elements: HTMLElement[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    });

    onScroll();

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [ids]);

  return activeId;
};
