import { Box, Text } from "@chakra-ui/react";
import type { BuildLogEntry as Entry } from "@/types/project";
import { renderAiText } from "./AiMark";
import { Callout } from "./Callout";

export const BuildLogEntry = ({ entry, isLast }: { entry: Entry; isLast?: boolean }) => {
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
          focus
        </Box>{" "}
        <Box as="span" color="brand.accentHover">
          {entry.date}
        </Box>
        <Box as="span" color="var(--state-changed)">
          {` · ${entry.version}`}
        </Box>
      </Text>
      <Text fontFamily="var(--font-mono)" fontSize="12px" mb={4}>
        <Box as="span" color="brand.textMuted">
          context:
        </Box>{" "}
        <Box as="span" color="brand.textMeta">
          {entry.version}
        </Box>
      </Text>

      <Text fontSize="15px" fontWeight="600" color="brand.text" mb={3} pl={6}>
        {entry.title}
      </Text>

      <Box pl={6}>
        <Text as="div" fontSize="13px" lineHeight={1.7} color="brand.textSecondary">
          {renderAiText(entry.body)}
        </Text>
        {entry.callouts?.map((c, i) => <Callout key={i} callout={c} />)}
      </Box>
    </Box>
  );
};
