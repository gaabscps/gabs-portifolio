"use client";

import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/work", label: "work" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

const EXTERNAL_LINKS = [
  { href: "https://github.com/gaabscps", label: "github ↗" },
  { href: "https://linkedin.com/in/gabriel-andrade", label: "linkedin ↗" },
  { href: "mailto:gaabscps@gmail.com", label: "email ↗" },
];

export const Footer = () => (
  <Box
    as="footer"
    px={{ base: 4, md: 8 }}
    py={10}
    borderTop="1px solid"
    borderColor="brand.borderSubtle"
    bg="brand.deep"
  >
    <Grid templateColumns={{ base: "1fr", md: "2fr 1fr 1fr" }} gap={{ base: 8, md: 12 }}>
      <Box>
        <Text fontSize="11px" color="brand.textMeta" lineHeight={1.7} maxW="480px">
          <Box as="span" color="brand.textSecondary">Gabriel Andrade</Box> — front-end engineer in São Paulo. UNESP Botucatu background, then a late pivot to code. Three years building without AI before catching the wave on time. Musician on weekends, gamer on weeknights.
        </Text>
      </Box>

      <Box>
        <Text fontSize="9px" color="brand.textMuted" letterSpacing="0.2em" textTransform="uppercase" fontFamily="var(--font-mono)" mb={3}>
          Site
        </Text>
        <Flex flexDirection="column" gap={2}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={{ textDecoration: "none" }}>
              <Box
                as="span"
                className="draw-link"
                color="brand.textSecondary"
                fontSize="11px"
                fontFamily="var(--font-mono)"
                transition="color var(--duration-fast) var(--ease-apple)"
                _hover={{ color: "brand.accentHover" }}
              >
                {l.label}
              </Box>
            </Link>
          ))}
        </Flex>
      </Box>

      <Box>
        <Text fontSize="9px" color="brand.textMuted" letterSpacing="0.2em" textTransform="uppercase" fontFamily="var(--font-mono)" mb={3}>
          Elsewhere
        </Text>
        <Flex flexDirection="column" gap={2}>
          {EXTERNAL_LINKS.map((l) => (
            <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <Box
                as="span"
                className="draw-link"
                color="brand.textSecondary"
                fontSize="11px"
                fontFamily="var(--font-mono)"
                transition="color var(--duration-fast) var(--ease-apple)"
                _hover={{ color: "brand.accentHover" }}
              >
                {l.label}
              </Box>
            </Link>
          ))}
        </Flex>
      </Box>
    </Grid>

    <Text fontSize="9px" color="brand.textMuted" mt={10} fontFamily="var(--font-mono)" letterSpacing="0.1em">
      © {new Date().getFullYear()} Gabriel Andrade · built with AI as leverage
    </Text>
  </Box>
);
