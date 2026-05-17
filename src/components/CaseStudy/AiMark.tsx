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
