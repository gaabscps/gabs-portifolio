"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FeaturedTile } from "../FeaturedTile";
import { projects } from "@/data/projects";
import type { SessionStep } from "./SessionTerminal";

const rail = (children: React.ReactNode) => (
  <Box pl={{ base: 3, md: 4 }} borderLeft="2px solid" borderColor="brand.borderStrong">
    {children}
  </Box>
);

// Builds the home page as commands followed by readable product output.
export function buildHomeSession(): SessionStep[] {
  const live = projects.filter((p) => p.status === "live");
  const steps: SessionStep[] = [];

  steps.push({ kind: "cmd", text: "whoami" });
  steps.push({
    kind: "out",
    node: (
      <Text color="brand.textSecondary" lineHeight={1.7}>
        <Text as="span" color="brand.stateHelped">gabriel andrade</Text> · software engineer
        <br />
        <Text as="span" color="brand.textMeta">São Paulo, BR · building software since 2022</Text>
      </Text>
    ),
  });

  steps.push({ kind: "cmd", text: "ls --live projects/" });
  steps.push({
    kind: "out",
    node: (
      <Box pl={{ base: 3, md: 4 }} borderLeft="2px solid" borderColor="brand.borderStrong" position="relative">
        <Box position="absolute" left="-6px" top="3px" w="10px" h="10px" borderRadius="50%" bg="brand.accent" sx={{ boxShadow: "0 0 10px rgba(172,107,237,.6)" }} />
        <Text color="brand.text">
          <Text as="span" color="brand.accent" fontWeight="700">read</Text> projects/ · filter status=live
        </Text>
        <Text color="brand.stateHelped">✓ {live.length} live projects found</Text>
      </Box>
    ),
  });
  live.forEach((p) =>
    steps.push({
      kind: "out",
      node: (
        <FeaturedTile
          slug={p.slug}
          status={p.status}
          year={p.year}
          name={p.id}
          blurb={p.motivation ?? ""}
          stack={p.stackChips ?? []}
          aiTool={p.aiTool}
          coverComponent={p.cover?.component}
          coverSrc={p.cover?.src}
          coverAlt={p.cover?.alt}
        />
      ),
    }),
  );

  steps.push({ kind: "cmd", text: "ls ./work --all" });
  steps.push({
    kind: "out",
    node: rail(
      <Box>
        {projects.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} style={{ textDecoration: "none" }}>
            <Flex justify="space-between" align="baseline" gap={3} py={2.5} px={2} borderBottom="1px solid" borderColor="brand.border" cursor="pointer" role="group" _hover={{ bg: "brand.surface1" }}>
              <Flex align={{ base: "flex-start", md: "baseline" }} direction={{ base: "column", md: "row" }} gap={{ base: 0.5, md: 3 }} minW={0}>
                <Text fontSize="14px" color="brand.text">{p.id}</Text>
                <Text fontSize="9px" color="brand.textMuted" letterSpacing="0.1em" textTransform="uppercase">{p.category ?? "project"}</Text>
              </Flex>
              <Text fontSize="11px" color="brand.textMeta" flexShrink={0}>{p.year}</Text>
            </Flex>
          </Link>
        ))}
      </Box>,
    ),
  });
  steps.push({
    kind: "out",
    node: (
      <Text color="brand.textMeta">
        ✓ session ready · {projects.length} projects · <Box as="span" color="brand.accentHover">type / to take over</Box>
      </Text>
    ),
  });

  return steps;
}
