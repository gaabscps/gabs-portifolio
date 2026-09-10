import { Text } from "@chakra-ui/react";
import type { BuildLogEntry as Entry } from "@/types/project";
import { BuildLogEntry } from "./BuildLogEntry";
import { TerminalWindow } from "./TerminalWindow";

export const BuildLog = ({ entries, projectName }: { entries: Entry[]; projectName?: string }) => (
  <TerminalWindow
    filename={projectName ? `decisions.md (${projectName})` : "decisions.md"}
    label="engineering decisions"
    command="cat decisions.md"
    id="build-log"
    mb={10}
  >
    <Text fontFamily="var(--font-mono)" fontSize="12px" color="brand.textMeta" mb={4}>
      # challenge, architectural choices, and technical outcomes
    </Text>
    {entries.map((e, i) => (
      <BuildLogEntry key={`${e.date}-${i}`} entry={e} isLast={i === entries.length - 1} />
    ))}
  </TerminalWindow>
);
