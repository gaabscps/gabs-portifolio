import type { ReactNode } from "react";

export type Skill = {
  name: string;
  icon: ReactNode;
  color: string;
};

export type ProjectStatus = "live" | "under-construction";

export type ProjectLinks = {
  route?: string;
  live?: string;
  github?: string;
};

export type Project = {
  id: string;
  slug: string;
  translationKey: string;
  year: string;
  coverImage: string;
  images: string[];
  skills: Skill[];
  links: ProjectLinks;
  status: ProjectStatus;
};
