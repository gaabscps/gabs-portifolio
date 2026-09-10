import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import type { Stat } from "@/types/project";

const DAY = 24 * 60 * 60 * 1000;

// Turns a start date into a short running duration, so stats like "live in prod"
// count on their own. Runs on the server while the page is generated, so the
// number is refreshed by every deploy rather than typed by hand.
const elapsedSince = (since: string) => {
  const days = Math.floor((Date.now() - new Date(`${since}T00:00:00Z`).getTime()) / DAY);
  if (days < 14) {
    return `${days}d`;
  }
  const weeks = Math.floor(days / 7);
  if (weeks < 52) {
    return `${weeks}wk`;
  }
  return `${Math.floor(days / 30)}mo`;
};

const statValue = (stat: Stat) => {
  return stat.since ? elapsedSince(stat.since) : stat.value;
};

export const Stats = ({ stats, footer }: { stats: Stat[]; footer?: React.ReactNode }) => (
  <Box
    mb={10}
    p={{ base: 5, md: 8 }}
    border="1px solid"
    borderColor="brand.borderSubtle"
    borderRadius="12px"
    bg="brand.surface1"
    boxShadow="var(--inset-highlight)"
  >
    <Text
      fontSize="11px"
      color="brand.textSecondary"
      letterSpacing="0.22em"
      textTransform="uppercase"
      fontFamily="var(--font-mono)"
      fontWeight="700"
      mb={6}
    >
      technical outcomes
    </Text>
    <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={6}>
      {stats.map((s, i) => (
        <Flex key={i} direction="column" align="flex-start" gap={3} py={2} minW={0}>
          <Text fontSize={{ base: "27px", md: "36px" }} fontWeight="700" letterSpacing="-0.03em" color="brand.text" lineHeight={1}>
            {statValue(s)}
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
        mt={6}
        pt={4}
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
