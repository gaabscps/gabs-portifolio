import { Box, Text } from "@chakra-ui/react";

export const Retrospective = ({ body }: { body: string }) => (
  <Box as="section" mb={10} id="what-id-change">
    <Text
      fontSize="11px"
      color="brand.textSecondary"
      letterSpacing="0.22em"
      textTransform="uppercase"
      fontFamily="var(--font-mono)"
      fontWeight="700"
      mb={4}
    >
      what i&apos;d change next time
    </Text>
    <Text fontSize="14px" lineHeight={1.7} color="brand.textSecondary">
      {body}
    </Text>
  </Box>
);
