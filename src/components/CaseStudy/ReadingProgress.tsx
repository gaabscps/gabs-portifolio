"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { useReadingProgress } from "@/hooks/useReadingProgress";

export const ReadingProgress = () => {
  const p = useReadingProgress();
  return (
    <Flex align="center" gap={2.5} fontSize="10px" color="brand.textMeta" fontFamily="var(--font-mono)">
      <Box w="80px" h="2px" bg="brand.borderSubtle" borderRadius="1px" overflow="hidden">
        <Box
          h="100%"
          w={`${p}%`}
          transition="width 100ms linear"
          sx={{ background: "linear-gradient(90deg, var(--accent), var(--accent-hover))" }}
        />
      </Box>
      <Text>{p}% read</Text>
    </Flex>
  );
};
