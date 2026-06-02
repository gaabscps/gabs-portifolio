import { Box, Grid, Text } from "@chakra-ui/react";
import Link from "next/link";

type Item = { slug: string; name: string; year: string; category?: string };
type Props = { prev?: Item; next?: Item; index?: string };

export const PrevNextNav = ({ prev, next, index }: Props) => (
  <Box
    px={{ base: 4, md: 8 }}
    py={10}
    borderTop="1px solid"
    borderColor="brand.borderSubtle"
    bg="brand.deep"
    mt={8}
  >
    <Grid templateColumns="1fr auto 1fr" gap={6} alignItems="center" maxW="1200px" mx="auto">
      {prev ? (
        <Link href={`/work/${prev.slug}`} style={{ textDecoration: "none" }}>
          <Box className="draw-link" cursor="pointer">
            <Text
              fontSize="9px"
              color="brand.textMeta"
              fontFamily="var(--font-mono)"
              letterSpacing="0.15em"
              textTransform="uppercase"
              mb={2}
            >
              ← previous case
            </Text>
            <Text fontSize="18px" fontWeight="600" color="brand.text">{prev.name}</Text>
          </Box>
        </Link>
      ) : (
        <Box />
      )}
      <Text fontSize="10px" color="brand.textMuted" fontFamily="var(--font-mono)" letterSpacing="0.15em">
        {index}
      </Text>
      {next ? (
        <Link href={`/work/${next.slug}`} style={{ textDecoration: "none" }}>
          <Box className="draw-link" textAlign="right" cursor="pointer">
            <Text
              fontSize="9px"
              color="brand.textMeta"
              fontFamily="var(--font-mono)"
              letterSpacing="0.15em"
              textTransform="uppercase"
              mb={2}
            >
              next case →
            </Text>
            <Text fontSize="18px" fontWeight="600" color="brand.text">{next.name}</Text>
          </Box>
        </Link>
      ) : (
        <Box />
      )}
    </Grid>
  </Box>
);
