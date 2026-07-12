import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";

// Drives a "type a command, then cascade the content in" entrance for a home
// section. Fires once when the section scrolls into view. Safe for SSR and
// no-JS: the hidden state is only applied after mount and only when the
// animation will actually run.
export function useCommandReveal(command: string, itemCount: number, speed = 45) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Applied only on the client, so SSR/no-JS render the content visible.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Fires once, a bit before the section is centered (-15% bottom margin).
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  // Fires when the section is well inside the viewport (used for auto-skip).
  const deeplyInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  const [skipped, setSkipped] = useState(false);

  const willAnimate = mounted && !prefersReduced;
  const runAnim = willAnimate && inView && !skipped;

  const { text: commandText, done: typed } = useTypewriter(command, speed, runAnim);

  const [revealDone, setRevealDone] = useState(false);

  // Any key or click while animating jumps straight to the finished state.
  useEffect(() => {
    if (!runAnim) return;
    const skip = () => setSkipped(true);
    window.addEventListener("click", skip);
    window.addEventListener("keydown", skip);
    return () => {
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [runAnim]);

  // Scrolled deep past a still-typing command: resolve it instantly.
  useEffect(() => {
    if (deeplyInView && !typed) setSkipped(true);
  }, [deeplyInView, typed]);

  // Mark the cascade done shortly after the last item would have appeared.
  useEffect(() => {
    if (!runAnim) {
      setRevealDone(true);
      return;
    }
    if (!typed) return;
    const id = window.setTimeout(() => setRevealDone(true), itemCount * 90 + 300);
    return () => window.clearTimeout(id);
  }, [runAnim, typed, itemCount]);

  // Content is shown when: we are not animating at all (SSR / reduced motion),
  // OR the reveal was skipped, OR the command has finished typing while in view.
  // Crucially, "not animating" must NOT include "mounted but not yet scrolled
  // into view": those sections stay hidden until inView.
  return {
    ref,
    showPrompt: mounted,
    commandText,
    typed,
    revealDone,
    willAnimate,
    containerInitial: (willAnimate ? "hidden" : "show") as "hidden" | "show",
    containerAnimate: (!willAnimate || skipped || (inView && typed) ? "show" : "hidden") as
      | "hidden"
      | "show",
    stagger: skipped ? 0 : 0.09,
  };
}
