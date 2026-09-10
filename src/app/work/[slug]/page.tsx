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
import { ServerStatusPill } from "@/components/CaseStudy/ServerStatusPill";
import { PluginGrid } from "@/components/CaseStudy/PluginGrid";
import { ServerAddressCTA } from "@/components/CaseStudy/ServerAddressCTA";

type Params = { slug: string };

const HEADLINES: Record<string, React.ReactNode> = {
  soundwave: (
    <>
      Meetings I can{" "}
      <Box as="span" className="serif-italic" color="brand.accent" fontWeight="600">actually</Box> use.
    </>
  ),
  "ai-squad": (
    <>
      Engineering a workflow where verification outranks{" "}
      <Box as="span" className="serif-italic" color="brand.accent" fontWeight="600">confidence</Box>.
    </>
  ),
  aios: (
    <>
      Make AI-assisted work{" "}
      <Box as="span" className="serif-italic" color="brand.accent" fontWeight="600">observable</Box>.
    </>
  ),
};

const LEDES: Record<string, string> = {
  soundwave:
    "SoundWave Summit is a full-stack audio AI product: record or upload audio, process it outside the browser, and return a structured workspace for transcripts, topics, decisions, sentiment, and action items.",
  "ai-squad":
    "ai-squad is a structured workflow for AI-assisted development. Its current V3 build phase uses one implementer, executable verification, a fresh-eyes review, and two human checkpoints, with hooks enforcing file scope and git-write rules.",
  aios:
    "aiOS is the React observability cockpit inside the ai-squad repository. It turns recorded session artifacts into an attention board and detailed evidence views for phase, duration, cost, verification, and decisions. Screens shown use synthetic data.",
  squadhouse:
    "Squadhouse connects a Next.js 16 customer platform, AI-assisted service delivery, and an internal CRM with a WhatsApp bridge and shared Supabase data contract.",
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

        {project.server && (
          <Box mb={8} mt={-4}>
            <ServerStatusPill address={project.server.address} />
          </Box>
        )}

        {project.cover && <LivePreview cover={project.cover} />}

        {project.motivation && (
          <Box id="why">
            <PullQuote quote={project.motivation} context={project.motivationContext} />
          </Box>
        )}

        {hasFullCase && project.buildLog && (
          <BuildLog entries={project.buildLog} projectName={project.slug} />
        )}

        {project.plugins && project.plugins.length > 0 && (
          <PluginGrid plugins={project.plugins} />
        )}

        {hasFullCase && project.results && (
          <Box id="what-shipped">
            <Stats
              stats={project.results}
              footer={
                project.links.live ? (
                  <>
                    explore the product →{" "}
                    <Box as="a" href={project.links.live} target="_blank" rel="noopener noreferrer" className="draw-link" color="brand.accentHover">
                      {project.id}
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

        {hasFullCase && project.server && (
          <ServerAddressCTA server={project.server} links={project.links} />
        )}

        {hasFullCase && !project.server && (
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
                open product{" "}
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
