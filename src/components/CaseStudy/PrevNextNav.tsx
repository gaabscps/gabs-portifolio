"use client";

import { Box, Grid, Text } from "@chakra-ui/react";
import Link from "next/link";

type Item = { slug: string; name: string; year: string; category?: string };
type Props = { prev?: Item; next?: Item; index?: string };

export const PrevNextNav = ({ prev, next, index }: Props) => (
  <Box
    px={{ base: 5, md: 8 }}
    py={8}
    borderTop="1px solid"
    borderColor="brand.borderSubtle"
    bg="brand.deep"
    mt={6}
  >
    <Grid templateColumns="1fr auto 1fr" gap={4.5} alignItems="center" maxW="900px" mx="auto">
      {prev ? (
        <Link href={`/work/${prev.slug}`} style={{ textDecoration: "none" }}>
          <Box className="draw-link" cursor="pointer">
            <Text
              fontSize="9px"
              color="brand.textMeta"
              fontFamily="var(--font-mono)"
              letterSpacing="0.15em"
              textTransform="uppercase"
              mb={1}
            >
              ← previous case
            </Text>
            <Text fontSize="18px" fontWeight="700" color="brand.text">{prev.name}</Text>
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
              mb={1}
            >
              next case →
            </Text>
            <Text fontSize="18px" fontWeight="700" color="brand.text">{next.name}</Text>
          </Box>
        </Link>
      ) : (
        <Box />
      )}
    </Grid>
  </Box>
);
