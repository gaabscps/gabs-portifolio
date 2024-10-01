import { useLanguage } from "@/context/language";
import { CiMobile1 } from "react-icons/ci";
import { DiScrum } from "react-icons/di";
import { FaReact } from "react-icons/fa";
import { SiFigma, SiSwagger } from "react-icons/si";
import {
  TbBrandNextjs,
  TbBrandTypescript,
  TbBrandJavascript,
  TbBrandGithub,
} from "react-icons/tb";

export const useProjects = () => {
  const { translations } = useLanguage();

  const mockedProjects = [
    {
      projectName: translations?.projects?.playx1?.title,
      projectDescription: translations?.projects?.playx1?.description,
      projectDate: "2023",
      projectImage:
        "https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/landing.png",
      link: "/playx1",
      skills: [
        {
          name: "React",
          icon: <FaReact size="20px" />,
          color: "#61DAFB",
        },
        {
          name: "Next.js",
          icon: <TbBrandNextjs size="40px" />,
          color: "#fff",
        },
        {
          name: "TypeScript",
          icon: <TbBrandTypescript size="20px" />,
          color: "#3178C6",
        },
        {
          name: "Javascript",
          icon: <TbBrandJavascript size="20px" />,
          color: "#FF9900",
        },
        {
          name: "Responsive Design",
          icon: <CiMobile1 size="20px" />,
          color: "#AC6BED",
        },
        {
          name: "GitHub",
          icon: <TbBrandGithub size="20px" />,
          color: "#c6c6c6",
        },
        {
          name: "Figma",
          icon: <SiFigma size="20px" />,
          color: "#0ACF83",
        },
      ],
    },
    {
      projectName: translations?.projects?.bancaDoIngresso?.title,
      projectDescription: translations?.projects?.bancaDoIngresso?.description,
      projectDate: "2022",
      projectImage:
        "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/home.png",
      link: "/banca-do-ingresso",
      skills: [
        {
          name: "React",
          icon: <FaReact size="20px" />,
          color: "#61DAFB",
        },
        {
          name: "TypeScript",
          icon: <TbBrandTypescript size="20px" />,
          color: "#3178C6",
        },
        {
          name: "Javascript",
          icon: <TbBrandJavascript size="20px" />,
          color: "#FF9900",
        },
        {
          name: "Responsive Design",
          icon: <CiMobile1 size="20px" />,
          color: "#AC6BED",
        },
        {
          name: "GitHub",
          icon: <TbBrandGithub size="20px" />,
          color: "#c6c6c6",
        },
        {
          name: "Scrum",
          icon: <DiScrum size="20px" />,
          color: "#ff6666",
        },
        {
          name: "Swagger",
          icon: <SiSwagger size="20px" />,
          color: "#85ea2d",
        },
        {
          name: "Figma",
          icon: <SiFigma size="20px" />,
          color: "#0ACF83",
        },
      ],
    },
    {
      projectName: translations?.projects?.dashboard?.title,
      projectDescription: translations?.projects?.dashboard?.description,
      projectDate: "2024",
      projectImage:
        "https://gabsportifolio.s3.amazonaws.com/img/Dashboard/dashboard.png",
      link: "",
      underConstruction: true,
    },
  ];

  return mockedProjects;
};
