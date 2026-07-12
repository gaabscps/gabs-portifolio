"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Terminal = dynamic(() => import("./Terminal").then((m) => m.Terminal), { ssr: false });

const isTypingTarget = (el: EventTarget | null) => {
  const node = el as HTMLElement | null;
  if (!node) return false;
  const tag = node.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || node.isContentEditable;
};

// Mounted once, site-wide. Opens the terminal on "/" (unless the user is typing
// in a field) and lazy-loads the overlay code only on first open.
export function TerminalMount() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !open && !isTypingTarget(document.activeElement)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Any element can open the terminal by dispatching this event (e.g. the home
  // hint, the nav prompt, or the minimized chip in a later phase).
  useEffect(() => {
    const openIt = () => setOpen(true);
    window.addEventListener("terminal:open", openIt);
    return () => window.removeEventListener("terminal:open", openIt);
  }, []);

  if (!open) return null;
  return <Terminal onClose={() => setOpen(false)} />;
}
