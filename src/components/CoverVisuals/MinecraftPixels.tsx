import { Box } from "@chakra-ui/react";

const palette = [
  ["#5a8c3a", "#6a9c4a", "#5a8c3a", "#7aac5a", "#5a8c3a", "#6a9c4a", "#7aac5a"],
  ["#8a6a3a", "#9a7a4a", "#8a6a3a", "#7a5a2a", "#9a7a4a", "#8a6a3a", "#7a5a2a"],
  ["#7a5a2a", "#8a6a3a", "#7a5a2a", "#6a4a1a", "#8a6a3a", "#7a5a2a", "#6a4a1a"],
  ["#6a4a1a", "#7a5a2a", "#6a4a1a", "#5a3a0a", "#7a5a2a", "#6a4a1a", "#5a3a0a"],
];

export const MinecraftPixels = () => (
  <Box
    display="grid"
    gridTemplateColumns="repeat(7, 10px)"
    gap="1px"
    sx={{ animation: "blink-soft 6s ease-in-out infinite" }}
    aria-hidden="true"
  >
    {palette.flat().map((color, i) => (
      <Box key={i} w="10px" h="10px" bg={color} />
    ))}
  </Box>
);
