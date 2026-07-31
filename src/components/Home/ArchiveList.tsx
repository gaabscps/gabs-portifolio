"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

type Row = { slug: string; name: string; category: string; year: string };
type Props = { rows: Row[]; total: number };

// A plain list of projects, styled in the terminal identity (a static prompt
// header plus mono rows with a hover arrow). No pinned journey.
export const ArchiveList = ({ rows, total }: Props) => (
  <Box as="section" px={{ base: 4, md: 8 }} py={8}>
    <Flex align="baseline" mb={5} fontFamily="var(--font-mono)" fontSize="13px" aria-hidden="true">
      <Text as="span" color="brand.text">gabriel</Text>
      <Text as="span" color="brand.accent">.dev</Text>
      <Text as="span" color="brand.textMuted" mx={2}>~</Text>
      <Text as="span" color="brand.accent" fontWeight="700" mr={2}>$</Text>
      <Text as="span" color="brand.textSecondary">ls ./work --all</Text>
      <Text as="span" ml="auto" fontSize="10px" color="brand.textMuted">{total} projects</Text>
    </Flex>

    {rows.map((row, i) => (
      <Link key={row.slug} href={`/work/${row.slug}`} style={{ textDecoration: "none" }}>
        <Flex
          justify="space-between"
          align="baseline"
          py={4}
          px={3}
          borderBottom={i < rows.length - 1 ? "1px solid" : "none"}
          borderColor="brand.borderSubtle"
          borderRadius="4px"
          transition="all var(--duration-fast) var(--ease-apple)"
          cursor="pointer"
          role="group"
          _hover={{ bg: "brand.surface1", pl: 4 }}
        >
          <Flex align="baseline" gap={4}>
            <Text fontSize="14px" fontWeight="500" color="brand.text">{row.name}</Text>
            <Text fontSize="9px" color="brand.textMuted" fontFamily="var(--font-mono)" letterSpacing="0.12em" textTransform="uppercase">
              {row.category}
            </Text>
          </Flex>
          <Flex align="baseline" gap={4}>
            <Text fontSize="11px" fontFamily="var(--font-mono)" color="brand.textMeta">{row.year}</Text>
            <Text fontSize="14px" color="brand.accent" opacity={0} transition="all var(--duration-fast) var(--ease-apple)" _groupHover={{ opacity: 1, transform: "translateX(2px)" }}>
              →
            </Text>
          </Flex>
        </Flex>
      </Link>
    ))}
  </Box>
);

export type { Row };
