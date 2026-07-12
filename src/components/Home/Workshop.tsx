"use client";

import { Box, Text } from "@chakra-ui/react";
import { TerminalJourney, type JourneyItem } from "./TerminalJourney/TerminalJourney";
import { WORKSHOP } from "@/config/workshop";

const Label = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize="10px" color="brand.accentHover" letterSpacing="0.15em" textTransform="uppercase" fontFamily="var(--font-mono)" fontWeight="700" mb={3}>
    {children}
  </Text>
);

export const Workshop = () => {
  const items: JourneyItem[] = [
    {
      key: "now",
      node: (
        <Box py={2}>
          <Label>Now</Label>
          <Text fontSize="13px" color="brand.text" lineHeight={1.55}>{WORKSHOP.now}</Text>
        </Box>
      ),
    },
    {
      key: "playing",
      node: (
        <Box py={2}>
          <Label>Playing</Label>
          <Text fontSize="13px" color="brand.text" lineHeight={1.55}>{WORKSHOP.playing.primary}</Text>
          <Box h="2px" w="80%" mt={2} bg="brand.accent" opacity={0.6} sx={{ transformOrigin: "left", animation: "draw-x 2.5s ease-in-out infinite alternate" }} />
          <Text fontSize="10px" color="brand.textMeta" mt={2} fontFamily="var(--font-mono)">{WORKSHOP.playing.secondary}</Text>
        </Box>
      ),
    },
    {
      key: "reading",
      node: (
        <Box py={2}>
          <Label>Reading</Label>
          <Text fontSize="13px" color="brand.text" lineHeight={1.55} className="serif-italic">{WORKSHOP.reading.title}</Text>
          <Text fontSize="10px" color="brand.textMeta" mt={2}>{WORKSHOP.reading.author}</Text>
        </Box>
      ),
    },
    {
      key: "note",
      node: (
        <Box py={2}>
          <Label>Note</Label>
          <Text fontSize="13px" color="brand.text" lineHeight={1.55} fontStyle="italic" borderLeft="2px solid" borderColor="brand.accent" pl={4}>
            &ldquo;{WORKSHOP.note}&rdquo;
          </Text>
        </Box>
      ),
    },
  ];

  return (
    <TerminalJourney
      command="cat workshop/this-week.md"
      context="~/workshop"
      toolLabel="workshop/this-week.md"
      toolResult="4 entries"
      items={items}
    />
  );
};
