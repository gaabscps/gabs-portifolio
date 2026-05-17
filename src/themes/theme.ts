/* theme.ts */
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: 'var(--font-montserrat)',
    body: 'var(--font-montserrat)',
    mono: 'var(--font-mono)',
  },
  colors: {
    brand: {
      bg: "#0d0a14",
      surface1: "#15101f",
      surface2: "#1c1530",
      deep: "#08050d",
      border: "#2a2240",
      borderSubtle: "#1f1830",
      accent: "#AC6BED",
      accentHover: "#C896FF",
      text: "#f0eaff",
      textSecondary: "#a89cb8",
      textMeta: "#7a6a90",
      textMuted: "#5a4a70",
    },
  },
  styles: {
    global: {
      body: {
        bg: "brand.bg",
        color: "brand.text",
      },
    },
  },
});
