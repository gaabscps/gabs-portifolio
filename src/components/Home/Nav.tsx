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
      transition="color 200ms var(--ease-out-quart)"
      _hover={{ color: "brand.accentHover" }}
    >
      {label}
    </Text>
  </Link>
);

export const Nav = ({ active }: { active?: "work" | "writing" | "about" }) => (
  <Flex
    as="nav"
    justify="space-between"
    align="center"
    px={{ base: 5, md: 8 }}
    py={4}
    borderBottom="1px solid"
    borderColor="brand.borderSubtle"
    position="sticky"
    top={0}
    zIndex={10}
    bg="rgba(13,10,20,0.85)"
    sx={{ backdropFilter: "blur(8px)" }}
  >
    <Flex align="center" gap={3.5}>
      <TrafficLights />
      <Link href="/" style={{ textDecoration: "none" }}>
        <Text fontFamily="var(--font-mono)" fontWeight="800" letterSpacing="0.02em" fontSize="11px" color="brand.text">
          gabriel<Box as="span" color="brand.accent">.dev</Box>
        </Text>
      </Link>
    </Flex>
    <Flex gap={5.5}>
      <NavLink href="/work" label="work" active={active === "work"} />
      <NavLink href="/writing" label="writing" active={active === "writing"} />
      <NavLink href="/about" label="about" active={active === "about"} />
    </Flex>
  </Flex>
);
