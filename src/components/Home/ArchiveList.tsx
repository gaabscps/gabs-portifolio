"use client";

import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { TerminalJourney, type JourneyItem } from "./TerminalJourney/TerminalJourney";

type Row = { slug: string; name: string; category: string; year: string };
type Props = { rows: Row[]; total: number };

export const ArchiveList = ({ rows, total }: Props) => {
  const items: JourneyItem[] = rows.map((row, i) => ({
    key: row.slug,
    node: (
      <Link href={`/work/${row.slug}`} style={{ textDecoration: "none" }}>
        <Flex justify="space-between" align="baseline" py={4} px={3}
          borderBottom={i < rows.length - 1 ? "1px solid" : "none"} borderColor="brand.borderSubtle"
          borderRadius="4px" transition="all var(--duration-fast) var(--ease-apple)" cursor="pointer" role="group"
          _hover={{ bg: "brand.surface1", pl: 4 }}>
          <Flex align="baseline" gap={4}>
            <Text fontSize="14px" fontWeight="500" color="brand.text">{row.name}</Text>
            <Text fontSize="9px" color="brand.textMuted" fontFamily="var(--font-mono)" letterSpacing="0.12em" textTransform="uppercase">{row.category}</Text>
          </Flex>
          <Flex align="baseline" gap={4}>
            <Text fontSize="11px" fontFamily="var(--font-mono)" color="brand.textMeta">{row.year}</Text>
            <Text fontSize="14px" color="brand.accent" opacity={0} transition="all var(--duration-fast) var(--ease-apple)" _groupHover={{ opacity: 1, transform: "translateX(2px)" }}>→</Text>
          </Flex>
        </Flex>
      </Link>
    ),
  }));

  // A final "view all" row as an extra item.
  items.push({
    key: "__viewall",
    node: (
      <Link href="/work" style={{ textDecoration: "none" }}>
        <Text className="draw-link" fontSize="10px" color="brand.accentHover" fontFamily="var(--font-mono)" pt={3}>
          view all {total} →
        </Text>
      </Link>
    ),
  });

  return (
    <TerminalJourney
      command="ls ./work --all"
      context="~/work"
      toolLabel="./work · all statuses"
      toolResult={`${total} projects`}
      items={items}
    />
  );
};

export type { Row };
