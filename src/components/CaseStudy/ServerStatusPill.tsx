"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

type Status =
  | { state: "loading" }
  | { state: "online"; players: number; max: number }
  | { state: "offline" }
  | { state: "error" };

type Props = {
  address: string;
  pollMs?: number;
};

const fetchStatus = async (address: string, signal: AbortSignal): Promise<Status> => {
  try {
    const res = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(address)}`, {
      signal,
      cache: "no-store",
    });
    if (!res.ok) return { state: "error" };
    const data = await res.json();
    if (!data?.online) return { state: "offline" };
    return {
      state: "online",
      players: data?.players?.online ?? 0,
      max: data?.players?.max ?? 0,
    };
  } catch (err) {
    if ((err as Error)?.name === "AbortError") return { state: "loading" };
    return { state: "error" };
  }
};

export const ServerStatusPill = ({ address, pollMs = 60_000 }: Props) => {
  const [status, setStatus] = useState<Status>({ state: "loading" });
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const tick = async () => {
      const next = await fetchStatus(address, controller.signal);
      if (!cancelled) setStatus(next);
    };

    tick();
    const id = setInterval(tick, pollMs);
    return () => {
      cancelled = true;
      controller.abort();
      clearInterval(id);
    };
  }, [address, pollMs]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore — clipboard unavailable
    }
  };

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  const isOnline = status.state === "online";
  const dotColor = isOnline ? "brand.accent" : "brand.textMuted";
  const label = (() => {
    switch (status.state) {
      case "loading":
        return "checking…";
      case "online":
        return `${status.players}/${status.max} online`;
      case "offline":
        return "offline";
      case "error":
        return "status unavailable";
    }
  })();

  return (
    <Flex
      as="button"
      type="button"
      onClick={onCopy}
      align="center"
      gap={2}
      px={3}
      py={1.5}
      borderRadius="999px"
      border="1px solid"
      borderColor="brand.borderSubtle"
      bg="brand.surface1"
      fontFamily="var(--font-mono)"
      fontSize="11px"
      color="brand.text"
      transition="all var(--duration-fast) var(--ease-apple)"
      cursor="pointer"
      _hover={{ borderColor: "brand.border", bg: "brand.surface2" }}
      aria-live="polite"
      aria-label={copied ? "address copied" : `${address} · ${label} · click to copy`}
    >
      <Box
        w="6px"
        h="6px"
        borderRadius="50%"
        bg={dotColor}
        sx={isOnline ? { animation: "blink-soft 2s infinite" } : undefined}
      />
      <Box as="span" color="brand.textSecondary">
        {address}
      </Box>
      <Box as="span" color="brand.textMeta">·</Box>
      <Box as="span" color={isOnline ? "brand.accentHover" : "brand.textMeta"}>
        {label}
      </Box>
      <Box as="span" color="brand.textMeta">·</Box>
      <Box as="span" color="brand.textMeta">
        {copied ? "copied ✓" : "click to copy"}
      </Box>
    </Flex>
  );
};
