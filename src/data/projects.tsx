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
      discord: "https://discord.gg/bettersmp",
    },
    status: "live",
    // To swap to a custom gameplay video (kind: "video"), drop the file at
    // public/bettersmp/preview.mp4 and update the cover below to:
    //   cover: { kind: "video", src: "/bettersmp/preview.mp4", alt: "BetterSMP gameplay" },
    cover: { kind: "custom", component: "MinecraftPixels" },
    server: {
      address: "bettersmpmc.net",
      version: "1.21.x",
      edition: "both",
      bedrockPort: 19132,
      banner: "/bettersmp/craftlist-banner.gif",
      bannerAlt: "BetterSMP — bettersmpmc.net · Bedrock port 19132",
    },
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
        body: "Every Friday I ship — new plugin, balance update, or fix. Community votes on contested features in Discord. I don't write Java. Every line is <ai>AI</ai>. What I write is the architecture, the observability, the tests, the scope, and the balance.",
        callouts: [
          {
            kind: "rule",
            label: "the rule",
            body: "I never learned Java. Claude writes every line. I write what the code has to do, what it must not break, and how I'll know if it does — architecture, tests, observability, scope. AI is the keyboard. Judgment is mine.",
          },
        ],
      },
    ],
    results: [
      { value: "0", label: "lines of Java I wrote" },
      { value: "12", label: "plugins live" },
      { value: "8mo", label: "in prod, firm" },
      { value: "2", label: "rollbacks · both fixed" },
    ],
    retrospective:
      "I don't know Java. I never have. What I know is how to write the architecture, an observability plan, a test plan, and the scope of a thing — and how to stop AI when it's about to ship something that'll break in production. That stack of skills used to need a senior engineer in the loop. With AI on the keyboard, it shipped a Java server that's been in prod 8 months. The two rollbacks happened because I trusted AI's \"this should work\" without writing what \"work\" meant. Now I write acceptance criteria first, then prompt.",
    plugins: [
      {
        name: "ELITE Mobs",
        summary:
          "Rare mobs spawn anywhere on the map and drop high-value loot. Players track them by N/S/E/W direction — or buy the coordinates from someone who already found them. Sparks PvP and PvE racing.",
        requestedBy: "the anti-AFK thesis, made literal",
        shippedAt: "2025-09",
        version: "v0.4",
        details:
          "Each elite mob has a unique loot table tied to a specific gear progression slot. When one spawns, the only hint a player gets is a cardinal direction — they don't know if it's 200 blocks or 2000 away. Players who already found one can sell coordinates in chat or list them on the Auction House, which created the secondary economy I really wanted: information as currency. Drop rates are tuned weekly based on the kill-count graphs.",
        myContribution:
          "drop curve, spawn density per chunk, the coords-as-currency mechanic, weekly tuning loop driven by observability dashboards.",
      },
      {
        name: "RPG · Professions",
        summary:
          "Quest lines per profession with a real arc. Rewards include passive and active skills, profession-locked tools, and exclusive items you can't get any other way.",
        requestedBy: "depth, not grind",
        shippedAt: "2025-10",
        version: "v0.7",
        details:
          "Six professions: miner, hunter, alchemist, farmer, blacksmith, tracker. Each unlocks profession-locked tools (the Tracker's Compass points to the nearest ELITE mob within 500 blocks, once a day), passive perks (alchemist brews are 15% stronger), and a final-tier active ability. The progression curve is hand-tuned per profession — early levels arrive fast to hook, mid plateaus to test commitment, then a long endgame climb that rewards regulars.",
        myContribution:
          "the six professions, ability budgets per tier, the fast / plateau / climb curve, every reward number.",
      },
      {
        name: "Supply Drop",
        summary:
          "Global event drops a chest, which summons an arena. Wave-based mobs, mini-bosses, full bosses. Up to 5 win something — only the player who opens the chest gets the headline reward.",
        requestedBy: "the weekly hype moment",
        shippedAt: "2025-12",
        version: "v1.1",
        details:
          "Triggers on a server-wide event timer (every 4–6h, randomized). The chest only opens after the arena closes — which means players have to survive the waves before they can race for the loot. Up to 5 players who survive get tier-2 rewards; whoever cracks the chest gets the headline drop. Mob composition per wave is scripted; boss tells were redrawn three times after players found exploit windows on the original timings.",
        myContribution:
          "wave timing, reward tiers, the survive-then-race mechanic, three rounds of boss-tell tuning.",
      },
      {
        name: "Pets",
        summary:
          "Server-exclusive cosmetic companions. Useful for rewards and as the monetization lane — strictly no pay-to-win, no stat boosts.",
        requestedBy: "the line we wouldn't cross on monetization",
        shippedAt: "2026-01",
        version: "v1.2",
        details:
          "Cosmetic only. No stat bonuses, no XP multipliers, no inventory expansion. They follow you, sit on command, despawn cleanly when you /home. The monetization rule was the load-bearing decision for the whole project: anything that touches gameplay balance, players earn. Anything purely cosmetic, players can buy. That line is what keeps the server honest — and what keeps me able to recommend it to friends.",
        myContribution:
          "the cosmetic-only rule, despawn behavior, the principle that draws the line on monetization.",
        gallery: [
          { src: "/bettersmp/pet-better-pup.png", alt: "Better+ Pup pet", caption: "Better+ Pup" },
          { src: "/bettersmp/pet-mini-enderman.png", alt: "Mini Enderman pet", caption: "Mini Enderman" },
          { src: "/bettersmp/pet-red-parrot.png", alt: "Red Parrot pet", caption: "Red Parrot" },
          { src: "/bettersmp/pet-baby-axolotl.png", alt: "Baby Axolotl pet", caption: "Baby Axolotl" },
          { src: "/bettersmp/pet-forest-fox.png", alt: "Forest Fox pet", caption: "Forest Fox" },
          { src: "/bettersmp/pet-mini-bee.png", alt: "Mini Bee pet", caption: "Mini Bee" },
        ],
      },
      {
        name: "Daily Missions",
        summary:
          "Rotating daily objectives with tuned rewards. The retention loop — they keep the economy moving and give players a reason to log in today, not tomorrow.",
        requestedBy: "weekly retention numbers",
        shippedAt: "2025-09",
        version: "v0.3",
        details:
          "Three missions a day per player from a rotating pool of around 40. Tuned so completing all three takes 30–45 minutes for an average player — short enough to fit after work, long enough to feel earned. Rewards are mostly economy (gold) with a small chance at a profession token. The rotation algorithm avoids back-to-back duplicates and weighs toward profession-aligned missions if the player has chosen one.",
        myContribution:
          "the 30–45 min budget, rotation algorithm, reward floor and ceiling, profession-weighted bias.",
      },
      {
        name: "Auction House",
        summary:
          "Server-wide player-to-player marketplace. Built from scratch — listing fees, taxes, search and category filters all tuned by hand.",
        requestedBy: "to replace shouting prices in chat",
        shippedAt: "2025-11",
        version: "v0.9",
        details:
          "Listing fee scales with item value, capped at 1% to prevent abuse. 24h max listing duration with auto-relisting opt-in. Search by name, category, enchantment, or seller. Sale tax is a flat 5% — straight into the server sink to fight inflation. All transactions logged to a Postgres table I dashboard against weekly to spot price floors going wrong.",
        myContribution:
          "fee curve, the 1% abuse cap, Postgres logging schema, the sink calibration that keeps gold from inflating.",
      },
      {
        name: "Shop System",
        summary:
          "Per-player shops with set-and-forget pricing, plus admin-curated server shops for sinks and starter goods. Drives the gold economy without flooding it.",
        requestedBy: "the economy needed both sides",
        shippedAt: "2025-08",
        version: "v0.2",
        details:
          "Two layers. Server shops (admin-set prices, infinite stock) define the floor and ceiling of the economy. Player shops (set-and-forget, limited stock, taxed) make up the middle. Server shops sell at slightly worse rates than player shops to encourage player-to-player trade — but they're always there as a fallback. Items in server shops are categorized by tier and priced against gold sinks elsewhere in the game.",
        myContribution:
          "the two-layer model, the server-vs-player price spread, sink-tied tier pricing.",
      },
    ],
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
