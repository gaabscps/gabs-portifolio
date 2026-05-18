"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import type { ProjectLinks, ServerInfo } from "@/types/project";

type Props = {
  server: ServerInfo;
  links?: ProjectLinks;
};

export const ServerAddressCTA = ({ server, links }: Props) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(server.address);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable
    }
  };

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const editions: { label: string; suffix?: string }[] = (() => {
    if (server.edition === "both") {
      return [
        { label: "Java" },
        { label: "Bedrock", suffix: server.bedrockPort ? `:${server.bedrockPort}` : undefined },
      ];
    }
    if (server.edition === "bedrock") {
      return [{ label: "Bedrock", suffix: server.bedrockPort ? `:${server.bedrockPort}` : undefined }];
    }
    return [{ label: "Java" }];
  })();

  return (
    <Box
      id="join"
      mb={10}
      p={6}
      bg="brand.surface1"
      border="1px solid"
      borderColor="brand.borderSubtle"
      borderRadius="12px"
      boxShadow="var(--inset-highlight)"
    >
      <Text
        fontSize="11px"
        color="brand.textSecondary"
        letterSpacing="0.22em"
        textTransform="uppercase"
        fontFamily="var(--font-mono)"
        fontWeight="700"
        mb={4}
      >
        join the server
      </Text>

      {server.banner && (
        <Box mb={4} display="flex" justifyContent="center" lineHeight={0}>
          <Box
            as="img"
            src={server.banner}
            alt={server.bannerAlt ?? `${server.address} banner`}
            maxW="100%"
            h="auto"
            display="block"
            borderRadius="4px"
            border="1px solid"
            borderColor="brand.borderSubtle"
            loading="lazy"
          />
        </Box>
      )}

      <Flex
        as="button"
        type="button"
        onClick={onCopy}
        align="center"
        justify="space-between"
        gap={4}
        w="100%"
        px={4}
        py={3.5}
        bg="brand.bg"
        border="1px solid"
        borderColor="brand.border"
        borderRadius="8px"
        transition="all var(--duration-fast) var(--ease-apple)"
        cursor="pointer"
        _hover={{ borderColor: "brand.accent" }}
        aria-label={`copy server address ${server.address}`}
        mb={4}
      >
        <Text
          fontFamily="var(--font-mono)"
          fontSize={{ base: "14px", md: "16px" }}
          fontWeight="600"
          color="brand.text"
          letterSpacing="0.01em"
        >
          {server.address}
        </Text>
        <Text
          fontFamily="var(--font-mono)"
          fontSize="11px"
          color={copied ? "brand.accentHover" : "brand.textMeta"}
          letterSpacing="0.1em"
          textTransform="uppercase"
        >
          {copied ? "copied ✓" : "click to copy"}
        </Text>
      </Flex>

      <Flex gap={2} flexWrap="wrap" align="center" mb={links?.discord || links?.changelog ? 5 : 0}>
        {editions.map((e) => (
          <Box
            key={e.label}
            as="span"
            px={2.5}
            py={1}
            borderRadius="4px"
            bg="brand.surface2"
            fontFamily="var(--font-mono)"
            fontSize="10px"
            fontWeight="700"
            color="brand.textSecondary"
            letterSpacing="0.1em"
            textTransform="uppercase"
          >
            {e.label}
            {e.suffix && (
              <Box as="span" color="brand.textMeta" ml={1}>
                {e.suffix}
              </Box>
            )}
          </Box>
        ))}
        {server.version && (
          <Box
            as="span"
            px={2.5}
            py={1}
            borderRadius="4px"
            bg="brand.surface2"
            fontFamily="var(--font-mono)"
            fontSize="10px"
            fontWeight="700"
            color="brand.textSecondary"
            letterSpacing="0.1em"
            textTransform="uppercase"
          >
            {server.version}
          </Box>
        )}
      </Flex>

      {(links?.discord || links?.changelog || links?.github) && (
        <Flex gap={4} flexWrap="wrap" fontFamily="var(--font-mono)" fontSize="12px">
          {links?.discord && (
            <Box
              as="a"
              href={links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="draw-link"
              color="brand.accentHover"
              fontWeight="600"
            >
              discord ↗
            </Box>
          )}
          {links?.changelog && (
            <Box
              as="a"
              href={links.changelog}
              target="_blank"
              rel="noopener noreferrer"
              className="draw-link"
              color="brand.text"
              fontWeight="600"
            >
              changelog ↗
            </Box>
          )}
          {links?.github && (
            <Box
              as="a"
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="draw-link"
              color="brand.text"
              fontWeight="600"
            >
              github ↗
            </Box>
          )}
        </Flex>
      )}
    </Box>
  );
};
