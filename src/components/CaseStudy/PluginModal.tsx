"use client";

import {
  Box,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import type { Plugin } from "@/types/project";

type Props = {
  plugin: Plugin | null;
  onClose: () => void;
};

const Gallery = ({ gallery }: { gallery: NonNullable<Plugin["gallery"]> }) => (
  <Box mt={2}>
    <Text
      fontSize="10px"
      color="brand.textSecondary"
      letterSpacing="0.22em"
      textTransform="uppercase"
      fontFamily="var(--font-mono)"
      fontWeight="700"
      mb={3}
    >
      assets
    </Text>
    <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap={3}>
      {gallery.map((g) => (
        <Box key={g.src}>
          <Box
            position="relative"
            w="100%"
            pt="100%"
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
              mt={2}
              fontSize="10px"
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
  </Box>
);

export const PluginModal = ({ plugin, onClose }: Props) => (
  <Modal isOpen={Boolean(plugin)} onClose={onClose} size={{ base: "full", md: "3xl" }} isCentered scrollBehavior="inside">
    <ModalOverlay
      bg="rgba(8, 6, 14, 0.72)"
      sx={{ backdropFilter: "saturate(180%) blur(14px)", WebkitBackdropFilter: "saturate(180%) blur(14px)" }}
    />
    <ModalContent
      bg="brand.surface1"
      border="1px solid"
      borderColor="brand.border"
      borderRadius={{ base: 0, md: "14px" }}
      boxShadow="var(--shadow-md), var(--inset-highlight)"
      mx={{ base: 0, md: 4 }}
      my={{ base: 0, md: 8 }}
    >
      <ModalCloseButton
        color="brand.textMeta"
        _hover={{ color: "brand.text", bg: "brand.surface2" }}
        size="lg"
        top={4}
        right={4}
      />
      <ModalBody px={{ base: 5, md: 8 }} py={{ base: 6, md: 8 }}>
        {plugin && (
          <>
            <Flex
              align="center"
              gap={2}
              mb={4}
              fontSize="10px"
              color="brand.accentHover"
              fontFamily="var(--font-mono)"
              letterSpacing="0.18em"
              textTransform="uppercase"
              fontWeight="700"
            >
              <Box w="6px" h="6px" borderRadius="50%" bg="brand.accent" sx={{ animation: "blink-soft 2s infinite" }} />
              core system · live
            </Flex>

            <Text
              fontSize={{ base: "28px", md: "36px" }}
              fontWeight="800"
              letterSpacing="-0.025em"
              color="brand.text"
              lineHeight={1.05}
              mb={4}
            >
              {plugin.name}
            </Text>

            <Text fontSize={{ base: "15px", md: "17px" }} color="brand.textSecondary" lineHeight={1.55} mb={5}>
              {plugin.summary}
            </Text>

            {plugin.requestedBy && (
              <Text
                fontSize="13px"
                color="brand.textMeta"
                className="serif-italic"
                mb={6}
                lineHeight={1.4}
              >
                — {plugin.requestedBy}
              </Text>
            )}

            <Flex
              gap={2}
              fontFamily="var(--font-mono)"
              fontSize="10px"
              color="brand.textMeta"
              letterSpacing="0.12em"
              textTransform="uppercase"
              pb={6}
              mb={6}
              borderBottom="1px solid"
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

            {plugin.impact && (
              <Box
                mb={6}
                p={4}
                bg="brand.bg"
                borderLeft="3px solid"
                borderColor="brand.accentHover"
                borderRadius="0 8px 8px 0"
              >
                <Text
                  fontSize="9px"
                  color="brand.accent"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.18em"
                  textTransform="uppercase"
                  fontWeight="700"
                  mb={2}
                >
                  what this brings
                </Text>
                <Text fontSize="14px" color="brand.text" lineHeight={1.6}>
                  {plugin.impact}
                </Text>
              </Box>
            )}

            {plugin.details && (
              <Box mb={6}>
                <Text
                  fontSize="10px"
                  color="brand.textSecondary"
                  letterSpacing="0.22em"
                  textTransform="uppercase"
                  fontFamily="var(--font-mono)"
                  fontWeight="700"
                  mb={3}
                >
                  how it works
                </Text>
                <Text fontSize="14px" color="brand.textSecondary" lineHeight={1.7}>
                  {plugin.details}
                </Text>
              </Box>
            )}

            {plugin.myContribution && (
              <Box
                mb={6}
                p={4}
                bg="brand.bg"
                borderLeft="3px solid"
                borderColor="brand.accent"
                borderRadius="0 8px 8px 0"
              >
                <Text
                  fontSize="9px"
                  color="brand.accentHover"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.18em"
                  textTransform="uppercase"
                  fontWeight="700"
                  mb={2}
                >
                  what I brought
                </Text>
                <Text fontSize="14px" color="brand.text" lineHeight={1.6}>
                  {plugin.myContribution}
                </Text>
              </Box>
            )}

            {plugin.gallery && plugin.gallery.length > 0 && <Gallery gallery={plugin.gallery} />}
          </>
        )}
      </ModalBody>
    </ModalContent>
  </Modal>
);
