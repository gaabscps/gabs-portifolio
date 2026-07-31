import { Box, Text } from "@chakra-ui/react";

export const PullQuote = ({ quote, context }: { quote: string; context?: string }) => (
  <Box mb={10}>
    <Box
      fontFamily="var(--font-serif-italic)"
      fontStyle="italic"
      fontSize="24px"
      lineHeight={1.45}
      color="brand.text"
      borderLeft="3px solid"
      borderColor="brand.accent"
      pl={6}
      py={2}
      mb={4}
    >
      &ldquo;{quote}&rdquo;
    </Box>
    {context && (
      <Text fontSize="11px" color="brand.textMeta" fontFamily="var(--font-mono)" pl={6}>
        {context}
      </Text>
    )}
  </Box>
);
