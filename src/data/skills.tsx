import { CiMobile1 } from "react-icons/ci";
import { DiScrum } from "react-icons/di";
import { FaReact } from "react-icons/fa";
import { SiFigma, SiSwagger } from "react-icons/si";
import {
  TbBrandGithub,
  TbBrandJavascript,
  TbBrandNextjs,
  TbBrandTypescript,
} from "react-icons/tb";

import type { Skill } from "@/types/project";

export const skills = {
  react: {
    name: "React",
    icon: <FaReact size="20px" />,
    color: "#61DAFB",
  },
  next: {
    name: "Next.js",
    icon: <TbBrandNextjs size="40px" />,
    color: "#fff",
  },
  typescript: {
    name: "TypeScript",
    icon: <TbBrandTypescript size="20px" />,
    color: "#3178C6",
  },
  javascript: {
    name: "Javascript",
    icon: <TbBrandJavascript size="20px" />,
    color: "#FF9900",
  },
  responsive: {
    name: "Responsive Design",
    icon: <CiMobile1 size="20px" />,
    color: "#AC6BED",
  },
  github: {
    name: "GitHub",
    icon: <TbBrandGithub size="20px" />,
    color: "#c6c6c6",
  },
  figma: {
    name: "Figma",
    icon: <SiFigma size="20px" />,
    color: "#0ACF83",
  },
  scrum: {
    name: "Scrum",
    icon: <DiScrum size="20px" />,
    color: "#ff6666",
  },
  swagger: {
    name: "Swagger",
    icon: <SiSwagger size="20px" />,
    color: "#85ea2d",
  },
} as const satisfies Record<string, Skill>;

export type SkillKey = keyof typeof skills;
