"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { useReadingProgress } from "@/hooks/useReadingProgress";

export const ReadingProgress = () => {
  const p = useReadingProgress();
  return (
    <Flex align="center" gap={3} fontSize="10px" color="brand.textMeta" fontFamily="var(--font-mono)">
      <Box w="80px" h="2px" bg="brand.borderSubtle" borderRadius="1px" overflow="hidden">
        <Box
          h="100%"
          w={`${p}%`}
          bg="brand.accent"
          opacity={0.7}
          transition="width 100ms linear"
        />
      </Box>
      <Text>{p}% read</Text>
    </Flex>
  );
};
