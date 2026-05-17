# Portfolio rebrand · overnight build status

**Branch:** `feat/portfolio-rebrand` (off `feat/perf-cwv`, **not pushed**)
**Date:** 2026-05-17 (overnight session)
**Commits added:** 5 (plus 1 chore commit for gitignore)

Delete this file after reviewing.

---

## How to review

```bash
# See all changes vs the parent branch
git diff feat/perf-cwv..feat/portfolio-rebrand

# See changes vs master (includes perf-cwv work too)
git diff master..feat/portfolio-rebrand

# Run it
yarn dev
# open http://localhost:3000
```

Pages to look at:
- `/` — new home (hero, featured, workshop, archive, footer)
- `/work` — full archive index
- `/work/bettersmp` — full case study (proof case, has build log + retrospective)
- `/work/soundwave`, `/work/calendarfr`, `/work/dashboard`, `/work/playx1`, `/work/banca-do-ingresso` — case stubs with "coming soon" placeholder
- `/about` — long-form bio (new copy, English)
- `/contact` — form (rewritten in new style, same channels)
- `/banca-do-ingresso`, `/playx1`, `/projects` — should 308-redirect to `/work/...`

---

## What shipped

### Commits (oldest → newest)

```
998f55e  feat(design):  add design tokens, extend theme, traffic lights, EN default
b5e31e6  feat(home):    add hero, featured, workshop, archive, nav, footer + Project type migration
5609afc  chore:         gitignore brainstorm artifacts
94a77df  feat(case):    add case study scaffold, components, /work routes, redirects
51531c7  feat(pages):   rewrite about and contact with new Nav, Footer and design tokens
```

### Phase 1 · Design system
- `src/styles/tokens.css` — CSS variables for palette, motion, fonts, plus shared keyframes (`blink-soft`, `pulse-glow`, `cursor-blink`, `draw-x`, `wiggle-arrow`, `wave-bar`) and utility classes (`.bg-textured`, `.cursor-caret`, `.serif-italic`, `.draw-link`).
- `src/themes/theme.ts` — extended Chakra theme with `brand.*` color tokens (bg, surface1, surface2, deep, border, borderSubtle, accent, accentHover, text, textSecondary, textMeta, textMuted), dark mode default, mono font binding.
- `src/components/TrafficLights/` — macOS traffic lights easter egg.
- `src/context/language.tsx` — flipped default language to `en` (PT-BR still available via toggle, lookup is unchanged).
- `src/app/layout.tsx` — removed root `Navbar` + centered `Flex` wrapper; pages now own their own layout (every new page wraps with `Nav` + `Footer`). `<html lang>` switched to `en`.

### Phase 2 · Home page
- `src/components/Home/Hero.tsx` — "I got into dev late. Got into AI *on time*." with pulsing status pill, serif italic accent, blinking cursor, meta strip.
- `src/components/Home/Featured.tsx` + `FeaturedTile.tsx` — grid of `status="live"` projects (max 3), each with project-specific cover visual, stack chips, and AI tool chip.
- `src/components/Home/Workshop.tsx` — 4-col strip: Now / Playing (with animated bar) / Reading (italic serif) / Note (accent-bordered quote).
- `src/components/Home/ArchiveList.tsx` — compact row list, hover indent + arrow reveal.
- `src/components/Home/Nav.tsx` — sticky transparent-blur nav with traffic lights + `gabriel.dev` wordmark.
- `src/components/Home/Footer.tsx` — bio paragraph + github/linkedin/email links.
- `src/components/Home/HomeContent.tsx` — page composition.
- `src/components/CoverVisuals/` — three project-specific tile visuals:
  - `MinecraftPixels.tsx` (for betterSMP)
  - `Waveform.tsx` (for soundwave) — animated bars
  - `MiniCalendar.tsx` (for CalendarFR) — purple-accented cells
- `src/config/hero.ts` + `src/config/workshop.ts` — editable copy without code dive.
- `src/types/project.ts` + `src/data/projects.tsx` — Project type expanded with case study fields; data refactored. New projects added (betterSMP with full case data, soundwave + CalendarFR with stubs).
- `src/app/page.tsx` — root page now renders the new home.

### Phase 3 · Case study scaffold (`/work/[slug]`)
- `src/app/work/page.tsx` — archive index for all projects.
- `src/app/work/[slug]/page.tsx` — dynamic case study with static generation.
- `src/components/CaseStudy/` — 14 components:
  - `Layout.tsx` — asymmetric 2-column (sticky sidebar + main content).
  - `StickyBar.tsx` — top bar with traffic lights + breadcrumb + scroll progress.
  - `StickySidebar.tsx` — TOC + meta box.
  - `Intro.tsx` — status pill + display headline + lede (parameterized per slug via HEADLINES/LEDES maps in the page).
  - `LivePreview.tsx` — bordered glow box with project visual.
  - `PullQuote.tsx` — serif italic + accent border + human context line.
  - `BuildLog.tsx` + `BuildLogEntry.tsx` — chronological entries with date/version/title/body. Body parses `<ai>...</ai>` inline markers.
  - `AiMark.tsx` — inline `AI` badge with hover.
  - `Callout.tsx` — marginalia for `rule` / `changed` / `rejected` (color-coded, tilts on hover).
  - `Stats.tsx` — 2x2 grid of large stat slabs.
  - `Retrospective.tsx` — "what i'd change next time" prose.
  - `PrevNextNav.tsx` — bottom strip with prev/next case + counter.
  - `ReadingProgress.tsx` + `useReadingProgress` hook.
- `next.config.mjs` — 308 redirects from old project routes (`/banca-do-ingresso`, `/playx1`, `/projects`).

### Phase 4 · Legacy pages refresh
- `src/components/About/AboutContent.tsx` — new long-form bio in English, uses Nav + Footer + new design tokens. Talks about the UNESP → late dev pivot → 3 years pre-AI → AI on time narrative.
- `src/components/Contact/ContactContent.tsx` — same form (WhatsApp/Telegram/email) restyled in the new system, English copy.
- Old `app/about/AboutContent.tsx` and `app/contact/ContactContent.tsx` deleted.

### Phase 5 · Verification
- `yarn lint` — clean, 0 warnings/errors.
- `yarn build` — clean, all 14 routes generate including 6 case study slugs.
- Smoke test (curl): all routes return 200, all redirects return 308 to the right destination, key copy strings render on home / case study / about.

---

## What's NOT done (intentional)

1. **Full case study content for non-betterSMP projects.** soundwave, CalendarFR, dashboard, playx1, banca-do-ingresso currently render with a "case study coming soon" placeholder + live/github links. Writing real build logs requires your input on the project history (dates, what AI helped with, what you rejected, results). I only had real material for betterSMP.

2. **i18n PT-BR translation of new strings.** The new home, case study, about, and contact copy is hardcoded English (the spec calls for English as canonical). The `ptbr.json` locale file still has the old translations — they apply to `useLanguage`-using components, but none of the new components use that hook. When you want PT-BR parity, we'll add `t("home.hero.headline")` calls and populate both locale files.

3. **Open spec questions** (per `docs/superpowers/specs/2026-05-17-portfolio-rebrand-design.md` §9):
   - Custom cursor on case studies
   - FLIP page transition tile → case
   - `/writing` section (link reserved in nav but route doesn't exist yet — clicking it 404s)
   - `gabriel.dev` custom logotype vs current text treatment
   - Custom visuals for Dashboard / PlayX1 / Banca (they don't have a `cover` set; tiles only show their status label)

4. **Live URLs in projects data.** `betterSMP` data uses placeholder URLs (`https://bettersmp.example`, generic `github.com/gaabscps`). Update these in `src/data/projects.tsx` before going to production.

5. **Chrome MCP visual validation.** The Chrome MCP wasn't connected during the build, so I couldn't pixel-check. Smoke test via curl confirms structure renders, but you should eyeball it in browser tomorrow.

---

## Files changed (51 total)

5 files modified in root layout / theme / context:
- `src/app/layout.tsx`, `src/themes/theme.ts`, `src/context/language.tsx`, `src/types/project.ts`, `next.config.mjs`

3 files modified in data / app routes:
- `src/data/projects.tsx`, `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`

2 files deleted:
- `src/app/about/AboutContent.tsx`, `src/app/contact/ContactContent.tsx` (replaced by versions in `src/components/About/`, `src/components/Contact/`)

New files (~30):
- `src/styles/tokens.css`
- `src/config/hero.ts`, `src/config/workshop.ts`
- `src/components/TrafficLights/index.tsx`
- `src/components/CoverVisuals/` (4 files)
- `src/components/Home/` (8 files)
- `src/components/CaseStudy/` (14 files)
- `src/components/About/AboutContent.tsx`
- `src/components/Contact/ContactContent.tsx`
- `src/hooks/useReadingProgress.ts`
- `src/app/work/page.tsx`, `src/app/work/[slug]/page.tsx`
- `docs/superpowers/specs/2026-05-17-portfolio-rebrand-design.md` (gitignored, local only)
- `docs/superpowers/plans/2026-05-17-portfolio-rebrand.md` (gitignored, local only)
- `REBRAND-STATUS.md` (this file)

---

## How to undo if you hate it

```bash
git checkout feat/perf-cwv
git branch -D feat/portfolio-rebrand
```

Nothing was pushed. No master branch was touched. The `feat/perf-cwv` parent branch is unchanged.
