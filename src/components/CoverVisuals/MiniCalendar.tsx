import { Box, Flex } from "@chakra-ui/react";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const NUMS = Array.from({ length: 14 }, (_, i) => i + 1);
const ACTIVE = new Set([5, 10]);

export const MiniCalendar = () => (
  <Box display="grid" gridTemplateColumns="repeat(7, 16px)" gap="2px" aria-hidden="true">
    {DAYS.map((d, i) => (
      <Flex
        key={`d-${i}`}
        w="16px"
        h="16px"
        bg="brand.surface2"
        border="1px solid"
        borderColor="brand.border"
        fontSize="8px"
        color="brand.textSecondary"
        fontFamily="var(--font-mono)"
        alignItems="center"
        justifyContent="center"
      >
        {d}
      </Flex>
    ))}
    {NUMS.map((n) => (
      <Flex
        key={n}
        w="16px"
        h="16px"
        bg={ACTIVE.has(n) ? "brand.accent" : "brand.surface1"}
        border="1px solid"
        borderColor={ACTIVE.has(n) ? "brand.accent" : "brand.border"}
        color={ACTIVE.has(n) ? "brand.bg" : "brand.textMeta"}
        fontWeight={ACTIVE.has(n) ? "700" : "400"}
        fontSize="8px"
        fontFamily="var(--font-mono)"
        alignItems="center"
        justifyContent="center"
      >
        {n}
      </Flex>
    ))}
  </Box>
);
