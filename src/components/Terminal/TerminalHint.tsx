"use client";

import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { isUsed } from "./session";

// A visible, clickable affordance that makes the global terminal discoverable
// on the home. Clicking it (or pressing /) opens the terminal overlay.
export function TerminalHint() {
  const [used, setUsed] = useState(false);
  useEffect(() => {
    const sync = () => setUsed(isUsed());
    sync();
    window.addEventListener("terminal:used-change", sync);
    return () => window.removeEventListener("terminal:used-change", sync);
  }, []);

  const open = () => window.dispatchEvent(new CustomEvent("terminal:open"));

  if (used) return null;

  return (
    <Flex
      as="button"
      type="button"
      onClick={open}
      aria-label="Open the terminal"
      position="fixed"
      bottom={{ base: 4, md: 6 }}
      right={{ base: 4, md: 6 }}
      zIndex={30}
      align="center"
      gap={2}
      px={4}
      py={2}
      borderRadius="full"
      fontFamily="var(--font-mono)"
      fontSize="11px"
      color="brand.textSecondary"
      bg="rgba(20,17,29,.82)"
      border="1px solid var(--border-strong)"
      boxShadow="0 8px 30px rgba(0,0,0,.4)"
      cursor="pointer"
      transition="color var(--duration-fast) var(--ease-apple), border-color var(--duration-fast) var(--ease-apple)"
      sx={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      className="focus-ring"
      _hover={{ color: "brand.text", borderColor: "brand.accent" }}
    >
      <Text as="span" color="brand.accent" fontWeight="700" sx={{ animation: "blink-soft 2.2s infinite" }}>
        &gt;_
      </Text>
      <Text as="span">
        press{" "}
        <Box as="kbd" color="brand.accentHover" px="5px" py="1px" borderRadius="4px" bg="var(--accent-soft)" border="1px solid var(--accent-quiet)">
          /
        </Box>{" "}
        to run the terminal
      </Text>
    </Flex>
  );
}
