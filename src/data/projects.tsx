import { skills } from "@/data/skills";
import type { Project } from "@/types/project";

export const projects: Project[] = [
  // ============ LIVE ============
  {
    id: "betterSMP",
    slug: "bettersmp",
    translationKey: "bettersmp",
    year: "2026",
    startedAt: "2025-08",
    category: "minecraft community",
    images: [],
    skills: [skills.github],
    links: {
      route: "/work/bettersmp",
      live: "https://bettersmp.example",
      github: "https://github.com/gaabscps",
    },
    status: "live",
    cover: { kind: "custom", component: "MinecraftPixels" },
    stackChips: ["Java", "Spigot"],
    aiTool: "Claude",
    motivation:
      "Hyped Minecraft servers are AFK farms. Nothing to do, nothing new. We just wanted something better.",
    motivationContext: "— me to my brother, late july 2025",
    buildLog: [
      {
        date: "2025-08-14",
        version: "v0.1",
        title: "Server up. First plugin scaffold.",
        body: "Spigot setup, basic permission system, first economy plugin draft. Leaned hard on Claude <ai>AI</ai> for boilerplate — Spigot has a lot of ceremony and I wanted to skip the typing, not the understanding.",
      },
      {
        date: "2025-09-02",
        version: "v0.4",
        title: "Three plugins shipped. First rollback.",
        body: "Economy, quests, custom mobs went live for 5 testers. Mobs broke async event handling on second day. <ai>AI</ai>-generated draft didn't anticipate concurrent spawns. Rolled back, rewrote by hand, learned the lesson the loud way.",
        callouts: [
          {
            kind: "rejected",
            label: "rejected",
            body: "The async pattern Claude suggested would have worked in a single-threaded test. Production never is.",
          },
        ],
      },
      {
        date: "2025-10-20",
        version: "v0.8",
        title: "Community opens. Real testers, real bugs.",
        body: "20 active players. They found edge cases that no AI prompt would catch — duped items via /enderchest in claimed land, exploit in custom enchanter, three race conditions in trading. Postmortems for each, written by hand.",
        callouts: [
          {
            kind: "changed",
            label: "changed by hand",
            body: "All economy balance numbers. AI's defaults were 'let players have everything fast' — terrible game design. Taste decisions stay with me.",
          },
        ],
      },
      {
        date: "2026-02-10",
        version: "v1.4",
        title: "12 plugins, weekly cadence, changelog public.",
        body: "Every Friday I ship — new plugin, balance update, or fix. Community votes on contested features in Discord. <ai>AI</ai> writes the first 70% of code; I write all the copy, all the balance, and review every line.",
        callouts: [
          {
            kind: "rule",
            label: "rule",
            body: "If it touches taste, game-feel, or player communication — I write it. Everything else is fair game for AI assistance.",
          },
        ],
      },
    ],
    results: [
      { value: "12", label: "plugins live" },
      { value: "8mo", label: "in production" },
      { value: "2", label: "rollbacks · both fixed" },
      { value: "100%", label: "human-reviewed" },
    ],
    retrospective:
      "I'd write the test plan before letting AI scaffold anything. The two rollbacks happened because I trusted AI's 'this should work' without writing what 'work' actually meant. Now I write acceptance criteria first, then prompt. AI is a faster keyboard — not a faster judgment.",
  },

  {
    id: "soundwave",
    slug: "soundwave",
    translationKey: "soundwave",
    year: "2026",
    startedAt: "2025-11",
    category: "personal tool",
    images: [],
    skills: [skills.react, skills.next, skills.typescript],
    links: { route: "/work/soundwave" },
    status: "live",
    cover: { kind: "custom", component: "Waveform" },
    stackChips: ["Next", "Whisper"],
    aiTool: "Claude",
    motivation:
      "I kept losing the good parts of meetings. Built a pipeline to surface what I missed.",
  },

  {
    id: "CalendarFR",
    slug: "calendarfr",
    translationKey: "calendarfr",
    year: "2026",
    startedAt: "2026-01",
    category: "personal tool",
    images: [],
    skills: [skills.react, skills.next, skills.typescript],
    links: { route: "/work/calendarfr" },
    status: "live",
    cover: { kind: "custom", component: "MiniCalendar" },
    stackChips: ["React", "PWA"],
    aiTool: "Claude",
    motivation:
      "Every year I'd buy a planner and drop it by February. Built one that lives where I already am.",
  },

  // ============ ARCHIVE ============
  {
    id: "dashboard",
    slug: "dashboard",
    translationKey: "dashboard",
    year: "2024",
    category: "internal tool",
    coverImage:
      "https://gabsportifolio.s3.amazonaws.com/img/Dashboard/dashboard.png",
    images: [],
    skills: [],
    links: { route: "/work/dashboard" },
    status: "under-construction",
  },

  {
    id: "playx1",
    slug: "playx1",
    translationKey: "playx1",
    year: "2023",
    category: "competitive matchmaking",
    coverImage:
      "https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/landing.png",
    images: [
      "https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/landing.png",
      "https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/home.png",
      "https://gabsportifolio.s3.amazonaws.com/img/ProjetoX1/match.png",
    ],
    skills: [
      skills.react,
      skills.next,
      skills.typescript,
      skills.javascript,
      skills.responsive,
      skills.github,
      skills.figma,
    ],
    links: {
      route: "/work/playx1",
      live: "https://projeto-x1-git-mock-landing-gaabscps-projects.vercel.app/",
      github: "https://github.com/gaabscps/ProjetoX1",
    },
    status: "archived",
  },

  {
    id: "banca do ingresso",
    slug: "banca-do-ingresso",
    translationKey: "bancaDoIngresso",
    year: "2022",
    category: "ticketing platform",
    coverImage:
      "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/home.png",
    images: [
      "https://gabsportifolio.s3.amazonaws.com/img/BancaDoIngresso/home.png",
    ],
    skills: [
      skills.react,
      skills.typescript,
      skills.javascript,
      skills.responsive,
      skills.github,
      skills.scrum,
      skills.swagger,
      skills.figma,
    ],
    links: { route: "/work/banca-do-ingresso" },
    status: "archived",
  },
];
