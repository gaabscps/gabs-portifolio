import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import type { Stat } from "@/types/project";

export const Stats = ({ stats, footer }: { stats: Stat[]; footer?: React.ReactNode }) => (
  <Box
    mb={10}
    p={6}
    border="1px solid"
    borderColor="brand.borderSubtle"
    borderRadius="10px"
    sx={{ background: "linear-gradient(135deg, rgba(172,107,237,.06), transparent)" }}
  >
    <Text
      fontSize="11px"
      color="brand.textSecondary"
      letterSpacing="0.22em"
      textTransform="uppercase"
      fontFamily="var(--font-mono)"
      fontWeight="700"
      mb={4.5}
    >
      what shipped, in numbers
    </Text>
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      {stats.map((s, i) => (
        <Flex key={i} align="baseline" gap={2} py={2.5}>
          <Text fontSize="36px" fontWeight="800" letterSpacing="-0.03em" color="brand.text" lineHeight={1}>
            {s.value}
          </Text>
          <Text
            fontSize="10px"
            color="brand.textSecondary"
            fontFamily="var(--font-mono)"
            letterSpacing="0.1em"
            textTransform="uppercase"
          >
            {s.label}
          </Text>
        </Flex>
      ))}
    </Grid>
    {footer && (
      <Box
        mt={4.5}
        pt={3.5}
        borderTop="1px solid"
        borderColor="brand.borderSubtle"
        fontSize="11px"
        color="brand.textMeta"
        fontFamily="var(--font-mono)"
      >
        {footer}
      </Box>
    )}
  </Box>
);
