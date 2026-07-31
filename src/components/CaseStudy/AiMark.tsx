import { Box } from "@chakra-ui/react";

export const AiMark = ({ children = "AI" }: { children?: React.ReactNode }) => (
  <Box
    as="span"
    display="inline-flex"
    alignItems="center"
    gap={1}
    bg="var(--accent-soft)"
    color="brand.accentHover"
    fontSize="9px"
    fontFamily="var(--font-mono)"
    fontWeight="700"
    letterSpacing="0.1em"
    px={2}
    py="2px"
    borderRadius="4px"
    verticalAlign="middle"
    title="AI was leveraged for this part"
    transition="background var(--duration-fast)"
    _hover={{ bg: "var(--accent-quiet)" }}
  >
    {children}
  </Box>
);

// Splits a string on <ai>...</ai> markers and renders the marked segments as AiMark chips,
// leaving the rest as plain text. Shared by every field that may embed the marker.
export const renderAiText = (text: string) => {
  const parts = text.split(/(<ai>.*?<\/ai>)/g);
  return parts.map((part, i) => {
    const m = part.match(/^<ai>(.*?)<\/ai>$/);
    return m ? <AiMark key={i}>{m[1]}</AiMark> : <span key={i}>{part}</span>;
  });
};
