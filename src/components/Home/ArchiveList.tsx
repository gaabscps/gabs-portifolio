"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";

type Row = { slug: string; name: string; category: string; year: string };
type Props = { rows: Row[]; total: number; animate?: boolean };

const COMMAND = "ls ./work --all";

export const ArchiveList = ({ rows, total, animate = false }: Props) => {
  const prefersReduced = useReducedMotion();
  const [skipped, setSkipped] = useState(false);

  // Whether the typing + stagger animation should actually run.
  const runAnim = animate && !prefersReduced && !skipped;

  const { text, done: typed } = useTypewriter(COMMAND, 45, runAnim);

  // Rows reveal once the command is typed (or immediately if not animating).
  const revealing = !runAnim || typed;

  // Drives the "skip" hint: true until the cascade has visually finished.
  const [revealDone, setRevealDone] = useState(!runAnim);

  // Any click or keypress during the animation jumps to the finished state.
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

  // Mark the cascade done a bit after the last row would have appeared.
  useEffect(() => {
    if (!runAnim) {
      setRevealDone(true);
      return;
    }
    if (!typed) return;
    const id = window.setTimeout(() => setRevealDone(true), rows.length * 90 + 300);
    return () => window.clearTimeout(id);
  }, [runAnim, typed, rows.length]);

  // When skipped, collapse the cascade to instant; otherwise cascade normally.
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: skipped ? 0 : 0.09 } },
  };
  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: skipped ? 0 : 0.24, ease: [0.2, 0.8, 0.2, 1] as const } },
  };

  return (
    <Box as="section" px={{ base: 4, md: 8 }} py={10}>
      {animate && (
        <Flex align="baseline" mb={5} fontFamily="var(--font-mono)" fontSize="13px" flexWrap="wrap" gap={0}>
          <Text as="span" color="brand.text">gabriel</Text>
          <Text as="span" color="brand.accent">.dev</Text>
          <Text as="span" color="brand.textMuted" mx={2}>~</Text>
          <Text as="span" color="brand.accent" fontWeight="700" mr={2}>$</Text>
          <Text as="span" color="brand.textSecondary">{text}</Text>
          <Box
            as="span"
            ml="2px"
            color="brand.accent"
            style={typed ? { animation: "cursor-blink 1.2s steps(1) infinite" } : undefined}
          >
            ▊
          </Box>
          {!revealDone && (
            <Text as="span" ml="auto" fontSize="10px" color="brand.textMuted" letterSpacing="0.1em" opacity={0.7}>
              press any key to skip
            </Text>
          )}
        </Flex>
      )}

      <motion.div
        variants={container}
        initial={runAnim ? "hidden" : "show"}
        animate={revealing ? "show" : "hidden"}
        style={{ pointerEvents: revealing ? "auto" : "none" }}
      >
        <motion.div variants={item}>
          <Flex justify="space-between" align="baseline" mb={4}>
            <Text
              fontSize="10px"
              color="brand.textSecondary"
              letterSpacing="0.22em"
              textTransform="uppercase"
              fontFamily="var(--font-mono)"
              fontWeight="700"
            >
              Archive
            </Text>
            <Link href="/work" style={{ textDecoration: "none" }}>
              <Text className="draw-link" fontSize="10px" color="brand.accentHover" fontFamily="var(--font-mono)">
                view all {total} →
              </Text>
            </Link>
          </Flex>
        </motion.div>

        {rows.map((row, i) => (
          <motion.div key={row.slug} variants={item}>
            <Link href={`/work/${row.slug}`} style={{ textDecoration: "none" }}>
              <Flex
                justify="space-between"
                align="baseline"
                py={4}
                px={3}
                borderBottom={i < rows.length - 1 ? "1px solid" : "none"}
                borderColor="brand.borderSubtle"
                borderRadius="4px"
                transition="all var(--duration-fast) var(--ease-apple)"
                cursor="pointer"
                role="group"
                _hover={{ bg: "brand.surface1", pl: 4 }}
              >
                <Flex align="baseline" gap={4}>
                  <Text fontSize="14px" fontWeight="500" color="brand.text">{row.name}</Text>
                  <Text
                    fontSize="9px"
                    color="brand.textMuted"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.12em"
                    textTransform="uppercase"
                  >
                    {row.category}
                  </Text>
                </Flex>
                <Flex align="baseline" gap={4}>
                  <Text fontSize="11px" fontFamily="var(--font-mono)" color="brand.textMeta">{row.year}</Text>
                  <Text
                    fontSize="14px"
                    color="brand.accent"
                    opacity={0}
                    transition="all var(--duration-fast) var(--ease-apple)"
                    _groupHover={{ opacity: 1, transform: "translateX(2px)" }}
                  >
                    →
                  </Text>
                </Flex>
              </Flex>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
};
