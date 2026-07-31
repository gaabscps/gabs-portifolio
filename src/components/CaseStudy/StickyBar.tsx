import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { TrafficLights } from "@/components/TrafficLights";
import { ReadingProgress } from "./ReadingProgress";

export const StickyBar = () => (
  <Flex
    justify="space-between"
    align="center"
    px={{ base: 4, md: 8 }}
    py={4}
    borderBottom="1px solid"
    borderColor="brand.borderSubtle"
    bg="rgba(12, 10, 20, 0.78)"
    sx={{ backdropFilter: "saturate(180%) blur(20px)", WebkitBackdropFilter: "saturate(180%) blur(20px)" }}
    position="sticky"
    top={0}
    zIndex={10}
  >
    <Flex align="center" gap={4}>
      <TrafficLights />
      <Link href="/" style={{ textDecoration: "none" }}>
        <Text fontFamily="var(--font-mono)" fontWeight="700" letterSpacing="0.02em" fontSize="11px" color="brand.text">
          gabriel<Text as="span" color="brand.accent">.dev</Text>
        </Text>
      </Link>
      <Text fontFamily="var(--font-mono)" fontSize="11px" aria-hidden="true">
        <Box as="span" color="brand.textMeta">~</Box>{" "}
        <Box as="span" color="brand.accent" fontWeight="700">$</Box>
      </Text>
      <Link href="/work" style={{ textDecoration: "none" }}>
        <Text fontSize="11px" color="brand.textMeta" fontFamily="var(--font-mono)" className="draw-link" _hover={{ color: "brand.accentHover" }} transition="color var(--duration-fast) var(--ease-apple)">
          <Box as="span" color="brand.textMeta">--</Box>back-to-work
        </Text>
      </Link>
    </Flex>
    <ReadingProgress />
  </Flex>
);
