"use client";

import { useEffect, useRef } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useJourneyScroll } from "../TerminalJourney/useJourneyScroll";

export type SessionStep =
  | { kind: "cmd"; text: string; weight?: number }
  | { kind: "out"; node: React.ReactNode; weight?: number };

const START = 0.03;
const END = 0.97;

const light = (c: string) => (
  <Box as="span" w="9px" h="9px" borderRadius="50%" bg={c} display="inline-block" />
);

// One pinned terminal that runs a single continuous session as the page
// scrolls. Scroll position is the session playhead: commands type out and rich
// output blocks reveal in order, and the terminal body auto-scrolls to keep the
// newest line in view (like tail -f). When inactive (SSR / no-JS / reduced
// motion) it renders the whole session statically in normal flow.
export function SessionTerminal({ steps }: { steps: SessionStep[] }) {
  const { ref, active, progress } = useJourneyScroll();
  const bodyRef = useRef<HTMLDivElement>(null);

  const weights = steps.map((s) => s.weight ?? 1);
  const total = weights.reduce((a, b) => a + b, 0);
  const bounds: [number, number][] = [];
  {
    let acc = 0;
    for (const w of weights) {
      const a = START + (acc / total) * (END - START);
      acc += w;
      bounds.push([a, START + (acc / total) * (END - START)]);
    }
  }

  const local = (i: number) => {
    const [a, b] = bounds[i];
    return Math.max(0, Math.min(1, (progress - a) / (b - a)));
  };
  const revealed = (i: number) => !active || progress >= bounds[i][0];

  let lastRevealed = 0;
  for (let i = 0; i < steps.length; i++) if (!active || progress >= bounds[i][0]) lastRevealed = i;

  // Auto-scroll the body to the newest revealed line while active.
  useEffect(() => {
    if (!active) return;
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [progress, active]);

  const status = !active ? "done" : progress < START ? "idle" : progress > END ? "done" : "running";

  const terminal = (
    <Flex
      direction="column"
      w={{ base: "100%", md: "min(880px, 94vw)" }}
      h={active ? { base: "78vh", md: "min(72vh, 640px)" } : "auto"}
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
        overflow={active ? "hidden" : "visible"}
        px={5}
        py={4}
        fontSize="13px"
        lineHeight={1.75}
      >
        {steps.map((s, i) => {
          if (!revealed(i)) return null;
          if (s.kind === "cmd") {
            const l = active ? local(i) : 1;
            const n = Math.round(Math.min(1, l * 1.25) * s.text.length);
            return (
              <Box key={i} color="brand.text" mt={i === 0 ? 0 : 3}>
                <Text as="span">
                  <Text as="span" color="brand.text">gabriel</Text>
                  <Text as="span" color="brand.accent">.dev</Text>
                  <Text as="span" color="brand.textMuted" mx={2}>~</Text>
                  <Text as="span" color="brand.accent" fontWeight="700" mr={2}>$</Text>
                </Text>
                <Text as="span" color="brand.textSecondary">{s.text.slice(0, n)}</Text>
                {i === lastRevealed && <Box as="span" className="cursor-caret" />}
              </Box>
            );
          }
          const shown = !active || local(i) > 0.06;
          return (
            <Box
              key={i}
              mt={2}
              sx={{
                opacity: shown ? 1 : 0,
                transform: shown ? "none" : "translateY(8px)",
                transition: "opacity .35s var(--ease-out-quart), transform .35s var(--ease-out-quart)",
              }}
            >
              {s.node}
            </Box>
          );
        })}
      </Box>
    </Flex>
  );

  if (!active) {
    return (
      <Box as="section" className="journey-fallback" ref={ref} px={{ base: 4, md: 8 }} py={10}>
        {terminal}
      </Box>
    );
  }

  return (
    <Box as="section" ref={ref} position="relative" h={{ base: "360vh", md: "620vh" }}>
      <Flex position="sticky" top={0} h="100vh" align="center" justify="center" px={{ base: 4, md: 8 }} pt={{ base: 16, md: 20 }}>
        {terminal}
      </Flex>
    </Box>
  );
}
