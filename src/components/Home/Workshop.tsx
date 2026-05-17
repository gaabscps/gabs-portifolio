"use client";

import { Box, Grid, Text } from "@chakra-ui/react";
import { WORKSHOP } from "@/config/workshop";

const Label = ({ children }: { children: React.ReactNode }) => (
  <Text
    fontSize="10px"
    color="brand.accentHover"
    letterSpacing="0.15em"
    textTransform="uppercase"
    fontFamily="var(--font-mono)"
    fontWeight="700"
    mb={2}
  >
    {children}
  </Text>
);

export const Workshop = () => (
  <Box
    as="section"
    px={{ base: 5, md: 8 }}
    py={8}
    borderTop="1px solid"
    borderColor="brand.borderSubtle"
    sx={{ background: "linear-gradient(180deg, rgba(172,107,237,.03), transparent)" }}
  >
    <Text
      fontSize="10px"
      color="brand.textSecondary"
      letterSpacing="0.22em"
      textTransform="uppercase"
      fontFamily="var(--font-mono)"
      fontWeight="700"
      mb={5}
    >
      Workshop · this week
    </Text>
    <Grid templateColumns={{ base: "1fr", md: "1.3fr 1fr 1fr 1.2fr" }} gap={5}>
      <Box>
        <Label>Now</Label>
        <Text fontSize="12px" color="brand.text" lineHeight={1.55}>{WORKSHOP.now}</Text>
      </Box>
      <Box>
        <Label>Playing</Label>
        <Text fontSize="12px" color="brand.text" lineHeight={1.55}>{WORKSHOP.playing.primary}</Text>
        <Box
          h="2px"
          w="80%"
          mt={1.5}
          sx={{
            background: "linear-gradient(90deg, var(--accent), var(--accent-hover), var(--accent))",
            transformOrigin: "left",
            animation: "draw-x 2.5s ease-in-out infinite alternate",
          }}
        />
        <Text fontSize="10px" color="brand.textMeta" mt={1} fontFamily="var(--font-mono)">
          {WORKSHOP.playing.secondary}
        </Text>
      </Box>
      <Box>
        <Label>Reading</Label>
        <Text fontSize="12px" color="brand.text" lineHeight={1.55} className="serif-italic">
          {WORKSHOP.reading.title}
        </Text>
        <Text fontSize="10px" color="brand.textMeta" mt={1}>{WORKSHOP.reading.author}</Text>
      </Box>
      <Box>
        <Label>Note</Label>
        <Text
          fontSize="12px"
          color="brand.text"
          lineHeight={1.55}
          fontStyle="italic"
          borderLeft="2px solid"
          borderColor="brand.accent"
          pl={3}
        >
          &ldquo;{WORKSHOP.note}&rdquo;
        </Text>
      </Box>
    </Grid>
  </Box>
);
