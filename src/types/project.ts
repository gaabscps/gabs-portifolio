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
};

export type ProjectCover = {
  kind: "screenshot" | "video" | "custom";
  src?: string;
  component?: string;
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

export type Stat = {
  value: string;
  label: string;
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
};
