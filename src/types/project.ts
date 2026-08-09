import type { ReactNode } from "react";

export type Skill = {
  name: string;
  icon: ReactNode;
  color: string;
};

export type ProjectStatus = "live" | "wip" | "archived" | "under-construction";

export type ProjectLinks = {
  route?: string;
  live?: string;
  github?: string;
  changelog?: string;
  discord?: string;
  website?: string;
  wiki?: string;
};

export type ProjectCover = {
  kind: "screenshot" | "video" | "custom" | "gif";
  src?: string;
  component?: string;
  alt?: string;
};

export type Plugin = {
  name: string;
  summary: string;
  requestedBy?: string;
  shippedAt: string;
  version?: string;
  impact?: string;
  details?: string;
  myContribution?: string;
  gallery?: PluginAsset[];
};

export type PluginAsset = {
  src: string;
  alt: string;
  caption?: string;
  kind?: "image" | "video";
  poster?: string;
};

export type ServerInfo = {
  address: string;
  version?: string;
  edition?: "java" | "bedrock" | "both";
  bedrockPort?: number;
  banner?: string;
  bannerAlt?: string;
};

export type Callout = {
  kind: "rule" | "changed" | "rejected";
  label: string;
  body: string;
};

export type BuildLogEntry = {
  date: string;
  version: string;
  title: string;
  body: string;
  callouts?: Callout[];
};

// A stat is either a fixed value ("33 plugins live") or a running duration that
// counts from a date ("live in prod"). Set `since` instead of `value` for the
// second kind, so the number recomputes on every build instead of being typed
// by hand and going stale.
export type Stat = {
  value?: string;
  label: string;
  since?: string;
};

export type Project = {
  id: string;
  slug: string;
  translationKey: string;
  year: string;
  startedAt?: string;
  category?: string;
  coverImage?: string;
  images: string[];
  skills: Skill[];
  links: ProjectLinks;
  status: ProjectStatus;
  cover?: ProjectCover;
  stackChips?: string[];
  aiTool?: string;
  motivation?: string;
  motivationContext?: string;
  buildLog?: BuildLogEntry[];
  results?: Stat[];
  retrospective?: string;
  plugins?: Plugin[];
  server?: ServerInfo;
};
