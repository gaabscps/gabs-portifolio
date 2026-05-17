"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import type { Project } from "@/types/project";

export const Intro = ({ project, headline, lede }: { project: Project; headline?: React.ReactNode; lede?: string }) => (
  <Box mb={10} id="intro">
    <Flex
      align="center"
      gap={2}
      mb={4}
      fontSize="10px"
      color="brand.accentHover"
      fontFamily="var(--font-mono)"
      letterSpacing="0.12em"
      textTransform="uppercase"
    >
      <Box
        w="6px"
        h="6px"
        borderRadius="50%"
        bg="brand.accent"
        sx={{ animation: "blink-soft 2s infinite" }}
      />
      {project.id} · running since {project.startedAt ?? project.year}
    </Flex>
    <Box
      fontSize={{ base: "32px", md: "44px" }}
      fontWeight="800"
      letterSpacing="-0.035em"
      lineHeight={1.02}
      mb={6}
      color="brand.text"
    >
      {headline ?? project.id}
    </Box>
    {lede && (
      <Text fontSize="16px" color="brand.textSecondary" lineHeight={1.6} maxW="560px">
        {lede}
      </Text>
    )}
  </Box>
);
