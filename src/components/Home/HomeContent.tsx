"use client";

import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { LivingBackground } from "./LivingBackground";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Footer } from "./Footer";
import { SessionTerminal } from "./SessionTerminal/SessionTerminal";
import { buildHomeSession } from "./SessionTerminal/buildHomeSession";
import { TerminalHint } from "../Terminal/TerminalHint";

export default function HomeContent() {
  // Keep the session content stable across incidental home-page renders.
  const session = useMemo(() => buildHomeSession(), []);

  return (
    <Box className="bg-textured" minH="100vh" color="brand.text" display="flex" flexDirection="column">
      <LivingBackground />
      <Nav active="work" />
      <Box maxW="1440px" w="100%" mx="auto" flex="1">
        <Hero />
        <SessionTerminal steps={session} />
      </Box>
      <Footer />
      <TerminalHint />
    </Box>
  );
}
