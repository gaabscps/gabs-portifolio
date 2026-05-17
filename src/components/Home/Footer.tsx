"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const FOOTER_LINKS = [
  { href: "https://github.com/gaabscps", label: "github ↗" },
  { href: "https://linkedin.com/in/gabriel-andrade", label: "linkedin ↗" },
  { href: "mailto:gaabscps@gmail.com", label: "email ↗" },
];

export const Footer = () => (
  <Box
    as="footer"
    px={{ base: 5, md: 8 }}
    py={6}
    borderTop="1px solid"
    borderColor="brand.borderSubtle"
    bg="brand.deep"
  >
    <Text fontSize="11px" color="brand.textMeta" lineHeight={1.6} maxW="600px">
      <Box as="span" color="brand.textSecondary">Gabriel Andrade</Box> — front-end engineer in São Paulo. UNESP Botucatu background, then a late pivot to code. Three years building without AI before catching the wave on time. Musician on weekends, gamer on weeknights.
    </Text>
    <Flex gap={4} mt={3.5} fontSize="10px" color="brand.textMeta" fontFamily="var(--font-mono)">
      {FOOTER_LINKS.map((l) => (
        <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
          <Box
            as="span"
            className="draw-link"
            color="brand.textMeta"
            transition="color 200ms"
            _hover={{ color: "brand.accentHover" }}
          >
            {l.label}
          </Box>
        </Link>
      ))}
    </Flex>
  </Box>
);
