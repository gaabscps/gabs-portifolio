import { Box, Flex, Text } from "@chakra-ui/react";
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

export const BuildLogEntry = ({ entry, isLast }: { entry: Entry; isLast?: boolean }) => (
  <Box
    py={6}
    px={{ base: 3, md: 6 }}
    borderBottom={isLast ? "none" : "1px solid"}
    borderColor="brand.borderSubtle"
    transition="background var(--duration-fast) var(--ease-apple)"
    _hover={{ bg: "rgba(172, 107, 237, 0.02)" }}
  >
    <Flex align="baseline" gap={3} mb={3}>
      <Text
        fontFamily="var(--font-mono)"
        fontSize="10px"
        color="brand.textMeta"
        letterSpacing="0.05em"
      >
        $
      </Text>
      <Text
        fontFamily="var(--font-mono)"
        fontSize="11px"
        color="brand.accentHover"
        letterSpacing="0.05em"
      >
        {entry.date}
      </Text>
      <Text fontFamily="var(--font-mono)" fontSize="10px" color="brand.textMuted">
        {entry.version}
      </Text>
    </Flex>

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
