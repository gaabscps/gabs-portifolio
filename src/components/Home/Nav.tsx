"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { TrafficLights } from "@/components/TrafficLights";

const NavLink = ({ href, label, active }: { href: string; label: string; active?: boolean }) => (
  <Link href={href} style={{ textDecoration: "none" }}>
    <Text
      className="draw-link"
      color={active ? "brand.text" : "brand.textSecondary"}
      fontSize="11px"
      fontFamily="var(--font-mono)"
      transition="color var(--duration-fast) var(--ease-apple)"
      _hover={{ color: "brand.accentHover" }}
    >
      <Box as="span" color="brand.textMeta">--</Box>
      {label}
    </Text>
  </Link>
);

export const Nav = ({ active }: { active?: "work" | "about" | "contact" }) => (
  <Flex
    as="nav"
    justify="space-between"
    align="center"
    px={{ base: 4, md: 8 }}
    py={4}
    borderBottom="1px solid"
    borderColor="brand.borderSubtle"
    position="sticky"
    top={0}
    zIndex={10}
    bg="rgba(12, 10, 20, 0.78)"
    sx={{ backdropFilter: "saturate(180%) blur(20px)", WebkitBackdropFilter: "saturate(180%) blur(20px)" }}
  >
    <Flex align="center" gap={4}>
      <TrafficLights />
      <Link href="/" style={{ textDecoration: "none" }}>
        <Text fontFamily="var(--font-mono)" fontWeight="700" letterSpacing="0.02em" fontSize="11px" color="brand.text">
          gabriel<Box as="span" color="brand.accent">.dev</Box>
        </Text>
      </Link>
      <Text fontFamily="var(--font-mono)" fontSize="11px" aria-hidden="true">
        <Box as="span" color="brand.textMeta">~</Box>{" "}
        <Box as="span" color="brand.accent" fontWeight="700">$</Box>
      </Text>
    </Flex>
    <Flex gap={6}>
      <NavLink href="/work" label="work" active={active === "work"} />
      <NavLink href="/about" label="about" active={active === "about"} />
      <NavLink href="/contact" label="contact" active={active === "contact"} />
    </Flex>
  </Flex>
);
