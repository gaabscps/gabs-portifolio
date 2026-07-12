"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { runCommand, completeCommand, type TerminalLine } from "./commands";

const toneColor: Record<string, string> = {
  default: "brand.textSecondary",
  accent: "brand.accentHover",
  green: "brand.stateHelped",
  dim: "brand.textMeta",
  error: "#ff9a9a",
};

type Entry = { prompt?: string; line?: TerminalLine };

export function Terminal({ onClose }: { onClose: () => void }) {
  const [entries, setEntries] = useState<Entry[]>([
    { line: { text: "gabriel.dev interactive shell · scripted preview", tone: "green" } },
    { line: { text: "type 'help' to get started.", tone: "dim" } },
  ]);
  const [value, setValue] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [pastIdx, setPastIdx] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const winRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll the log to the newest entry.
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [entries]);

  const submit = () => {
    const input = value;
    let cleared = false;
    const out = runCommand(input, { clear: () => { cleared = true; } });
    setEntries((prev) =>
      cleared ? [] : [...prev, { prompt: input }, ...out.map((line) => ({ line }))],
    );
    if (input.trim()) setPast((p) => [input, ...p]);
    setPastIdx(-1);
    setValue("");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (past.length) {
        const next = Math.min(pastIdx + 1, past.length - 1);
        setPastIdx(next);
        setValue(past[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = pastIdx - 1;
      if (next < 0) {
        setPastIdx(-1);
        setValue("");
      } else {
        setPastIdx(next);
        setValue(past[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const c = completeCommand(value);
      if (c) setValue(c + " ");
    }
  };

  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={100}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="rgba(8,6,14,.6)"
      sx={{ backdropFilter: "saturate(180%) blur(20px)", WebkitBackdropFilter: "saturate(180%) blur(20px)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Terminal"
    >
      <Box
        ref={winRef}
        w="min(680px, 92vw)"
        maxH="74vh"
        display="flex"
        flexDirection="column"
        border="1px solid var(--border-strong)"
        borderRadius="12px"
        overflow="hidden"
        bg="linear-gradient(180deg, rgba(26,22,38,.96), rgba(12,10,20,.96))"
        boxShadow="0 30px 90px rgba(0,0,0,.6)"
        fontFamily="var(--font-mono)"
      >
        <Flex align="center" gap={2} px={4} py={3} borderBottom="1px solid" borderColor="brand.border" fontSize="11px" color="brand.textMeta">
          <Flex gap="6px">
            <Box w="9px" h="9px" borderRadius="50%" bg="#ff5f57" />
            <Box w="9px" h="9px" borderRadius="50%" bg="#febc2e" />
            <Box w="9px" h="9px" borderRadius="50%" bg="#28c840" />
          </Flex>
          <Text ml={2}>gabriel@dev · interactive</Text>
          <Box as="button" ml="auto" color="brand.textMuted" onClick={onClose} aria-label="Close terminal" cursor="pointer" className="focus-ring">
            esc ✕
          </Box>
        </Flex>

        <Box ref={logRef} role="log" aria-live="polite" flex="1" overflowY="auto" px={4} py={3} fontSize="13px" lineHeight={1.7}>
          {entries.map((en, i) =>
            en.prompt !== undefined ? (
              <Box key={i} color="brand.text" whiteSpace="pre-wrap">
                <Text as="span" color="brand.text">gabriel</Text>
                <Text as="span" color="brand.accent">.dev</Text>
                <Text as="span" color="brand.textMuted" mx={1}>~</Text>
                <Text as="span" color="brand.accent" fontWeight="700" mr={2}>$</Text>
                {en.prompt}
              </Box>
            ) : (
              <Box key={i} color={toneColor[en.line?.tone ?? "default"]} whiteSpace="pre-wrap">
                {en.line?.text}
              </Box>
            ),
          )}
        </Box>

        <Flex align="center" gap={2} px={4} py={3} borderTop="1px solid" borderColor="brand.border">
          <Text color="brand.accent" fontSize="13px" flex="none">~ $</Text>
          <Box
            as="input"
            ref={inputRef}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            flex="1"
            bg="transparent"
            border="0"
            outline="0"
            color="brand.text"
            fontFamily="var(--font-mono)"
            fontSize="13px"
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal input"
            placeholder="type a command… try 'help'"
            sx={{ "::placeholder": { color: "var(--text-muted)" } }}
          />
        </Flex>
      </Box>
    </Box>
  );
}
