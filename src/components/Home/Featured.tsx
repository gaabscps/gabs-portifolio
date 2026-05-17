"use client";

import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { FeaturedTile } from "./FeaturedTile";
import { projects } from "@/data/projects";

export const Featured = () => {
  const live = projects.filter((p) => p.status === "live").slice(0, 3);
  return (
    <Box as="section" px={{ base: 5, md: 8 }} pb={9}>
      <Flex justify="space-between" align="baseline" mb={4}>
        <Text
          fontSize="10px"
          color="brand.textSecondary"
          letterSpacing="0.22em"
          textTransform="uppercase"
          fontFamily="var(--font-mono)"
          fontWeight="700"
        >
          Currently in production
        </Text>
        <Text fontSize="10px" color="brand.textMuted" fontFamily="var(--font-mono)">
          {String(live.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </Text>
      </Flex>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={3}>
        {live.map((p) => (
          <FeaturedTile
            key={p.id}
            slug={p.slug}
            status={p.status}
            year={p.year}
            name={p.id}
            blurb={p.motivation ?? ""}
            stack={p.stackChips ?? []}
            aiTool={p.aiTool}
            coverComponent={p.cover?.component}
          />
        ))}
      </Grid>
    </Box>
  );
};
