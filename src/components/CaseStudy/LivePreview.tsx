import { Box } from "@chakra-ui/react";
import { COVER_COMPONENTS } from "@/components/CoverVisuals";
import type { ProjectCover } from "@/types/project";

export const LivePreview = ({ cover }: { cover: ProjectCover }) => {
  const Cover = cover.component ? COVER_COMPONENTS[cover.component] : null;
  const isImage = (cover.kind === "gif" || cover.kind === "screenshot") && cover.src;
  const isVideo = cover.kind === "video" && cover.src;
  const isMedia = isImage || isVideo;

  return (
    <Box
      mb={10}
      p={isMedia ? 0 : 4}
      bg="brand.bg"
      border="1px solid"
      borderColor="brand.border"
      borderRadius="12px"
      position="relative"
      overflow="hidden"
      minH="240px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="var(--shadow-md), var(--inset-highlight)"
      transition="all var(--duration-base) var(--ease-apple)"
      _hover={{ borderColor: "brand.borderStrong" }}
      _before={{
        content: '"▶ LIVE PREVIEW"',
        position: "absolute",
        top: "12px",
        right: "12px",
        fontSize: "8px",
        color: "var(--text-meta)",
        fontFamily: "var(--font-mono)",
        fontWeight: 600,
        letterSpacing: "0.15em",
        zIndex: 1,
        textShadow: "0 1px 2px rgba(0,0,0,0.4)",
      }}
    >
      {isImage && (
        <Box
          as="img"
          src={cover.src}
          alt={cover.alt ?? "live preview"}
          w="100%"
          h="auto"
          display="block"
          loading="lazy"
        />
      )}
      {isVideo && (
        <Box
          as="video"
          src={cover.src}
          aria-label={cover.alt ?? "live preview"}
          w="100%"
          h="auto"
          display="block"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
      {!isMedia && Cover && <Cover />}
    </Box>
  );
};
