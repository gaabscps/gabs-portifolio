"use client";

import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { TrafficLights } from "@/components/TrafficLights";
import { ReadingProgress } from "./ReadingProgress";

export const StickyBar = () => (
  <Flex
    justify="space-between"
    align="center"
    px={{ base: 5, md: 8 }}
    py={3.5}
    borderBottom="1px solid"
    borderColor="brand.borderSubtle"
    bg="rgba(13,10,20,0.85)"
    sx={{ backdropFilter: "blur(8px)" }}
    position="sticky"
    top={0}
    zIndex={10}
  >
    <Flex align="center" gap={3.5}>
      <TrafficLights />
      <Link href="/" style={{ textDecoration: "none" }}>
        <Text fontSize="11px" color="brand.textSecondary" fontFamily="var(--font-mono)" className="draw-link">
          gabriel.dev
        </Text>
      </Link>
      <Text fontSize="11px" color="brand.textMuted" fontFamily="var(--font-mono)">← back</Text>
    </Flex>
    <ReadingProgress />
  </Flex>
);
