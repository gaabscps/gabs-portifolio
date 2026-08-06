import type { MetadataRoute } from "next";
import { routes, siteConfig } from "@/config/site";
import { projects } from "@/data/projects";

const url = (path: string) => {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = routes.map((path) => ({
    url: url(path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const caseStudies = projects.map((project) => ({
    url: url(`/work/${project.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...caseStudies];
}
