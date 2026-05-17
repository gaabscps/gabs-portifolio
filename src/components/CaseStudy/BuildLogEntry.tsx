"use client";

import { Box, Grid, Text } from "@chakra-ui/react";
import type { BuildLogEntry as Entry } from "@/types/project";
import { AiMark } from "./AiMark";
import { Callout } from "./Callout";

const renderBody = (body: string) => {
  const parts = body.split(/(<ai>.*?<\/ai>)/g);
  return parts.map((part, i) => {
    const m = part.match(/^<ai>(.*?)<\/ai>$/);
    return m ? <AiMark key={i}>{m[1]}</AiMark> : <span key={i}>{part}</span>;
  });
};

export const BuildLogEntry = ({ entry }: { entry: Entry }) => (
  <Grid
    templateColumns={{ base: "1fr", sm: "90px 1fr" }}
    gap={{ base: 2, sm: 4.5 }}
    py={4.5}
    borderBottom="1px dashed"
    borderColor="brand.border"
    sx={{
      transition: "padding-left 250ms ease",
      "&:hover": { paddingLeft: "6px" },
      "&:hover .log-date": { color: "var(--accent-hover)" },
      "&:last-child": { borderBottom: "none" },
    }}
  >
    <Box className="log-date" pt="2px" transition="color 200ms">
      <Text fontFamily="var(--font-mono)" fontSize="11px" color="brand.textMeta" letterSpacing="0.05em">
        {entry.date}
      </Text>
      <Text fontFamily="var(--font-mono)" fontSize="9px" color="brand.textMuted" mt="2px">
        {entry.version}
      </Text>
    </Box>
    <Box>
      <Text fontSize="15px" fontWeight="700" color="brand.text" mb={2}>{entry.title}</Text>
      <Text as="div" fontSize="14px" lineHeight={1.7} color="#d4cce8">
        {renderBody(entry.body)}
      </Text>
      {entry.callouts?.map((c, i) => <Callout key={i} callout={c} />)}
    </Box>
  </Grid>
);
