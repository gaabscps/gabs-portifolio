export const siteConfig = {
  url: "https://gabrielandrade.net",
  name: "Gabriel Andrade",
  jobTitle: "Front-end Engineer",
  locale: "en_US",
  defaultDescription:
    "Gabriel Andrade builds products end to end. Front-end engineer in São Paulo, shipping production software with AI as leverage, not as the demo.",
  ogImage: "/about/profile.png",
  twitterHandle: "@gaabscps",
  social: {
    github: "https://github.com/gaabscps",
    linkedin: "https://www.linkedin.com/in/gabriel-andrade-199601a2/",
    telegram: "https://t.me/gaabscps",
  },
} as const;

// Static pages only. The case study pages under /work/<slug> are derived from
// the project data in the sitemap, so adding a project does not need an edit
// here. The old /projects, /playx1 and /banca-do-ingresso paths are left out on
// purpose: next.config.mjs redirects them, and a sitemap should list final URLs.
export const routes = ["/", "/about", "/work", "/contact"] as const;
