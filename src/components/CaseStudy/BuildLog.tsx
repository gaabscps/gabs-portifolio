import { Box, Flex, Text } from "@chakra-ui/react";
import type { BuildLogEntry as Entry } from "@/types/project";
import { BuildLogEntry } from "./BuildLogEntry";
import { AiMark } from "./AiMark";

export const BuildLog = ({ entries, projectName }: { entries: Entry[]; projectName?: string }) => (
  <Box as="section" mb={10} id="build-log">
    <Text
      fontSize="11px"
      color="brand.textSecondary"
      letterSpacing="0.22em"
      textTransform="uppercase"
      fontFamily="var(--font-mono)"
      fontWeight="700"
      mb={2}
    >
      build log
    </Text>
    <Text fontSize="13px" color="brand.textMeta" mb={6} lineHeight={1.6}>
      Real chronological notes. <AiMark>AI</AiMark> markers show where I leaned on it.
    </Text>

    <Box className="terminal-window">
      <Flex className="terminal-chrome">
        <Flex className="terminal-chrome-dots">
          <Box as="span" bg="#ff5f57" />
          <Box as="span" bg="#febc2e" />
          <Box as="span" bg="#28c840" />
        </Flex>
        <Text className="terminal-chrome-title">
          {projectName ? `${projectName} — log` : "build log"}
        </Text>
        <Box className="terminal-chrome-spacer" />
      </Flex>
      <Box>
        {entries.map((e, i) => (
          <BuildLogEntry key={`${e.date}-${i}`} entry={e} isLast={i === entries.length - 1} />
        ))}
      </Box>
    </Box>
  </Box>
);
