"use client";

import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useJourneyScroll } from "./useJourneyScroll";

export type SessionStep =
  | { kind: "cmd"; text: string; weight?: number }
  | { kind: "out"; node: React.ReactNode; weight?: number };

const START = 0.03;
const END = 0.97;

const smoothstep = (x: number) => {
  const c = Math.max(0, Math.min(1, x));
  return c * c * (3 - 2 * c);
};

const light = (c: string) => (
  <Box as="span" w="9px" h="9px" borderRadius="50%" bg={c} display="inline-block" />
);

type BlockProps =
  | { kind: "cmd"; text: string; typedN: number; first: boolean; showCaret: boolean; collapsed: boolean }
  | { kind: "out"; node: React.ReactNode; e: number };

// Memoized so that, as the scroll playhead advances, only the block currently
// typing or revealing re-renders. Fully revealed blocks — including the rich
// FeaturedTile output — keep stable props and are skipped by React.memo, which
// keeps per-tick work off the main thread during the scroll.
//
// Not-yet-revealed blocks are still rendered (collapsed to zero height), never
// removed, so the content stays in the server HTML for crawlers and the DOM is
// identical before and after activation (no layout jump).
const StepBlock = memo(function StepBlock(props: BlockProps) {
  if (props.kind === "cmd") {
    if (props.collapsed) {
      return (
        <Box aria-hidden="true" sx={{ height: 0, overflow: "hidden", opacity: 0 }}>
          <Text as="span" color="brand.textSecondary">{props.text}</Text>
        </Box>
      );
    }
    return (
      <Box color="brand.text" mt={props.first ? 0 : { base: 5, md: 6 }}>
        <Text as="span">
          <Text as="span" color="brand.text">gabriel</Text>
          <Text as="span" color="brand.accent">.dev</Text>
          <Text as="span" color="brand.textMuted" mx={2}>~</Text>
          <Text as="span" color="brand.accent" fontWeight="700" mr={2}>$</Text>
        </Text>
        <Text as="span" color="brand.textSecondary">{props.text.slice(0, props.typedN)}</Text>
        {props.showCaret && <Box as="span" className="cursor-caret" />}
      </Box>
    );
  }
  // Continuous, scroll-tied reveal: the block grows its height from 0 to its
  // natural height (via the grid-rows 0fr..1fr trick) while it fades in, so it
  // streams in like real terminal output pushing content up. At e=0 it is fully
  // collapsed but still in the DOM.
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: `${props.e.toFixed(3)}fr`,
        opacity: props.e,
      }}
    >
      {/* The top padding lives INSIDE the clipped area so a collapsed block
          (e=0) truly measures zero height — otherwise every not-yet-revealed
          block would leave ~12px of phantom space in the idle terminal. */}
      <Box overflow="hidden" minH={0}>
        <Box pt={{ base: 3, md: 4 }}>{props.node}</Box>
      </Box>
    </Box>
  );
});

// One pinned terminal that runs a single continuous session as the page
// scrolls. Scroll position is the session playhead: commands type out and rich
// output blocks reveal in order, and the terminal body auto-scrolls to keep the
// newest line in view (like tail -f).
//
// The pinned layout is rendered on the server and on the first client render
// too (progress 0 → an idle terminal), so React taking over does not change the
// layout — the page does not jump. Only reduced-motion users are switched, after
// mount, to a flat static rendering of the whole session in normal flow.
export function SessionTerminal({ steps }: { steps: SessionStep[] }) {
  const { ref, active, staticFallback, progress } = useJourneyScroll();
  const bodyRef = useRef<HTMLDivElement>(null);

  // Per-step [start, end] progress windows. Depends only on the steps, so it is
  // computed once instead of on every scroll tick.
  const bounds = useMemo(() => {
    const weights = steps.map((s) => s.weight ?? 1);
    const total = weights.reduce((a, b) => a + b, 0);
    const b: [number, number][] = [];
    let acc = 0;
    for (const w of weights) {
      const a = START + (acc / total) * (END - START);
      acc += w;
      b.push([a, START + (acc / total) * (END - START)]);
    }
    return b;
  }, [steps]);

  const local = (i: number) => {
    const [a, b] = bounds[i];
    return Math.max(0, Math.min(1, (progress - a) / (b - a)));
  };
  // Reduced-motion shows everything; otherwise reveal is purely progress-driven,
  // which is identical on the server, on first render, and right after mount.
  const revealed = (i: number) => staticFallback || progress >= bounds[i][0];

  let lastRevealed = 0;
  for (let i = 0; i < steps.length; i++) if (revealed(i)) lastRevealed = i;

  // Smoothly ease the body scroll toward the newest line (no hard snap). The
  // loop self-terminates once it settles and is re-armed whenever the revealed
  // content changes, so it does not run a permanent rAF while idle.
  const rafRef = useRef(0);
  const ensureAutoScroll = useCallback(() => {
    if (!active) return;
    const el = bodyRef.current;
    if (!el || rafRef.current) return;
    const tick = () => {
      const target = el.scrollHeight - el.clientHeight;
      if (Math.abs(target - el.scrollTop) < 0.5) {
        el.scrollTop = target;
        rafRef.current = 0; // settled — stop until content changes again
        return;
      }
      el.scrollTop += (target - el.scrollTop) * 0.12;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [active]);

  useEffect(() => {
    ensureAutoScroll();
  }, [ensureAutoScroll, lastRevealed, progress]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const status = staticFallback ? "done" : progress < START ? "idle" : progress > END ? "done" : "running";

  const terminal = (
    <Flex
      direction="column"
      w={{ base: "100%", md: "min(880px, 94vw)" }}
      h={staticFallback ? "auto" : { base: "78vh", md: "min(72vh, 640px)" }}
      border="1px solid var(--border-strong)"
      borderRadius="14px"
      overflow="hidden"
      bg="linear-gradient(180deg, rgba(20,17,29,.95), rgba(12,10,20,.95))"
      boxShadow="0 30px 90px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.04)"
      sx={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      fontFamily="var(--font-mono)"
    >
      <Flex
        align="center"
        gap={3}
        px={4}
        py={3}
        borderBottom="1px solid"
        borderColor="brand.border"
        bg="rgba(8,6,14,.5)"
        fontSize="11px"
        color="brand.textMeta"
        flex="none"
        aria-hidden="true"
      >
        <Flex gap="6px">{light("#ff5f57")}{light("#febc2e")}{light("#28c840")}</Flex>
        <Text as="span" ml={2}>gabriel@dev <Box as="span" color="brand.textSecondary">~</Box></Text>
        <Flex ml="auto" align="center" gap={2} fontSize="10px" color="brand.stateHelped">
          <Box
            as="span"
            w="6px"
            h="6px"
            borderRadius="50%"
            bg="var(--state-helped)"
            sx={{ boxShadow: "0 0 8px var(--state-helped)", animation: status === "running" ? "pulse-dot 1.4s infinite" : undefined }}
          />
          <Text as="span">{status}</Text>
        </Flex>
      </Flex>

      <Box
        ref={bodyRef}
        flex="1"
        overflow={staticFallback ? "visible" : "hidden"}
        px={5}
        py={4}
        fontSize="13px"
        lineHeight={1.75}
      >
        {steps.map((s, i) => {
          const isRevealed = revealed(i);
          if (s.kind === "cmd") {
            const l = staticFallback ? 1 : local(i);
            const n = isRevealed ? Math.round(Math.min(1, l * 1.25) * s.text.length) : 0;
            return (
              <StepBlock
                key={i}
                kind="cmd"
                text={s.text}
                typedN={n}
                first={i === 0}
                showCaret={isRevealed && i === lastRevealed}
                collapsed={!isRevealed}
              />
            );
          }
          const e = staticFallback ? 1 : isRevealed ? smoothstep(local(i) / 0.55) : 0;
          return <StepBlock key={i} kind="out" node={s.node} e={e} />;
        })}
      </Box>
    </Flex>
  );

  // Reduced-motion (confirmed after mount): flat static content in normal flow.
  if (staticFallback) {
    return (
      <Box as="section" className="journey-fallback" ref={ref} px={{ base: 4, md: 8 }} py={10}>
        {terminal}
      </Box>
    );
  }

  // Default: pinned layout, rendered identically on server and client so
  // activation never restructures the page.
  return (
    <Box as="section" ref={ref} position="relative" h={{ base: "480vh", md: "900vh" }}>
      <Flex position="sticky" top={0} h="100vh" align="center" justify="center" px={{ base: 4, md: 8 }} pt={{ base: 16, md: 20 }}>
        {terminal}
      </Flex>
    </Box>
  );
}
