"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { useJourneyScroll } from "./useJourneyScroll";
import { buildBeats, beatBounds } from "./beats";

const START = 0.06;
const END = 0.92;

const light = (c: string) => (
  <Box as="span" w="9px" h="9px" borderRadius="50%" bg={c} display="inline-block" />
);

export type JourneyItem = { key: string; node: React.ReactNode };

export function TerminalJourney({
  command,
  context,
  toolLabel,
  toolResult,
  items,
  endStat,
  endHint = "type / for the full terminal",
}: {
  command: string;
  context: string;
  toolLabel: string;
  toolResult: string;
  items: JourneyItem[];
  endStat?: string;
  endHint?: string;
}) {
  const stat = endStat ?? `${items.length} shown`;
  const { ref, active, progress } = useJourneyScroll();
  const beats = buildBeats(items.length);
  const bounds = beatBounds(beats, START, END);

  // Local progress within a beat, clamped 0..1.
  const local = (i: number) => {
    const [a, b] = bounds[i];
    return Math.max(0, Math.min(1, (progress - a) / (b - a)));
  };
  const reached = (i: number) => progress >= bounds[i][0];

  // Command typing scrubbed by scroll (fully shown when inactive).
  const cmdLocal = active ? local(0) : 1;
  const typedCount = Math.round(cmdLocal * command.length);
  const typedCmd = command.slice(0, typedCount);
  const cmdTyping = active && progress >= bounds[0][0] && progress < bounds[0][1];

  const toolIdx = 1;
  const showTool = !active || reached(toolIdx);
  const toolOk = !active || local(toolIdx) > 0.5;

  const itemBeatIndex = (i: number) => 2 + i;
  const showItem = (i: number) => !active || reached(itemBeatIndex(i));
  const endShown = !active || reached(beats.length - 1);
  const status = !active ? "done" : progress < START ? "idle" : progress > END ? "done" : "running";

  const prompt = (
    <Text as="span" fontFamily="var(--font-mono)">
      <Text as="span" color="brand.text">gabriel</Text>
      <Text as="span" color="brand.accent">.dev</Text>
      <Text as="span" color="brand.textMuted" mx={2}>~</Text>
      <Text as="span" color="brand.accent" fontWeight="700" mr={2}>$</Text>
    </Text>
  );

  const terminal = (
    <Box
      border="1px solid var(--border-strong)"
      borderRadius="14px"
      overflow="hidden"
      bg="linear-gradient(180deg, rgba(20,17,29,.94), rgba(12,10,20,.94))"
      boxShadow="0 30px 90px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.04)"
      sx={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      w={{ base: "100%", md: "min(880px, 92vw)" }}
      fontFamily="var(--font-mono)"
    >
      <Flex align="center" gap={3} px={4} py={3} borderBottom="1px solid" borderColor="brand.border" bg="rgba(8,6,14,.5)" fontSize="11px" color="brand.textMeta" aria-hidden="true">
        <Flex gap="6px">{light("#ff5f57")}{light("#febc2e")}{light("#28c840")}</Flex>
        <Text as="span" ml={2}>gabriel@dev <Box as="span" color="brand.textSecondary">{context}</Box></Text>
        <Flex ml="auto" align="center" gap={2} fontSize="10px" color="brand.stateHelped">
          <Box as="span" w="6px" h="6px" borderRadius="50%" bg="var(--state-helped)"
            sx={{ boxShadow: "0 0 8px var(--state-helped)", animation: status === "running" ? "pulse-dot 1.4s infinite" : undefined }} />
          <Text as="span">{status}</Text>
        </Flex>
      </Flex>

      <Box px={5} py={4} minH={{ base: "auto", md: "400px" }} fontSize="13px" lineHeight={1.7}>
        {/* command */}
        <Box color="brand.text">
          {prompt}
          <Text as="span" color="brand.textSecondary">{typedCmd}</Text>
          {cmdTyping && <Box as="span" className="cursor-caret" />}
        </Box>

        {/* tool call */}
        {showTool && (
          <Box mt={4} mb={2} pl={4} borderLeft="2px solid" borderColor="brand.borderStrong" position="relative">
            <Box position="absolute" left="-6px" top="2px" w="10px" h="10px" borderRadius="50%" bg="brand.accent" sx={{ boxShadow: "0 0 10px rgba(172,107,237,.6)" }} />
            <Text color="brand.text"><Text as="span" color="brand.accent" fontWeight="700">read</Text> {toolLabel}</Text>
            <Text color={toolOk ? "brand.stateHelped" : "brand.textMeta"}>{toolOk ? `✓ ${toolResult}` : "scanning…"}</Text>
          </Box>
        )}

        {/* streamed items on the rail */}
        <Box pl={4} borderLeft="2px solid" borderColor="brand.borderStrong">
          {items.map((it, i) =>
            showItem(i) ? (
              <Box key={it.key} sx={{ opacity: 0, transform: "translateY(12px)", animation: "journey-in .3s var(--ease-out-quart) forwards" }}>
                {it.node}
              </Box>
            ) : null
          )}
        </Box>

        {/* end / handover */}
        {endShown && (
          <Text mt={4} pl={4} color="brand.textMeta">
            {"✓"} done · {stat} · <Box as="span" color="brand.accentHover">{endHint}</Box>
          </Text>
        )}
      </Box>
    </Box>
  );

  // Inactive (SSR / no-JS / reduced motion): full content, no pin, normal flow.
  if (!active) {
    return (
      <Box as="section" ref={ref} px={{ base: 4, md: 8 }} py={10}>
        {terminal}
      </Box>
    );
  }

  // Active: tall wrapper creates scroll distance; sticky stage pins the terminal.
  return (
    <Box as="section" ref={ref} position="relative" h={{ base: "200vh", md: "440vh" }}>
      <Flex position="sticky" top={0} h="100vh" align="center" justify="center" px={{ base: 4, md: 8 }} overflow="hidden">
        {terminal}
      </Flex>
    </Box>
  );
}
