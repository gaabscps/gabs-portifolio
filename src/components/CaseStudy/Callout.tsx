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
      mt={4}
      p={4}
      bg="brand.surface1"
      border="1px solid"
      borderColor="brand.border"
      borderLeft={`3px solid ${s.color}`}
      borderRadius="6px"
      transition="border-color var(--duration-base) var(--ease-apple)"
      _hover={{ borderColor: "brand.borderStrong", borderLeftColor: s.color }}
    >
      <Text
        as="div"
        fontSize="9px"
        color={s.color}
        fontFamily="var(--font-mono)"
        letterSpacing="0.15em"
        textTransform="uppercase"
        fontWeight="700"
        mb={2}
      >
        {s.symbol} {callout.label}
      </Text>
      <Text fontSize="12px" color="brand.textSecondary" lineHeight={1.6}>
        {callout.body}
      </Text>
    </Box>
  );
};
