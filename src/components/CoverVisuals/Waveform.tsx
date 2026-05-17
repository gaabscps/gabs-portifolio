import { Box, Flex } from "@chakra-ui/react";

const HEIGHTS = [14, 24, 34, 18, 40, 26, 32, 20, 38, 22, 30, 16];

export const Waveform = () => (
  <Flex gap="3px" alignItems="center" aria-hidden="true">
    {HEIGHTS.map((h, i) => (
      <Box
        key={i}
        w="3px"
        h={`${h}px`}
        bg="brand.accent"
        borderRadius="2px"
        sx={{
          animation: "wave-bar 1.2s ease-in-out infinite",
          animationDelay: `${i * 0.08}s`,
        }}
      />
    ))}
  </Flex>
);
