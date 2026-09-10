# Terminal reading experience — 2026-09-10

The home terminal previously mapped a 900-viewport-height wrapper to a fixed 880 px window. Each scroll tick expanded output and eased an internal scroll position toward the bottom. Product images could be taller than the available reading area and were pushed out of view as the next block appeared.

The home now uses normal document flow inside the terminal frame. Commands and all four projects are present from the initial render, with no fixed-height viewport, collapsed outputs or automatic inner scroll. The content container grows to 1440 px including outer gutters. Desktop cards place a complete 16:10 image beside the project description; narrower layouts stack them. Text and case-study links are larger, and images use containment instead of cropping. The old journey hook and step weights were removed.

Narrow-screen QA also exposed a clipped navigation bar and an oversized hero word at 320 px. The navigation now reduces decorative elements and spacing on small screens, and the hero type scales with viewport width.

Validation:
- Production build, TypeScript and ESLint passed.
- In-browser inspection at 1440, 1100, 390 and 320 px.
- At 1100 px, the terminal frame measured 1021 px, all four images decoded, and there were no overflowing inner scroll containers.
- Scrolling down and back up preserved the first card's document position exactly (849.765625 px), with no reflow or content reveal tied to scroll.
- Opening a case and returning restored a fully readable home.
- At 390 px, all four cards were stacked, complete, and free of horizontal overflow.
- Final 320 px check: document width 305 px with the scrollbar reserved, complete navigation and a 32 px hero font; no horizontal overflow. The interactive terminal still opens from its control and closes with Escape.
