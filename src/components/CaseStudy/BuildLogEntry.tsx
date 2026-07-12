import { Box, Text } from "@chakra-ui/react";
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

// Deterministic 7-char hex hash derived from the entry, so it stays stable across renders
// instead of being random.
const shortHash = (seed: string) => {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) + h + seed.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(7, "0").slice(0, 7);
};

export const BuildLogEntry = ({ entry, isLast }: { entry: Entry; isLast?: boolean }) => {
  const hash = shortHash(`${entry.version}:${entry.date}:${entry.title}`);

  return (
    <Box
      py={5}
      borderBottom={isLast ? "none" : "1px solid"}
      borderColor="brand.borderSubtle"
      transition="background var(--duration-fast) var(--ease-apple)"
      _hover={{ bg: "rgba(172, 107, 237, 0.02)" }}
    >
      <Text fontFamily="var(--font-mono)" fontSize="13px">
        <Box as="span" color="brand.textMeta">
          commit
        </Box>{" "}
        <Box as="span" color="brand.accentHover">
          {hash}
        </Box>
        <Box as="span" color="var(--state-changed)">
          {` (tag: ${entry.version})`}
        </Box>
      </Text>
      <Text fontFamily="var(--font-mono)" fontSize="12px" mb={4}>
        <Box as="span" color="brand.textMuted">
          Date:
        </Box>{" "}
        <Box as="span" color="brand.textMeta">
          {entry.date}
        </Box>
      </Text>

      <Text fontSize="15px" fontWeight="600" color="brand.text" mb={3} pl={6}>
        {entry.title}
      </Text>

      <Box pl={6}>
        <Text as="div" fontSize="13px" lineHeight={1.7} color="brand.textSecondary">
          {renderBody(entry.body)}
        </Text>
        {entry.callouts?.map((c, i) => <Callout key={i} callout={c} />)}
      </Box>
    </Box>
  );
};
