"use client";

import { Box, Flex, Text } from "@chakra-ui/react";

export type SessionStep =
  | { kind: "cmd"; text: string }
  | { kind: "out"; node: React.ReactNode };

const light = (color: string) => (
  <Box as="span" w="9px" h="9px" borderRadius="50%" bg={color} />
);

// The terminal is a document, not a scroll playhead. Keeping every output in
// normal flow lets readers stop, reverse direction, and follow links without
// an internal scroller pushing the screenshots out of view.
export function SessionTerminal({ steps }: { steps: SessionStep[] }) {
  return (
    <Box as="section" aria-label="Project terminal" px={{ base: 3, md: 8 }} pt={4} pb={{ base: 12, md: 20 }}>
      <Box
        w="100%"
        border="1px solid var(--border-strong)"
        borderRadius={{ base: "12px", md: "16px" }}
        bg="linear-gradient(180deg, rgba(20,17,29,.97), rgba(12,10,20,.97))"
        boxShadow="0 30px 90px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.04)"
        fontFamily="var(--font-mono)"
      >
        <Flex
          align="center"
          gap={3}
          px={{ base: 4, md: 6 }}
          py={4}
          borderBottom="1px solid"
          borderColor="brand.border"
          borderTopRadius="inherit"
          bg="rgba(12,10,20,.96)"
          fontSize={{ base: "10px", md: "12px" }}
          color="brand.textMeta"
          aria-hidden="true"
        >
          <Flex gap="6px">{light("#ff5f57")}{light("#febc2e")}{light("#28c840")}</Flex>
          <Text as="span" ml={{ base: 0, md: 2 }}>gabriel@dev <Box as="span" color="brand.textSecondary">~/projects</Box></Text>
          <Flex ml="auto" align="center" gap={2} color="brand.stateHelped">
            <Box as="span" w="6px" h="6px" borderRadius="50%" bg="currentColor" />
            <Text as="span">ready</Text>
          </Flex>
        </Flex>

        <Box px={{ base: 3, md: 7 }} py={{ base: 5, md: 7 }} fontSize={{ base: "12px", md: "14px" }} lineHeight={1.75}>
          {steps.map((step, i) => step.kind === "cmd" ? (
            <Box key={i} color="brand.text" mt={i === 0 ? 0 : { base: 7, md: 9 }} overflowWrap="anywhere">
              <Text as="span">
                gabriel<Text as="span" color="brand.accent">.dev</Text>
                <Text as="span" color="brand.textMuted" mx={2}>~</Text>
                <Text as="span" color="brand.accent" fontWeight="700" mr={2}>$</Text>
              </Text>
              <Text as="span" color="brand.textSecondary">{step.text}</Text>
            </Box>
          ) : (
            <Box key={i} pt={{ base: 4, md: 5 }} minW={0}>{step.node}</Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
