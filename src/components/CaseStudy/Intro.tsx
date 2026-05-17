"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import type { Project } from "@/types/project";

export const Intro = ({ project, headline, lede }: { project: Project; headline?: React.ReactNode; lede?: string }) => (
  <Box mb={9} id="intro">
    <Flex
      align="center"
      gap={2}
      mb={3.5}
      fontSize="10px"
      color="brand.accentHover"
      fontFamily="var(--font-mono)"
      letterSpacing="0.12em"
      textTransform="uppercase"
    >
      <Box
        w="7px"
        h="7px"
        borderRadius="50%"
        bg="brand.accent"
        sx={{ animation: "blink-soft 1.8s infinite, pulse-glow 2.5s infinite" }}
      />
      {project.id} · running since {project.startedAt ?? project.year}
    </Flex>
    <Box
      fontSize={{ base: "32px", md: "42px" }}
      fontWeight="800"
      letterSpacing="-0.035em"
      lineHeight={1.02}
      mb={4.5}
      color="brand.text"
    >
      {headline ?? project.id}
    </Box>
    {lede && (
      <Text fontSize="16px" color="brand.textSecondary" lineHeight={1.55} maxW="520px">
        {lede}
      </Text>
    )}
  </Box>
);
