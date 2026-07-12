"use client";

import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { isUsed, clearSession, loadSession } from "./session";

// A small floating chip, shown after the terminal has been used and is closed.
// Click reopens the terminal; the x discards the session.
export function TerminalChip() {
  const [used, setUsedState] = useState(false);

  useEffect(() => {
    const sync = () => setUsedState(isUsed());
    sync();
    window.addEventListener("terminal:used-change", sync);
    return () => window.removeEventListener("terminal:used-change", sync);
  }, []);

  if (!used) return null;

  const count = loadSession()?.past.length ?? 0;
  const open = () => window.dispatchEvent(new CustomEvent("terminal:open"));
  const discard = () => clearSession();

  return (
    <Flex
      position="fixed"
      bottom={{ base: 4, md: 6 }}
      right={{ base: 4, md: 6 }}
      zIndex={30}
      align="stretch"
      borderRadius="full"
      overflow="hidden"
      bg="rgba(20,17,29,.85)"
      border="1px solid var(--border-strong)"
      boxShadow="0 8px 30px rgba(0,0,0,.45)"
      fontFamily="var(--font-mono)"
      fontSize="11px"
      sx={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
    >
      <Flex
        as="button"
        type="button"
        onClick={open}
        aria-label="Reopen the terminal"
        align="center"
        gap={2}
        pl={3}
        pr={2}
        py={2}
        color="brand.accentHover"
        cursor="pointer"
        className="focus-ring"
        _hover={{ color: "brand.text" }}
      >
        <Text as="span" color="brand.accent" fontWeight="700">&gt;_</Text>
        <Text as="span">{count} {count === 1 ? "cmd" : "cmds"}</Text>
      </Flex>
      <Box
        as="button"
        type="button"
        onClick={discard}
        aria-label="Discard the terminal session"
        px={2}
        py={2}
        color="brand.textMuted"
        borderLeft="1px solid var(--border-strong)"
        cursor="pointer"
        className="focus-ring"
        _hover={{ color: "brand.text", bg: "rgba(255,255,255,.04)" }}
      >
        ✕
      </Box>
    </Flex>
  );
}
