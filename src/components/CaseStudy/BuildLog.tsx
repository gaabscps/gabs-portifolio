import { Box, Text } from "@chakra-ui/react";
import type { BuildLogEntry as Entry } from "@/types/project";
import { BuildLogEntry } from "./BuildLogEntry";
import { AiMark } from "./AiMark";

export const BuildLog = ({ entries }: { entries: Entry[] }) => (
  <Box as="section" mb={9} id="build-log">
    <Text
      fontSize="11px"
      color="brand.textSecondary"
      letterSpacing="0.22em"
      textTransform="uppercase"
      fontFamily="var(--font-mono)"
      fontWeight="700"
      mb={1.5}
    >
      build log
    </Text>
    <Text fontSize="13px" color="brand.textMeta" mb={6} lineHeight={1.55}>
      Real chronological notes. Where AI helped is marked in the margins — <AiMark>AI</AiMark> means I leaned on it for that part.
    </Text>
    {entries.map((e, i) => (
      <BuildLogEntry key={`${e.date}-${i}`} entry={e} />
    ))}
  </Box>
);
