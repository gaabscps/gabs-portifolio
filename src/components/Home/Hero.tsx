"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { HERO_STATUS } from "@/config/hero";

export const Hero = () => (
  <Box as="section" px={{ base: 5, md: 8 }} pt={{ base: 12, md: 16 }} pb={{ base: 8, md: 10 }}>
    <Flex
      display="inline-flex"
      alignItems="center"
      gap={2}
      mb={7}
      px={3.5}
      py={1.5}
      borderRadius="20px"
      bg="rgba(172,107,237,.08)"
      border="1px solid rgba(172,107,237,.25)"
      fontFamily="var(--font-mono)"
      fontSize="10px"
      textTransform="uppercase"
      letterSpacing="0.12em"
      color="brand.accentHover"
    >
      <Box
        w="7px"
        h="7px"
        borderRadius="50%"
        bg="brand.accent"
        sx={{ animation: "blink-soft 1.8s infinite, pulse-glow 2.5s infinite" }}
      />
      {HERO_STATUS.label} · {HERO_STATUS.project} {HERO_STATUS.version}
    </Flex>

    <Box
      fontSize={{ base: "44px", md: "54px" }}
      fontWeight="800"
      letterSpacing="-0.04em"
      lineHeight="0.95"
      mb={{ base: 4, md: 5 }}
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

    <Text fontSize={{ base: "14px", md: "15px" }} color="brand.textSecondary" lineHeight={1.6} maxW="540px" mb={7}>
      Front-end engineer in São Paulo. Three years shipping production software{" "}
      <Box as="em" color="brand.text" fontStyle="italic">before</Box>{" "}
      the AI boom. Now shipping with it as leverage, not as the demo.
    </Text>

    <Flex
      gap={{ base: 3, md: 3.5 }}
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
