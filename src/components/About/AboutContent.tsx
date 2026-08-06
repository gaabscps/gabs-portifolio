"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { Nav } from "@/components/Home/Nav";
import { Footer } from "@/components/Home/Footer";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ProjectPlaceholder } from "@/components/ProjectPlaceholder";

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

        <Box
          display="inline-block"
          mb={6}
          borderRadius="50%"
          border="2px solid"
          borderColor="brand.accent"
          overflow="hidden"
          transition="transform var(--duration-fast) var(--ease-apple)"
          _hover={{ transform: "scale(1.05)" }}
        >
          <ImageWithFallback
            src="/about/profile.png"
            alt="Gabriel Andrade"
            width={200}
            height={200}
            priority
            style={{ display: "block" }}
            fallback={
              <ProjectPlaceholder
                width="200px"
                height="200px"
                borderRadius="50%"
                iconSize="60px"
              />
            }
          />
        </Box>

        <Text fontSize="15px" color="brand.textSecondary" lineHeight={1.7} mb={5}>
          I&apos;m Gabriel Andrade. Front-end engineer based in São Paulo. I started in nutrition at UNESP Botucatu before realizing I wanted to build software for a living. That late switch is the most-asked-about thing on my CV, and honestly, I think it&apos;s an advantage.
        </Text>

        <Text fontSize="15px" color="brand.textSecondary" lineHeight={1.7} mb={5}>
          I spent four years shipping production front-end work before the AI boom. React, Next.js, TypeScript, Chakra. Real users, real bugs, real on-call. By the time the LLMs got good, I already knew what good code looked like, and what bad code shipped feels like. That&apos;s the unfair advantage: AI accelerates everything for me because I can tell when its output is right and when it&apos;s wrong.
        </Text>

        <Text fontSize="15px" color="brand.textSecondary" lineHeight={1.7} mb={5}>
          Now I build production software with AI as leverage, never as the demo. I document <em>where</em> AI helps, <em>what</em> I changed by hand, and <em>what</em> I rejected, in every project. That&apos;s how I keep myself honest about it.
        </Text>

        <Box mt={10} mb={8} pt={8} borderTop="1px solid" borderColor="brand.border">
          <Text
            fontSize="10px"
            color="brand.textSecondary"
            letterSpacing="0.22em"
            textTransform="uppercase"
            fontFamily="var(--font-mono)"
            fontWeight="700"
            mb={3.5}
          >
            How I work with AI
          </Text>
          <Box
            fontSize={{ base: "24px", md: "28px" }}
            fontWeight="800"
            letterSpacing="-0.03em"
            lineHeight="1"
            mb={5}
            color="brand.text"
          >
            The flow, not the{" "}
            <Box as="span" className="serif-italic" color="brand.accent" fontWeight="600">vibe</Box>.
          </Box>

          <Text fontSize="15px" color="brand.textSecondary" lineHeight={1.7} mb={5}>
            Claude Code is my daily driver; Cursor for quick edits. I write acceptance criteria before I prompt, if I can&apos;t say what &ldquo;done&rdquo; looks like in plain English, the model won&apos;t know either. Then small diffs, separate commits, and a full read of every line, even when the build is green.
          </Text>

          <Text fontSize="15px" color="brand.textSecondary" lineHeight={1.7} mb={0}>
            The hardest lesson so far: AI ships async code that passes local tests and dies under load. Missing <Box as="code" fontFamily="var(--font-mono)" fontSize="13px" color="brand.text">await</Box>s, stale closures, race conditions the prompt never asked about. Now I review every loop, every effect, every concurrent call by hand before I trust the output.
          </Text>
        </Box>

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
            href="https://www.linkedin.com/in/gabriel-andrade-199601a2/"
            target="_blank"
            rel="noopener noreferrer"
            className="draw-link"
            color="brand.accentHover"
          >
            linkedin ↗
          </Box>
          <Box
            as="a"
            href="mailto:contact@gabrielandrade.net"
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
