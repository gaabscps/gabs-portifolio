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
      bg: "#0c0a14",
      surface1: "#14111d",
      surface2: "#1a1626",
      deep: "#08060e",
      border: "#252132",
      borderSubtle: "#1a1626",
      borderStrong: "#322b42",
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
