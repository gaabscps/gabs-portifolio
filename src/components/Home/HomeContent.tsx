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
  // Build once so the step nodes keep stable identities — this is what lets the
  // memoized terminal blocks skip re-rendering on every scroll tick.
  const session = useMemo(() => buildHomeSession(), []);

  return (
    <Box className="bg-textured" minH="100vh" color="brand.text" display="flex" flexDirection="column">
      <LivingBackground />
      <Nav active="work" />
      <Box maxW="1200px" w="100%" mx="auto" flex="1">
        <Hero />
        <SessionTerminal steps={session} />
      </Box>
      <Footer />
      <TerminalHint />
    </Box>
  );
}
