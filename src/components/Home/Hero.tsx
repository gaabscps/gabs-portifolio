"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { HERO_STATUS } from "@/config/hero";

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
      fontSize={{ base: "44px", md: "56px" }}
      fontWeight="800"
      letterSpacing="-0.04em"
      lineHeight="0.95"
      mb={6}
      color="brand.text"
    >
      I got into dev late.
      <br />
      Got into AI{" "}
      <Box as="span" className="serif-italic" color="brand.accent" fontWeight="600">
        on time
      </Box>
      <Box as="span" className="cursor-caret" />
    </Box>

    <Text fontSize={{ base: "14px", md: "16px" }} color="brand.textSecondary" lineHeight={1.6} maxW="544px" mb={8}>
      Front-end engineer in São Paulo. Three years shipping production software{" "}
      <Box as="em" color="brand.text" fontStyle="italic">before</Box>{" "}
      the AI boom. Now shipping with it as leverage, not as the demo.
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
      <Box as="span">7 projects shipped</Box>
      <Box as="span">·</Box>
      <Box as="span">music on weekends</Box>
      <Box as="span">·</Box>
      <Box as="span">gamer for life</Box>
    </Flex>
  </Box>
);
