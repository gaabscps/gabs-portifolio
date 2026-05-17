import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Flex, Text } from "@chakra-ui/react";
import { projects } from "@/data/projects";
import { CaseStudyLayout } from "@/components/CaseStudy/Layout";
import { Intro } from "@/components/CaseStudy/Intro";
import { LivePreview } from "@/components/CaseStudy/LivePreview";
import { PullQuote } from "@/components/CaseStudy/PullQuote";
import { BuildLog } from "@/components/CaseStudy/BuildLog";
import { Stats } from "@/components/CaseStudy/Stats";
import { Retrospective } from "@/components/CaseStudy/Retrospective";
import { PrevNextNav } from "@/components/CaseStudy/PrevNextNav";

type Params = { slug: string };

const HEADLINES: Record<string, React.ReactNode> = {
  bettersmp: (
    <>
      We built the Minecraft server we wished{" "}
      <Box as="span" className="serif-italic" color="brand.accent" fontWeight="600">existed</Box>.
    </>
  ),
  soundwave: (
    <>
      Meetings I can{" "}
      <Box as="span" className="serif-italic" color="brand.accent" fontWeight="600">actually</Box> use.
    </>
  ),
  calendarfr: (
    <>
      A planner that{" "}
      <Box as="span" className="serif-italic" color="brand.accent" fontWeight="600">sticks</Box>.
    </>
  ),
};

const LEDES: Record<string, string> = {
  bettersmp:
    "Most popular SMPs are abandoned AFK farms. You log in, find a corner, AFK overnight for diamonds. That's not playing. We wanted somewhere with actual things to do — and shipped 12 custom plugins to make it real.",
  soundwave:
    "I take a lot of meetings. I miss a lot of details. soundwave records, transcribes, and surfaces the parts I'd otherwise lose — and grades how I sound on the parts I want to improve.",
  calendarfr:
    "Every year I'd buy a planner and abandon it by February — too lazy to dig through a bag to find it. CalendarFR lives where I already am.",
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.id,
    description: project.motivation ?? `${project.id} · ${project.category ?? "case study"}.`,
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : undefined;
  const next = idx < projects.length - 1 ? projects[idx + 1] : undefined;
  const counter = `${String(idx + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
  const hasFullCase = (project.buildLog?.length ?? 0) > 0;

  return (
    <>
      <CaseStudyLayout project={project}>
        <Intro
          project={project}
          headline={HEADLINES[project.slug] ?? project.id}
          lede={LEDES[project.slug]}
        />

        {project.cover && <LivePreview component={project.cover.component} />}

        {project.motivation && (
          <Box id="why">
            <PullQuote quote={project.motivation} context={project.motivationContext} />
          </Box>
        )}

        {hasFullCase && project.buildLog && <BuildLog entries={project.buildLog} />}

        {hasFullCase && project.results && (
          <Box id="what-shipped">
            <Stats
              stats={project.results}
              footer={
                project.links.live ? (
                  <>
                    verified by community →{" "}
                    <Box as="span" className="draw-link" color="brand.accentHover">
                      {project.links.live}
                    </Box>
                  </>
                ) : null
              }
            />
          </Box>
        )}

        {project.retrospective && <Retrospective body={project.retrospective} />}

        {!hasFullCase && (
          <Box
            id="placeholder"
            p={6}
            border="1px dashed"
            borderColor="brand.border"
            borderRadius="10px"
            mb={9}
          >
            <Text
              fontSize="10px"
              color="brand.textMeta"
              fontFamily="var(--font-mono)"
              letterSpacing="0.15em"
              textTransform="uppercase"
              mb={2}
            >
              case study · coming soon
            </Text>
            <Text fontSize="14px" color="brand.textSecondary" lineHeight={1.6} mb={4}>
              Full build log and retrospective are being written. In the meantime, you can check the project directly:
            </Text>
            <Flex gap={3} flexWrap="wrap" fontSize="11px" fontFamily="var(--font-mono)">
              {project.links.live && (
                <Box
                  as="a"
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="draw-link"
                  color="brand.accentHover"
                >
                  live ↗
                </Box>
              )}
              {project.links.github && (
                <Box
                  as="a"
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="draw-link"
                  color="brand.accentHover"
                >
                  github ↗
                </Box>
              )}
            </Flex>
          </Box>
        )}

        {hasFullCase && (
          <Flex gap={2.5} flexWrap="wrap" mb={9}>
            {project.links.live && (
              <Box
                as="a"
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                gap={2}
                bg="brand.accent"
                color="brand.bg"
                fontSize="12px"
                fontWeight="700"
                px={4.5}
                py={2.5}
                borderRadius="6px"
                fontFamily="var(--font-mono)"
                textDecoration="none"
              >
                join the server{" "}
                <Box as="span" sx={{ animation: "wiggle-arrow 1.5s ease-in-out infinite" }}>→</Box>
              </Box>
            )}
            {project.links.github && (
              <Box
                as="a"
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="draw-link"
                color="brand.text"
                fontSize="12px"
                fontWeight="600"
                px={3.5}
                py={2.5}
                fontFamily="var(--font-mono)"
                textDecoration="none"
              >
                github ↗
              </Box>
            )}
            {project.links.changelog && (
              <Box
                as="a"
                href={project.links.changelog}
                target="_blank"
                rel="noopener noreferrer"
                className="draw-link"
                color="brand.text"
                fontSize="12px"
                fontWeight="600"
                px={3.5}
                py={2.5}
                fontFamily="var(--font-mono)"
                textDecoration="none"
              >
                changelog ↗
              </Box>
            )}
          </Flex>
        )}
      </CaseStudyLayout>

      <PrevNextNav
        prev={prev ? { slug: prev.slug, name: prev.id, year: prev.year, category: prev.category } : undefined}
        next={next ? { slug: next.slug, name: next.id, year: next.year, category: next.category } : undefined}
        index={counter}
      />
    </>
  );
}
