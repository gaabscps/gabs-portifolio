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
        <Box as="h1"
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
          I&apos;m Gabriel Andrade, a software engineer based in São Paulo. I have worked as a developer since 2022, after starting my career in nutrition at UNESP Botucatu. Today I build product interfaces, full-stack systems, and the workflows that make AI-assisted development dependable.
        </Text>

        <Text fontSize="15px" color="brand.textSecondary" lineHeight={1.7} mb={5}>
          At valePay, I owned the front-end: product features, the shared design system, reusable project foundations, and production deploys. SoundWave and Squadhouse extend that work into my own full-stack products, with workers, data models, authentication, billing, and integrations.
        </Text>

        <Text fontSize="15px" color="brand.textSecondary" lineHeight={1.7} mb={5}>
          I use AI throughout that work, with written acceptance criteria, bounded tasks, executable checks, and human review around consequential decisions. ai-squad and aiOS are the tools I built to make that process visible and repeatable.
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
            I use Claude Code, Codex, and Cursor. I write acceptance criteria, constrain each task, and pair model-assisted review with executable verification. A reviewer&apos;s opinion and a passing command answer different questions; I use both when deciding whether a change is ready.
          </Text>

          <Text fontSize="15px" color="brand.textSecondary" lineHeight={1.7} mb={0}>
            In Squadhouse, that same approach extends to operational agents: narrow responsibilities, deterministic validation, an evaluation suite for risky output, and a human decision before anyone is contacted.
          </Text>
        </Box>

        <Text fontSize="15px" color="brand.textSecondary" lineHeight={1.7} mb={8}>
          Outside code, I play music on weekends and games on weeknights.
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
