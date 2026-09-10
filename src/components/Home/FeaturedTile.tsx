"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { COVER_COMPONENTS } from "@/components/CoverVisuals";

type Props = {
  slug: string;
  status: string;
  year: string;
  name: string;
  blurb: string;
  stack: string[];
  aiTool?: string;
  coverComponent?: string;
  coverSrc?: string;
  coverAlt?: string;
};

export const FeaturedTile = ({ slug, status, year, name, blurb, stack, aiTool, coverComponent, coverSrc, coverAlt }: Props) => {
  const Cover = coverComponent ? COVER_COMPONENTS[coverComponent] : null;
  return (
    <Link href={`/work/${slug}`} style={{ textDecoration: "none" }}>
      <Box
        display="grid"
        gridTemplateColumns={{ base: "minmax(0, 1fr)", lg: "minmax(0, 1.6fr) minmax(0, 1fr)" }}
        bg="brand.surface1"
        border="1px solid"
        borderColor="brand.border"
        borderRadius="12px"
        overflow="hidden"
        transition="border-color var(--duration-base) var(--ease-apple), background var(--duration-base) var(--ease-apple)"
        boxShadow="var(--inset-highlight)"
        _hover={{
          borderColor: "brand.borderStrong",
          bg: "brand.surface2",
        }}
      >
        <Flex
          minW={0}
          aspectRatio="16 / 10"
          bg="brand.bg"
          borderBottom={{ base: "1px solid", lg: 0 }}
          borderRight={{ base: 0, lg: "1px solid" }}
          borderColor="brand.borderSubtle"
          alignItems="center"
          justifyContent="center"
          position="relative"
          px={coverSrc ? 0 : 4}
        >
          {coverSrc ? (
            <Box
              as="img"
              src={coverSrc}
              alt={coverAlt ?? name}
              loading="lazy"
              position="absolute"
              inset={0}
              w="100%"
              h="100%"
              objectFit="contain"
            />
          ) : (
            Cover && <Cover />
          )}
          <Text
            position="absolute"
            top="10px"
            left="12px"
            fontSize="9px"
            color="brand.textMeta"
            fontFamily="var(--font-mono)"
            fontWeight="600"
            letterSpacing="0.12em"
            bg="rgba(12, 10, 20, 0.82)"
            px={2}
            py={1}
            borderRadius="4px"
          >
            {status.toUpperCase()} · {year}
          </Text>
        </Flex>
        <Flex direction="column" justify="center" minW={0} p={{ base: 5, xl: 8 }}>
          <Text as="h2" fontSize={{ base: "21px", md: "26px" }} fontWeight="600" letterSpacing="-0.03em" lineHeight={1.2} color="brand.text" mb={3}>{name}</Text>
          <Text fontSize={{ base: "13px", md: "14px" }} color="brand.textSecondary" lineHeight={1.7} mb={5}>{blurb}</Text>
          <Flex gap={2} flexWrap="wrap">
            {stack.map((s) => (
              <Box
                key={s}
                as="span"
                fontSize="10px"
                color="brand.textMeta"
                border="1px solid"
                borderColor="brand.border"
                px={2}
                py="2px"
                borderRadius="4px"
                fontFamily="var(--font-mono)"
                letterSpacing="0.05em"
              >
                {s.toUpperCase()}
              </Box>
            ))}
            {aiTool && (
              <Box
                as="span"
                fontSize="10px"
                color="brand.accentHover"
                border="1px solid"
                borderColor="var(--accent-quiet)"
                bg="var(--accent-soft)"
                px={2}
                py="2px"
                borderRadius="4px"
                fontFamily="var(--font-mono)"
                letterSpacing="0.05em"
              >
                {aiTool.toUpperCase()}
              </Box>
            )}
          </Flex>
          <Text mt={6} fontSize="11px" color="brand.accentHover" fontWeight="600">Explore case study <Box as="span" aria-hidden="true">↗</Box></Text>
        </Flex>
      </Box>
    </Link>
  );
};
