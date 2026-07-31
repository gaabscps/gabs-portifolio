import { useEffect, useState } from "react";

type Result = { text: string; done: boolean };

// Types `full` one character at a time while `enabled` is true.
// When `enabled` is false it resolves immediately to the full text (used for
// skip and reduced-motion). Re-enabling restarts typing from the first char.
export function useTypewriter(full: string, speed: number, enabled: boolean): Result {
  const [count, setCount] = useState(enabled ? 0 : full.length);

  // Restart from 0 when (re-)enabled; jump to the full string when disabled.
  useEffect(() => {
    setCount(enabled ? 0 : full.length);
  }, [enabled, full]);

  // Advance one character at a time while enabled and not yet complete.
  useEffect(() => {
    if (!enabled || count >= full.length) return;
    const id = window.setTimeout(() => setCount((c) => c + 1), speed);
    return () => window.clearTimeout(id);
  }, [enabled, count, full.length, speed]);

  return { text: full.slice(0, count), done: count >= full.length };
}
