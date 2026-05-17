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
    mb={3}
  >
    {children}
  </Text>
);

export const Workshop = () => (
  <Box
    as="section"
    px={{ base: 4, md: 8 }}
    py={10}
    borderTop="1px solid"
    borderColor="brand.borderSubtle"
    sx={{ background: "linear-gradient(180deg, rgba(172,107,237,.02), transparent)" }}
  >
    <Text
      fontSize="10px"
      color="brand.textSecondary"
      letterSpacing="0.22em"
      textTransform="uppercase"
      fontFamily="var(--font-mono)"
      fontWeight="700"
      mb={6}
    >
      Workshop · this week
    </Text>
    <Grid templateColumns={{ base: "1fr", md: "1.3fr 1fr 1fr 1.2fr" }} gap={6}>
      <Box>
        <Label>Now</Label>
        <Text fontSize="13px" color="brand.text" lineHeight={1.55}>{WORKSHOP.now}</Text>
      </Box>
      <Box>
        <Label>Playing</Label>
        <Text fontSize="13px" color="brand.text" lineHeight={1.55}>{WORKSHOP.playing.primary}</Text>
        <Box
          h="2px"
          w="80%"
          mt={2}
          bg="brand.accent"
          opacity={0.6}
          sx={{
            transformOrigin: "left",
            animation: "draw-x 2.5s ease-in-out infinite alternate",
          }}
        />
        <Text fontSize="10px" color="brand.textMeta" mt={2} fontFamily="var(--font-mono)">
          {WORKSHOP.playing.secondary}
        </Text>
      </Box>
      <Box>
        <Label>Reading</Label>
        <Text fontSize="13px" color="brand.text" lineHeight={1.55} className="serif-italic">
          {WORKSHOP.reading.title}
        </Text>
        <Text fontSize="10px" color="brand.textMeta" mt={2}>{WORKSHOP.reading.author}</Text>
      </Box>
      <Box>
        <Label>Note</Label>
        <Text
          fontSize="13px"
          color="brand.text"
          lineHeight={1.55}
          fontStyle="italic"
          borderLeft="2px solid"
          borderColor="brand.accent"
          pl={4}
        >
          &ldquo;{WORKSHOP.note}&rdquo;
        </Text>
      </Box>
    </Grid>
  </Box>
);
