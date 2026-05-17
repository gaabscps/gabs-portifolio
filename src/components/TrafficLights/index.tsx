import { Box, Flex } from "@chakra-ui/react";

export const TrafficLights = () => (
  <Flex gap="5px" alignItems="center" aria-hidden="true">
    <Box w="9px" h="9px" borderRadius="50%" bg="#ff5f57" />
    <Box w="9px" h="9px" borderRadius="50%" bg="#febc2e" />
    <Box w="9px" h="9px" borderRadius="50%" bg="#28c840" />
  </Flex>
);
