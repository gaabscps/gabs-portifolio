"use client";

import { FeaturedTile } from "./FeaturedTile";
import { TerminalJourney, type JourneyItem } from "./TerminalJourney/TerminalJourney";
import { projects } from "@/data/projects";

export const Featured = () => {
  const live = projects.filter((p) => p.status === "live").slice(0, 3);
  const items: JourneyItem[] = live.map((p) => ({
    key: p.id,
    node: (
      <FeaturedTile
        slug={p.slug}
        status={p.status}
        year={p.year}
        name={p.id}
        blurb={p.motivation ?? ""}
        stack={p.stackChips ?? []}
        aiTool={p.aiTool}
        coverComponent={p.cover?.component}
      />
    ),
  }));

  return (
    <TerminalJourney
      command="ls --live projects/"
      context="~/work"
      toolLabel="projects/ · filter status=live"
      toolResult={`${live.length} live projects found`}
      endStat={`${live.length}/${projects.length} shown`}
      items={items}
    />
  );
};
