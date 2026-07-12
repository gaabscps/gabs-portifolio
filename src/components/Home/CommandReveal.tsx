"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useCommandReveal } from "@/hooks/useCommandReveal";

const MotionBox = motion(Box);

// Variants are module-level so both the container and items share them.
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

export const RevealItem = ({ children }: { children: React.ReactNode }) => (
  <MotionBox variants={itemVariants}>{children}</MotionBox>
);

export const CommandReveal = ({
  command,
  itemCount,
  children,
  px = { base: 4, md: 8 },
  py = 10,
  borderTop = false,
}: {
  command: string;
  itemCount: number;
  children: React.ReactNode;
  px?: object;
  py?: object | number;
  borderTop?: boolean;
}) => {
  const r = useCommandReveal(command, itemCount);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: r.stagger } },
  };

  return (
    <Box
      as="section"
      ref={r.ref as React.RefObject<HTMLDivElement>}
      px={px}
      py={py}
      borderTop={borderTop ? "1px solid" : undefined}
      borderColor={borderTop ? "brand.borderSubtle" : undefined}
    >
      {/* Prompt line. Height is reserved via minH so it never shifts layout. */}
      <Flex
        align="baseline"
        mb={5}
        minH="20px"
        fontFamily="var(--font-mono)"
        fontSize="13px"
        flexWrap="wrap"
        gap={0}
        aria-hidden="true"
        opacity={r.showPrompt ? 1 : 0}
      >
        <Text as="span" color="brand.text">gabriel</Text>
        <Text as="span" color="brand.accent">.dev</Text>
        <Text as="span" color="brand.textMuted" mx={2}>~</Text>
        <Text as="span" color="brand.accent" fontWeight="700" mr={2}>$</Text>
        <Text as="span" color="brand.textSecondary">{r.commandText}</Text>
        <Box
          as="span"
          ml="2px"
          color="brand.accent"
          style={r.typed ? { animation: "cursor-blink 1.2s steps(1) infinite" } : undefined}
        >
          ▊
        </Box>
        {!r.revealDone && (
          <Text as="span" ml="auto" fontSize="10px" color="brand.textMuted" letterSpacing="0.1em" opacity={0.7}>
            press any key to skip
          </Text>
        )}
      </Flex>

      <motion.div
        variants={containerVariants}
        initial={r.containerInitial}
        animate={r.containerAnimate}
        style={{ pointerEvents: r.containerAnimate === "show" ? "auto" : "none" }}
      >
        {children}
      </motion.div>
    </Box>
  );
};
