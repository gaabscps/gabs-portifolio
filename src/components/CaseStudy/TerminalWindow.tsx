import type { ReactNode } from "react";
import { Box, Flex, Text, type BoxProps } from "@chakra-ui/react";

type Props = {
  filename: string;
  label?: string;
  command: string;
  user?: string;
  host?: string;
  children: ReactNode;
} & BoxProps;

const DOT_COLORS = ["#ff5f56", "#ffbd2e", "#27c93f"];

export const TerminalWindow = ({
  filename,
  label,
  command,
  user = "gabs",
  host = "portfolio",
  children,
  ...rest
}: Props) => (
  <Box
    as="section"
    aria-label={label ?? filename}
    bg="brand.surface1"
    border="1px solid"
    borderColor="brand.border"
    borderRadius="12px"
    overflow="hidden"
    {...rest}
  >
    <Flex
      align="center"
      gap={2}
      px={3.5}
      py={2.5}
      bg="brand.surface2"
      borderBottom="1px solid"
      borderColor="brand.border"
      minW={0}
    >
      {DOT_COLORS.map((color) => (
        <Box key={color} aria-hidden="true" w="11px" h="11px" borderRadius="50%" bg={color} flexShrink={0} />
      ))}
      <Text
        ml={2}
        fontFamily="var(--font-mono)"
        fontSize="12px"
        color="brand.textMeta"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        minW={0}
      >
        {filename}
      </Text>
    </Flex>

    <Text aria-hidden="true" fontFamily="var(--font-mono)" fontSize="13px" px={4} pt={3.5} pb={1}>
      <Box as="span" color="var(--state-helped)">
        {user}
      </Box>
      <Box as="span" color="brand.textMeta">
        @{host}
      </Box>
      <Box as="span" color="brand.accent" fontWeight={700}>
        {" ~ $ "}
      </Box>
      <Box as="span" color="brand.text">
        {command}
      </Box>
    </Text>

    <Box px={4} pb={4} pt={1}>
      {children}
    </Box>
  </Box>
);
