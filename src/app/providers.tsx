// app/providers.tsx
"use client";
import { theme } from "../themes/theme";

import { ChakraProvider } from "@chakra-ui/react";
import { LanguageProvider } from "../context/language";
import { TerminalMount } from "../components/Terminal/TerminalMount";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ChakraProvider theme={theme}>
        {children}
        <TerminalMount />
      </ChakraProvider>
    </LanguageProvider>
  );
}
