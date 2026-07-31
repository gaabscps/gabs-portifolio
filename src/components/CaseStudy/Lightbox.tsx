"use client";

import { Box, Flex, Portal, Text } from "@chakra-ui/react";
import { useEffect, type MouseEvent } from "react";
import type { PluginAsset } from "@/types/project";

// Full-screen viewer for a single gallery asset. Rendered through a Portal so it sits
// above the plugin modal. Closes on backdrop click or the Escape key.
export const Lightbox = ({ asset, onClose }: { asset: PluginAsset | null; onClose: () => void }) => {
  useEffect(() => {
    if (!asset) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [asset, onClose]);

  if (!asset) return null;

  return (
    <Portal>
      <Flex
        position="fixed"
        inset={0}
        zIndex={2400}
        bg="rgba(6, 8, 12, 0.88)"
        backdropFilter="blur(4px)"
        align="center"
        justify="center"
        direction="column"
        gap={3}
        p={{ base: 4, md: 10 }}
        onClick={onClose}
        cursor="zoom-out"
      >
        {asset.kind === "video" ? (
          <Box
            as="video"
            src={asset.src}
            aria-label={asset.alt}
            controls
            autoPlay
            loop
            playsInline
            maxW="94vw"
            maxH="82vh"
            borderRadius="10px"
            boxShadow="var(--shadow-md)"
            onClick={(e: MouseEvent) => e.stopPropagation()}
          />
        ) : (
          <Box
            as="img"
            src={asset.src}
            alt={asset.alt}
            maxW="94vw"
            maxH="82vh"
            objectFit="contain"
            borderRadius="10px"
            boxShadow="var(--shadow-md)"
            onClick={(e: MouseEvent) => e.stopPropagation()}
          />
        )}
        {asset.caption && (
          <Text
            fontSize="11px"
            color="whiteAlpha.800"
            fontFamily="var(--font-mono)"
            letterSpacing="0.08em"
            textTransform="uppercase"
          >
            {asset.caption}
          </Text>
        )}
        <Text fontSize="10px" color="whiteAlpha.500" fontFamily="var(--font-mono)" letterSpacing="0.06em">
          click anywhere or press esc to close
        </Text>
      </Flex>
    </Portal>
  );
};
