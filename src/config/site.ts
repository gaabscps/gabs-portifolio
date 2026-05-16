export const siteConfig = {
  url: "https://gabrielandrade.net",
  name: "Gabriel Andrade",
  jobTitle: "Front-end Developer",
  locale: "pt_BR",
  defaultDescription:
    "Portfólio de Gabriel Andrade — desenvolvedor front-end focado em interfaces dinâmicas, limpas e em ótimas experiências de usuário.",
  ogImage: "https://gabsportifolio.s3.amazonaws.com/img/About/perfil.png",
  twitterHandle: "@gaabscps",
  social: {
    github: "https://github.com/gaabscps",
    linkedin: "https://www.linkedin.com/in/gaabscps",
    telegram: "https://t.me/gaabscps",
  },
} as const;

export const routes = [
  "/",
  "/about",
  "/projects",
  "/contact",
  "/playx1",
  "/banca-do-ingresso",
] as const;
