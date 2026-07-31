import { Text } from "@chakra-ui/react";
import type { BuildLogEntry as Entry } from "@/types/project";
import { BuildLogEntry } from "./BuildLogEntry";
import { AiMark } from "./AiMark";
import { TerminalWindow } from "./TerminalWindow";

export const BuildLog = ({ entries, projectName }: { entries: Entry[]; projectName?: string }) => (
  <TerminalWindow
    filename={projectName ? `build.log (${projectName})` : "build.log"}
    label="build log"
    command="git log"
    id="build-log"
    mb={10}
  >
    <Text fontFamily="var(--font-mono)" fontSize="12px" color="brand.textMeta" mb={4}>
      # real chronological notes. <AiMark>AI</AiMark> markers show where I leaned on it.
    </Text>
    {entries.map((e, i) => (
      <BuildLogEntry key={`${e.date}-${i}`} entry={e} isLast={i === entries.length - 1} />
    ))}
  </TerminalWindow>
);
