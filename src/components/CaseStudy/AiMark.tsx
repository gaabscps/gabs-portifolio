import { Box } from "@chakra-ui/react";

export const AiMark = ({ children = "AI" }: { children?: React.ReactNode }) => (
  <Box
    as="span"
    display="inline-flex"
    alignItems="center"
    gap="4px"
    bg="rgba(172,107,237,.12)"
    color="brand.accentHover"
    fontSize="9px"
    fontFamily="var(--font-mono)"
    fontWeight="700"
    letterSpacing="0.1em"
    px="6px"
    py="1px"
    borderRadius="3px"
    verticalAlign="middle"
    title="AI was leveraged for this part"
    transition="background 200ms"
    _hover={{ bg: "rgba(172,107,237,.25)" }}
  >
    {children}
  </Box>
);
