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

  if (!open) return null;
  return <Terminal onClose={() => setOpen(false)} />;
}
