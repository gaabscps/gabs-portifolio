"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { Nav } from "@/components/Home/Nav";
import { Footer } from "@/components/Home/Footer";

export default function AboutContent() {
  return (
    <Box className="bg-textured" minH="100vh" color="brand.text" display="flex" flexDirection="column">
      <Nav active="about" />

      <Box as="section" px={{ base: 5, md: 8 }} pt={{ base: 12, md: 16 }} pb={{ base: 8, md: 10 }} maxW="720px" w="100%" mx="auto">
        <Text
          fontSize="10px"
          color="brand.textSecondary"
          letterSpacing="0.22em"
          textTransform="uppercase"
          fontFamily="var(--font-mono)"
          fontWeight="700"
          mb={3.5}
        >
          About
        </Text>
        <Box
          fontSize={{ base: "38px", md: "48px" }}
          fontWeight="800"
          letterSpacing="-0.04em"
          lineHeight="0.95"
          mb={6}
          color="brand.text"
        >
          Took the long way to{" "}
          <Box as="span" className="serif-italic" color="brand.accent" fontWeight="600">code</Box>.
        </Box>

        <Text fontSize="15px" color="brand.textSecondary" lineHeight={1.7} mb={5}>
          I&apos;m Gabriel Andrade. Front-end engineer based in São Paulo. I started in nutrition at UNESP Botucatu before realizing I wanted to build software for a living. That late switch is the most-asked-about thing on my CV — and honestly, I think it&apos;s an advantage.
        </Text>

        <Text fontSize="15px" color="brand.textSecondary" lineHeight={1.7} mb={5}>
          I spent three years shipping production front-end work before the AI boom. React, Next.js, TypeScript, Chakra. Real users, real bugs, real on-call. By the time the LLMs got good, I already knew what good code looked like — and what bad code shipped feels like. That&apos;s the unfair advantage: AI accelerates everything for me because I can tell when its output is right and when it&apos;s wrong.
        </Text>

        <Text fontSize="15px" color="brand.textSecondary" lineHeight={1.7} mb={5}>
          Now I build production software with AI as leverage — never as the demo. I document <em>where</em> AI helps, <em>what</em> I changed by hand, and <em>what</em> I rejected, in every project. That&apos;s how I keep myself honest about it.
        </Text>

        <Text fontSize="15px" color="brand.textSecondary" lineHeight={1.7} mb={8}>
          Outside code: I play music on weekends and games on weeknights. I&apos;ve been a Minecraft addict for longer than I care to admit.
        </Text>

        <Flex gap={3} flexWrap="wrap" fontSize="11px" fontFamily="var(--font-mono)">
          <Box
            as="a"
            href="https://github.com/gaabscps"
            target="_blank"
            rel="noopener noreferrer"
            className="draw-link"
            color="brand.accentHover"
          >
            github ↗
          </Box>
          <Box
            as="a"
            href="https://linkedin.com/in/gabriel-andrade"
            target="_blank"
            rel="noopener noreferrer"
            className="draw-link"
            color="brand.accentHover"
          >
            linkedin ↗
          </Box>
          <Box
            as="a"
            href="mailto:gaabscps@gmail.com"
            className="draw-link"
            color="brand.accentHover"
          >
            email ↗
          </Box>
        </Flex>
      </Box>

      <Box flex="1" />
      <Footer />
    </Box>
  );
}
