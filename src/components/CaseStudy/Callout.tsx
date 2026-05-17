"use client";

import { Box, Text } from "@chakra-ui/react";
import type { Callout as CalloutType } from "@/types/project";

const STYLES: Record<CalloutType["kind"], { color: string; symbol: string }> = {
  rule: { color: "var(--state-validated)", symbol: "★" },
  changed: { color: "var(--state-changed)", symbol: "▲" },
  rejected: { color: "var(--state-rejected)", symbol: "⚠" },
};

export const Callout = ({ callout }: { callout: CalloutType }) => {
  const s = STYLES[callout.kind];
  return (
    <Box
      mt={3}
      p="10px 12px"
      bg="brand.surface1"
      border="1px solid"
      borderColor="brand.border"
      borderLeft={`3px solid ${s.color}`}
      borderRadius="4px"
      sx={{
        transition: "transform 250ms ease, border-color 250ms",
        background: "linear-gradient(180deg, rgba(172,107,237,.07), transparent), var(--bg-surface-1)",
      }}
      _hover={{ transform: "rotate(-.5deg) translateX(-2px)" }}
    >
      <Text
        as="div"
        fontSize="9px"
        color={s.color}
        fontFamily="var(--font-mono)"
        letterSpacing="0.15em"
        textTransform="uppercase"
        fontWeight="700"
        mb={1.5}
      >
        {s.symbol} {callout.label}
      </Text>
      <Text fontSize="11px" color="brand.textSecondary" lineHeight={1.5}>
        {callout.body}
      </Text>
    </Box>
  );
};
