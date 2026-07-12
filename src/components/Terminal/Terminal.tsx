"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { runCommand, completeCommand, type TerminalLine } from "./commands";
import { loadSession, saveSession, setUsed, type Entry } from "./session";

const toneColor: Record<string, string> = {
  default: "brand.textSecondary",
  accent: "brand.accentHover",
  green: "brand.stateHelped",
  dim: "brand.textMeta",
  error: "#ff9a9a",
};

export function Terminal({ onClose }: { onClose: () => void }) {
  const saved = typeof window !== "undefined" ? loadSession() : null;
  const [entries, setEntries] = useState<Entry[]>(
    saved?.entries ?? [
      { line: { text: "gabriel.dev interactive shell · scripted preview", tone: "green" } },
      { line: { text: "type 'help' to get started.", tone: "dim" } },
    ],
  );
  const [value, setValue] = useState("");
  const [past, setPast] = useState<string[]>(saved?.past ?? []);
  const [pastIdx, setPastIdx] = useState<number>(-1);
  // Output that is still "typing out" line by line (terminal-writing effect).
  const [pending, setPending] = useState<TerminalLine[]>([]);
  const [charN, setCharN] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const winRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll the log to the newest content (including while typing).
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [entries, pending, charN]);

  // Persist the session so it survives close/reopen and reload within the tab.
  useEffect(() => {
    saveSession({ entries, past });
  }, [entries, past]);

  // Drive the terminal-writing effect: type the first pending line character by
  // character, then commit it and move to the next line.
  useEffect(() => {
    if (pending.length === 0) return;
    const cur = pending[0];
    if (charN >= cur.text.length) {
      const id = window.setTimeout(() => {
        setEntries((prev) => [...prev, { line: cur }]);
        setPending((p) => p.slice(1));
        setCharN(0);
      }, 45);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setCharN((n) => Math.min(cur.text.length, n + 2)), 14);
    return () => window.clearTimeout(id);
  }, [pending, charN]);

  const submit = () => {
    const input = value;
    let cleared = false;
    const out = runCommand(input, { clear: () => { cleared = true; } });
    if (cleared) {
      setEntries([]);
      setPending([]);
      setCharN(0);
    } else {
      // Flush any in-progress stream to committed, add the prompt, queue the new output.
      setEntries((prev) => [...prev, ...pending.map((line) => ({ line })), { prompt: input }]);
      setPending(out);
      setCharN(0);
    }
    if (input.trim()) {
      setPast((p) => [input, ...p]);
      setUsed(true);
    }
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
      sx={{
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        animation: "fade-in .2s ease-out",
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Terminal"
    >
      <Box
        ref={winRef}
        onBlur={(e) => {
          if (winRef.current && !winRef.current.contains(e.relatedTarget as Node)) {
            inputRef.current?.focus();
          }
        }}
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
        sx={{ animation: "spot-in .2s var(--ease-out-quart)" }}
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
          {pending.length > 0 && (
            <Box color={toneColor[pending[0].tone ?? "default"]} whiteSpace="pre-wrap">
              {pending[0].text.slice(0, charN)}
              <Box as="span" className="cursor-caret" />
            </Box>
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
