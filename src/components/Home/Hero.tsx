"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { HERO_STATUS } from "@/config/hero";
import { projects } from "@/data/projects";

export const Hero = () => (
  <Box as="section" px={{ base: 4, md: 8 }} pt={{ base: 16, md: 24 }} pb={10}>
    <Flex
      display="inline-flex"
      alignItems="center"
      gap={2}
      mb={8}
      px={3}
      py={2}
      borderRadius="full"
      bg="var(--accent-soft)"
      border="1px solid var(--accent-quiet)"
      fontFamily="var(--font-mono)"
      fontSize="10px"
      textTransform="uppercase"
      letterSpacing="0.12em"
      color="brand.accentHover"
    >
      <Box
        w="6px"
        h="6px"
        borderRadius="50%"
        bg="brand.accent"
        sx={{ animation: "blink-soft 2s infinite" }}
      />
      {HERO_STATUS.label} · {HERO_STATUS.project} {HERO_STATUS.version}
    </Flex>

    <Box
      as="h1"
      fontSize={{ base: "clamp(32px, 10vw, 44px)", md: "56px" }}
      fontWeight="800"
      letterSpacing="-0.04em"
      lineHeight="0.95"
      mb={6}
      color="brand.text"
    >
      I build products end to end.
      <br />
      And make AI development{" "}
      <Box as="span" className="serif-italic" color="brand.accent" fontWeight="600">
        reliable
      </Box>
      <Box as="span" className="cursor-caret" />
    </Box>

    <Text fontSize={{ base: "14px", md: "16px" }} color="brand.textSecondary" lineHeight={1.6} maxW="544px" mb={8}>
      Software engineer in São Paulo, building products since 2022. I work across
      front-end, product systems, and AI-assisted workflows from idea to production.
    </Text>

    <Flex
      gap={3}
      flexWrap="wrap"
      fontSize="10px"
      fontFamily="var(--font-mono)"
      letterSpacing="0.08em"
      color="brand.textMeta"
    >
      <Box as="span">SP, BR</Box>
      <Box as="span">·</Box>
      <Box as="span">{projects.length} selected case studies</Box>
      <Box as="span">·</Box>
      <Box as="span">React · TypeScript · Node.js</Box>
      <Box as="span">·</Box>
      <Box as="span">AI workflows · product systems</Box>
    </Flex>
  </Box>
);
