// app/providers.tsx
"use client";
import { theme } from "../themes/theme";

import { ChakraProvider } from "@chakra-ui/react";
import { LanguageProvider } from "../context/language";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </LanguageProvider>
  );
}
