import { useLanguage } from "@/context/language";
import { projects } from "@/data/projects";
import type { Project } from "@/types/project";

export type ProjectView = Project & {
  title: string;
  description: string;
};

export const useProjects = (): ProjectView[] => {
  const { translations } = useLanguage();

  return projects.map((project) => {
    const t = translations?.projects?.[
      project.translationKey as keyof typeof translations.projects
    ];
    return {
      ...project,
      title: t?.title ?? "",
      description: t?.description ?? "",
    };
  });
};
