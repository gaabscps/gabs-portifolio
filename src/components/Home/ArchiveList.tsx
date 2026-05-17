"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

type Row = { slug: string; name: string; category: string; year: string };
type Props = { rows: Row[]; total: number };

export const ArchiveList = ({ rows, total }: Props) => (
  <Box as="section" px={{ base: 5, md: 8 }} py={8}>
    <Flex justify="space-between" align="baseline" mb={3.5}>
      <Text
        fontSize="10px"
        color="brand.textSecondary"
        letterSpacing="0.22em"
        textTransform="uppercase"
        fontFamily="var(--font-mono)"
        fontWeight="700"
      >
        Archive
      </Text>
      <Link href="/work" style={{ textDecoration: "none" }}>
        <Text className="draw-link" fontSize="10px" color="brand.accentHover" fontFamily="var(--font-mono)">
          view all {total} →
        </Text>
      </Link>
    </Flex>
    {rows.map((row, i) => (
      <Link key={row.slug} href={`/work/${row.slug}`} style={{ textDecoration: "none" }}>
        <Flex
          justify="space-between"
          align="baseline"
          py={3}
          px={2.5}
          borderBottom={i < rows.length - 1 ? "1px solid" : "none"}
          borderColor="brand.borderSubtle"
          borderRadius="4px"
          transition="all 200ms var(--ease-out-quart)"
          cursor="pointer"
          role="group"
          _hover={{ bg: "rgba(172,107,237,.06)", pl: 4.5 }}
        >
          <Flex align="baseline" gap={3.5}>
            <Text fontSize="13px" fontWeight="600" color="brand.text">{row.name}</Text>
            <Text
              fontSize="9px"
              color="brand.textMuted"
              fontFamily="var(--font-mono)"
              letterSpacing="0.12em"
              textTransform="uppercase"
            >
              — {row.category}
            </Text>
          </Flex>
          <Flex align="baseline" gap={3}>
            <Text fontSize="11px" fontFamily="var(--font-mono)" color="brand.textMeta">{row.year}</Text>
            <Text
              fontSize="14px"
              color="brand.accent"
              opacity={0}
              transition="all 200ms var(--ease-out-quart)"
              _groupHover={{ opacity: 1, transform: "translateX(3px)" }}
            >
              →
            </Text>
          </Flex>
        </Flex>
      </Link>
    ))}
  </Box>
);
