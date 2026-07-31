"use client";

import { useState } from "react";
import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import type { Plugin } from "@/types/project";
import { PluginModal } from "./PluginModal";
import { renderAiText } from "./AiMark";

const PluginGallery = ({ gallery }: { gallery: NonNullable<Plugin["gallery"]> }) => (
  <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={3} mt={4}>
    {gallery.map((g) => (
      <Box key={g.src}>
        <Box
          position="relative"
          w="100%"
          pt="56.25%"
          borderRadius="8px"
          overflow="hidden"
          border="1px solid"
          borderColor="brand.borderSubtle"
          bg="brand.bg"
          transition="all var(--duration-fast) var(--ease-apple)"
          _hover={{ borderColor: "brand.accent", transform: "translateY(-2px)" }}
        >
          {g.kind === "video" ? (
            <Box
              as="video"
              src={g.src}
              aria-label={g.alt}
              poster={g.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              position="absolute"
              inset={0}
              w="100%"
              h="100%"
              objectFit="cover"
            />
          ) : (
            <Box
              as="img"
              src={g.src}
              alt={g.alt}
              loading="lazy"
              position="absolute"
              inset={0}
              w="100%"
              h="100%"
              objectFit="cover"
            />
          )}
        </Box>
        {g.caption && (
          <Text
            mt={1.5}
            fontSize="9px"
            color="brand.textMeta"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
            textAlign="center"
            textTransform="uppercase"
          >
            {g.caption}
          </Text>
        )}
      </Box>
    ))}
  </Grid>
);

const PluginCard = ({ plugin, onSelect }: { plugin: Plugin; onSelect: (p: Plugin) => void }) => {
  const spans = Boolean(plugin.gallery?.length);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(plugin);
    }
  };
  return (
    <Box
      role="button"
      tabIndex={0}
      onClick={() => onSelect(plugin)}
      onKeyDown={onKeyDown}
      aria-label={`open details for ${plugin.name}`}
      gridColumn={{ base: "1", md: spans ? "1 / -1" : "auto" }}
      p={5}
      bg="brand.surface1"
      border="1px solid"
      borderColor="brand.borderSubtle"
      borderRadius="10px"
      boxShadow="var(--inset-highlight)"
      cursor="pointer"
      transition="all var(--duration-fast) var(--ease-apple)"
      position="relative"
      _hover={{
        borderColor: "brand.border",
        transform: "translateY(-1px)",
        "& .open-arrow": { color: "var(--accent-hover)", transform: "translateX(2px) translateY(-2px)" },
      }}
      _focusVisible={{ outline: "2px solid var(--accent)", outlineOffset: "2px" }}
    >
      <Flex justify="space-between" align="flex-start" gap={3} mb={2}>
        <Text
          fontSize="15px"
          fontWeight="700"
          letterSpacing="-0.01em"
          color="brand.text"
          lineHeight={1.2}
        >
          {plugin.name}
        </Text>
        <Box
          as="span"
          className="open-arrow"
          color="brand.textMeta"
          fontFamily="var(--font-mono)"
          fontSize="13px"
          lineHeight={1}
          aria-hidden="true"
          transition="all var(--duration-fast) var(--ease-apple)"
        >
          ↗
        </Box>
      </Flex>

      <Text fontSize="13px" color="brand.textSecondary" lineHeight={1.55} mb={3}>
        {renderAiText(plugin.summary)}
      </Text>

      {plugin.requestedBy && (
        <Text
          fontSize="11px"
          color="brand.textMeta"
          className="serif-italic"
          mb={3}
          lineHeight={1.4}
        >
          · {plugin.requestedBy}
        </Text>
      )}

      <Flex
        gap={2}
        fontFamily="var(--font-mono)"
        fontSize="10px"
        color="brand.textMeta"
        letterSpacing="0.1em"
        textTransform="uppercase"
        pt={3}
        borderTop="1px solid"
        borderColor="brand.borderSubtle"
      >
        <Box as="span">{plugin.shippedAt}</Box>
        {plugin.version && (
          <>
            <Box as="span" color="brand.textMuted">·</Box>
            <Box as="span">{plugin.version}</Box>
          </>
        )}
      </Flex>

      {plugin.gallery?.length ? <PluginGallery gallery={plugin.gallery} /> : null}
    </Box>
  );
};

export const PluginGrid = ({ plugins }: { plugins: Plugin[] }) => {
  const [selected, setSelected] = useState<Plugin | null>(null);

  return (
    <Box id="plugins" mb={10}>
      <Flex align="baseline" justify="space-between" mb={6} gap={3} flexWrap="wrap">
        <Text
          fontSize="11px"
          color="brand.textSecondary"
          letterSpacing="0.22em"
          textTransform="uppercase"
          fontFamily="var(--font-mono)"
          fontWeight="700"
        >
          core systems · {plugins.length} of 33 live
        </Text>
        <Text
          fontSize="11px"
          color="brand.textMeta"
          fontFamily="var(--font-mono)"
        >
          every line of java: <Box as="span" color="brand.accentHover">claude</Box>{" "}
          · arch / observability / tests / scope: <Box as="span" color="brand.accentHover">me</Box>
        </Text>
      </Flex>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={4}
        sx={{ gridAutoFlow: "dense" }}
      >
        {plugins.map((p) => (
          <PluginCard key={p.name} plugin={p} onSelect={setSelected} />
        ))}
      </Grid>

      <PluginModal plugin={selected} onClose={() => setSelected(null)} />
    </Box>
  );
};
