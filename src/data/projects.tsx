import { skills } from "@/data/skills";
import type { Project } from "@/types/project";

export const projects: Project[] = [
  // ============ LIVE ============
  {
    id: "betterSMP",
    slug: "bettersmp",
    translationKey: "bettersmp",
    year: "2026",
    startedAt: "2026-02",
    category: "minecraft community",
    images: [],
    skills: [skills.github],
    links: {
      route: "/work/bettersmp",
      discord: "https://discord.gg/bettersmp",
    },
    status: "live",
    // To swap the cover to a gameplay reel (kind: "video"), drop the file at
    // public/bettersmp/preview.mp4 and update the cover below to:
    //   cover: { kind: "video", src: "/bettersmp/preview.mp4", alt: "BetterSMP gameplay reel — 15–30s cut: spawn lobby → ELITE mob spotted → Supply Drop arena → Auction House" },
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
    motivationContext: "— me to my brother, february 2026",
    buildLog: [
      {
        date: "2026-02-26",
        version: "v0.1",
        title: "Server up. Auction House and Economy scaffolded.",
        body: "Set up a Purpur server (a fork of the standard Minecraft server with extra performance and config knobs) running 1.21.x on a managed game-server panel, with Geyser + Floodgate (the protocol bridges that let Bedrock-edition clients connect to a Java server) for cross-platform play. First two custom plugins drafted: the auction house and the economy. Spigot — the standard Java API for Minecraft server plugins — has a lot of ceremony, so <ai>AI</ai> wrote every line of Java while I wrote the plugin.yml permission tree and the command-to-permission mapping for each entry point.",
      },
      {
        date: "2026-03-25",
        version: "v0.4",
        title: "Global Missions — first daily-cadence loop.",
        body: "One server-wide community mission per UTC day, tier-weighted (tier1: 15, tier2: 30, tier3: 55). Action-bar throttle and a 60-minute reminder were added after the first week — players were missing the toast on join.",
        callouts: [
          {
            kind: "changed",
            label: "changed by hand",
            body: "<ai>AI</ai>'s first cut had no rate-limit on the action-bar feedback. With six players online it was already chat-flicker. I wrote a 5-second cooldown per player into the spec before the next try.",
          },
        ],
      },
      {
        date: "2026-04-11",
        version: "v0.5",
        title: "World Events ship: Supply Drop + ELITE Mobs.",
        body: "Random server-wide event every 4–12 hours: Supply Drop arena with mob waves (30s interval, 6 per wave, max 12), a mini-boss with 4× health, and a reward window for up to 5 players. ELITE Mobs spawn anywhere on the world map (48–14,750 blocks from spawn, max 12 alive at once) — players track them by cardinal hint or buy coordinates from whoever found them first.",
      },
      {
        date: "2026-04-26",
        version: "v0.7",
        title: "Security sweep — six exploits closed in a day.",
        body: "Community testers found a stack of item-name and lore exploits: a shulker box renamed \"SPAWNERS\" opened the shop GUI, command injection in a LuckPerms fallback that used <ai>player.getName()</ai> in a console dispatch, a sethome dupe via a 100ms /delhome race. Migrated item identity to PersistentDataContainer, charged sethome before the command instead of after, swapped console-string LuckPerms calls for the Java API.",
        callouts: [
          {
            kind: "rejected",
            label: "rejected",
            body: "<ai>AI</ai>'s first patch for the rename exploit was a substring match on the inventory title. Players renamed their shulkers \"my spawners\" and bypassed it in five minutes. The real fix was checking InventoryType.CHEST first — boring, correct, written after I rejected the clever one.",
          },
        ],
      },
      {
        date: "2026-05-01",
        version: "v1.0",
        title: "RPG launch — Miner profession live, Hunter and Farmer one week later.",
        body: "First profession (Miner, T1–T4) shipped with NPC interactions, quest journal book, a BossBar compass HUD that points at the active quest target, and trust scaling per (player, npc) pair. Hunter and Farmer followed on 2026-05-02. The plugin has a real test suite — QuestCatalogueLintTest, AdvanceKindHandlerCoverageTest, CropAllowlistCoverageTest — because <ai>AI</ai> kept regressing the quest config validation.",
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
      { value: "33", label: "plugins live" },
      { value: "12wk", label: "in prod, firm" },
      { value: "6", label: "exploits closed · single sweep" },
    ],
    retrospective:
      "I don't know Java. I never have. What I know is how to write the architecture, an observability plan, a test plan, and the scope of a thing — and how to stop AI when it's about to ship something that'll break in production. The biggest rollback came from one thing: I trusted Claude's defaults for security-adjacent code without writing what \"safe\" had to mean. A string-match on inventory titles that a player bypassed in five minutes by renaming a container. A console-dispatch that interpolated <ai>player.getName()</ai> directly into a permissions command — textbook command injection. A <ai>/sethome</ai> that charged 100ms after the command ran instead of before, leaving a race for <ai>/delhome</ai> to dodge the charge. Six exploits in one community-test pass, shipped in one sweep. The lesson generalizes: every listener that touches money, items, or permissions now gets acceptance criteria written before the first prompt — typed metadata for item identity (not strings, never strings), inventory-type guards on shop listeners, charge-before-action ordering, zero string interpolation into anything that runs as a privileged command. The rest is just typing.",
    plugins: [
      {
        // TODO assets:
        //   /bettersmp/world-events-supply-drop.mp4 — 20–30s clip: pre-alert message in chat → arena materializing in open biome (lime glass marker → emerald base) → first wave of zombies/skeletons/spiders spawning at 30s interval → mini-boss zombie appearing → chest unlocking, top survivor opens it
        //   /bettersmp/world-events-supply-drop-rewards.png — winner reward screen showing $25,000 + 80 shards + "resource" crate key
        name: "World Events · Supply Drop",
        summary:
          "A data-driven event runtime for the game world. Every 4–12 hours a scheduler draws a new event from a YAML catalog, spawns a protected zone at a safe random location, runs scripted enemy waves and a boss fight, and unlocks a tiered-reward window for the top 5 players who survive. New event types are added by editing the YAML — same code path, no redeploy.",
        requestedBy: "the weekly hype moment, without a hardcoded handler per event",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "A 30-second poll drives a weighted draw from `events.yml`; on hit, a spawn location is rolled inside a 14,750-block sandbox (250-block boundary margin, up to 64 collision-safe retries). The event runtime then sequences: scripted enemy waves on a 30-second tick (6 per wave, max 2 active waves, capped at 12 total), a high-HP boss (4× health, 1.8× damage) that gates the reward chest, and a participation window for up to 5 winners. Difficulty rolls (easy / normal / hard / extreme) scale reward multipliers and combatant stats from a shared table. A Discord webhook fires the pre-alert so players can self-organize before the schedule passes.",
        myContribution:
          "the data-driven event catalog over hardcoded handlers (one runtime, N event types). The participation gate (boss must die before the reward unlocks) to prevent free-riding. The 4–12 hour cadence after the 1–2 hour default burned players out — a balance call only the production traffic could surface. The Discord webhook as a presence signal so the event has gravity before it spawns.",
        gallery: [
          {
            src: "/bettersmp/world-events-supply-drop.mp4",
            alt: "Supply Drop event — 20–30s clip: Discord-style pre-alert in chat, lime-glass arena marker appearing in open biome, first wave of zombies/skeletons/spiders, mini-boss zombie spawning, chest unlocking after boss death, top survivor opening reward",
            caption: "Supply Drop · full cycle",
            kind: "video",
          },
          {
            src: "/bettersmp/world-events-supply-drop-rewards.png",
            alt: "Reward chest opening screen — top survivor receives $25,000 + 80 shards + resource crate key; runners-up shown in side panel",
            caption: "Winner bonus",
          },
        ],
      },
      {
        // TODO assets:
        //   /bettersmp/elite-mobs-spawn.mp4 — 15s clip: player walking, compass HUD bossbar showing cardinal direction (N/S/E/W) → player turning, the direction string updating → finally finding the elite mob in the wild
        //   /bettersmp/elite-mobs-purchase-coords.png — PurchaseConfirmGui screenshot: another player offering coordinates for sale, confirmation dialog with price
        name: "ELITE Mobs",
        summary:
          "Information-as-currency as a feature. Rare named enemies spawn at random locations and drop tier-specific loot. The system only ever exposes a cardinal-direction hint (N/S/E/W) — not the exact coordinates — and pairs that with a confirmation-dialog primitive (PurchaseConfirmGui) that lets any player sell those coordinates to another for in-game currency. A two-sided market built on top of a positional-information asymmetry.",
        requestedBy: "the anti-idle thesis, made literal",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "A configurable spawn loop runs every 20 minutes (2 enemies per cycle, capped at 12 alive at once). Spawn distance is 48–14,750 blocks from the world center, retried up to 20 times if the picked location fails a habitability check. Four difficulty tiers (EASY / NORMAL / HARD / EXTREME) each have their own reward table and bonus-drop pool. Players who have already found one can list its exact coordinates for sale through PurchaseConfirmGui — both sides get an audit-log chat record. The cardinal-direction HUD renders as a BossBar (a server-pushed top-of-screen indicator), which is the only HUD primitive that works identically on Java and Bedrock (Minecraft's two client platforms) via the Geyser protocol bridge.",
        myContribution:
          "the cardinal-hint-only rule — the AI's first cut exposed exact coordinates and killed the game in two days. The coords-as-currency secondary market built on top of that asymmetry. The weighted spawn pool that biases toward harder tiers mid-week so weekend players don't catch a stale rotation. Choosing BossBar as the HUD primitive specifically because it's the one rendering path that survives the Java↔Bedrock split.",
        gallery: [
          {
            src: "/bettersmp/elite-mobs-spawn.mp4",
            alt: "ELITE mob hunt — 15s clip: wide third-person shot of player walking, BossBar HUD at top shows cardinal direction (N), player turns and direction updates in real time, finally finds the rare mob (e.g. named Zombie) glowing in the wild",
            caption: "Cardinal HUD · tracking",
            kind: "video",
          },
          {
            src: "/bettersmp/elite-mobs-purchase-coords.png",
            alt: "PurchaseConfirmGui screenshot — popup showing a seller's offer of exact ELITE mob coordinates, price in gold, confirm/cancel buttons",
            caption: "Coords-as-currency",
          },
        ],
      },
      {
        // TODO assets:
        //   /bettersmp/rpg-profession-menu.png — /rpg menu showing 3 profession cards (Miner, Hunter, Farmer) each with current tier, progress bar, and the "switch profession" CTA (greyed if no Better+)
        //   /bettersmp/rpg-quest-journal.png — open quest journal book showing the active T1 quest, target count, current progress
        //   /bettersmp/rpg-compass-bossbar.png — close-up of the BossBar at top of screen with the compass-style facing arrow toward the active quest target and the distance in blocks
        name: "RPG · Professions",
        summary:
          "A schema-driven RPG layer on top of the game. Three character classes (Miner / Hunter / Farmer), each with four tiers of YAML-declared quests, a trust state per (player, NPC) pair, a quest journal book, and a top-of-screen compass HUD that points at the active target. The quest catalogue has its own lint test in the test suite — because the AI kept silently regressing the schema between iterations.",
        requestedBy: "depth, not grind — and content that didn't break every time the AI touched it",
        shippedAt: "2026-05",
        version: "v1.0.0",
        details:
          "Each class runs T1 → T4 quest YAMLs validated by a real JUnit lint suite (QuestCatalogueLintTest, AdvanceKindHandlerCoverageTest, CropAllowlistCoverageTest). Quest types include SELL_VOLUME (polled every 5 seconds against the sell plugin's ledger), kill counts, gather counts, and NPC delivery. The compass HUD repaints every server tick (20 ticks/s) using `atan2` for facing and Euclidean distance — cheap enough to run for every online player concurrently. Trust state is keyed by the composite (player_uuid, npc_id) and gates higher-tier reward eligibility. Persistence flushes every 5 minutes plus on logout, with a Bukkit-tick UTC-midnight rollover poll mirroring the Global Missions plugin.",
        myContribution:
          "Cutting the brief from six classes to three was the right size for a 12-week launch — under-promise, ship, then expand. Trust-as-progression instead of XP-as-progression so the system has narrative gravity. The lint test suite was a direct response to the AI silently breaking the YAML schema mid-iteration — without it, the data is in flux and the game is unshippable. The Better+ discount on profession-switch as a soft monetization lane that doesn't gate gameplay.",
        gallery: [
          {
            src: "/bettersmp/rpg-profession-menu.png",
            alt: "Profession selection menu — three cards in a row: Miner (active, T2 in progress, progress bar 65%), Hunter (T1 active), Farmer (locked — switch cost shown). Better+ discount tag visible on the switch button.",
            caption: "/rpg menu",
          },
          {
            src: "/bettersmp/rpg-quest-journal.png",
            alt: "Quest journal book open — left page lists active Miner T1 quest with target (mine 64 deepslate), current progress (28/64), and reward summary. Right page shows tier requirements.",
            caption: "Quest journal",
          },
          {
            src: "/bettersmp/rpg-compass-bossbar.png",
            alt: "Screenshot framed on the top of the screen — BossBar shows compass arrow facing NE, distance text reads '142 blocks', quest title 'Find the abandoned mineshaft'",
            caption: "Compass HUD",
          },
        ],
      },
      {
        // TODO assets:
        //   /bettersmp/auction-house-listings.png — /ah main GUI with at least 6 active listings, search bar visible at top, category filter open
        //   /bettersmp/auction-house-my-listings.png — /ah my view: seller's own listings with cancel buttons
        //   /bettersmp/auction-house-history.png — /ah history view: past sales with timestamp, buyer, price
        name: "Auction House",
        summary:
          "A small player-to-player marketplace with a deliberately small DB. Players list items for sale, browse by category and substring, buy out instantly, and audit their own sales history. The schema is two tables, three named indexes, and integer cents for prices — picked one size below the obvious answer (SQLite over Postgres) because a 100-player server doesn't need the operational tail of a separate DB process.",
        requestedBy: "a marketplace primitive — without standing up Postgres for it",
        shippedAt: "2026-02",
        version: "v1.0.0",
        details:
          "Embedded SQLite via xerial sqlite-jdbc 3.51.2.0. Two tables: `listings` (id, seller_uuid, seller_name, price_cents, created_at as ISO-8601 TEXT, material, search_key, item_blob) and `sales` (same shape + sold_at as ISO-8601 TEXT). Three indexes, each named for the read it serves: `idx_listings_price` for the price-sorted browse, `idx_listings_search` for the substring match, `idx_listings_seller` for the per-seller view. Prices are stored as integer cents to avoid floating-point drift. Two real migrations live in the repo and ship versioned: epoch-ms → ISO-8601 TEXT for `created_at`, and `price` → `price_cents`. Payment goes through Vault (the standard economy API for Minecraft servers); shulker (a portable container item) listings hook into the read-only preview plugin so buyers can inspect the bagged inventory before paying.",
        myContribution:
          "Picking SQLite over Postgres — a 100-player server doesn't need the operational cost of a separate DB process; the embedded option ships in one JAR. Integer cents over floating-point was caught before deploy when the AI's draft used doubles for prices. Naming the indexes after the reads they serve, not the columns, so future me knows what they're for. Two real migrations because I changed my mind on storage shape — both versioned, both replayable.",
        gallery: [
          {
            src: "/bettersmp/auction-house-listings.png",
            alt: "Auction House main GUI — full grid with at least 8 player-listed items visible (mix of armor, tools, blocks), search bar focused at top, category filter dropdown open showing material categories",
            caption: "/ah · browse",
          },
          {
            src: "/bettersmp/auction-house-my-listings.png",
            alt: "Auction House 'my listings' view — seller's own 4 active listings shown with price, time remaining, and cancel button per row",
            caption: "/ah my",
          },
          {
            src: "/bettersmp/auction-house-history.png",
            alt: "Auction House sales history view — list of completed sales with date/time, buyer name, item, sale price",
            caption: "/ah history",
          },
        ],
      },
      {
        // TODO assets:
        //   /bettersmp/global-missions-toast.png — title + chat toast shown on first login of the day announcing the new daily community mission
        //   /bettersmp/global-missions-menu.png — /globalmission GUI showing the day's mission card, server-wide progress bar, contributors leaderboard
        name: "Global Missions",
        summary:
          "A daily community goal where feedback rate is a load-bearing concern. One mission per UTC day, shared target across all online players, tier-weighted (15 / 30 / 55) so the difficulty distribution feels right over a week. Progress is broadcast to players through a rate-limited action-bar (one line above the hotbar) so the same event-emitting code doesn't melt the user's screen when six players sell items in the same second.",
        requestedBy: "a daily reason to log in — and a stress test for our event throttling",
        shippedAt: "2026-03",
        version: "v1.0.0",
        details:
          "UTC rollover is polled every server second (20 ticks). Dirty progress is flushed to disk every 30 seconds. The user-facing feedback channel — the action-bar — is throttled to one message per player per 5 seconds, because the same progress event can be triggered by every market sale and would otherwise produce a flicker storm. Reminders: a title-card toast on the first login of the day, and a periodic action-bar every 60 minutes if your contribution is still zero. Mission catalog and contributors leaderboard are exposed through PlaceholderAPI (the standard interop layer for Minecraft HUD plugins) so any HUD can render them without coupling.",
        myContribution:
          "The throttle constants — the AI's defaults flickered the action-bar with six concurrent players online; I wrote the 5-second cooldown into the spec before the next prompt. Tier weights tuned over a week of production data. Choosing server-wide over per-player was the design call: the social pressure of seeing the shared progress is the actual feature, not the reward.",
        gallery: [
          {
            src: "/bettersmp/global-missions-toast.png",
            alt: "First-login title screen — large 'Daily Mission' title across the top, chat-style toast below describing the day's mission (e.g. 'Server goal: 10,000 wheat sold to shops'), reward summary",
            caption: "join toast",
          },
          {
            src: "/bettersmp/global-missions-menu.png",
            alt: "Global mission GUI — single mission card at the top with target text and tier badge (T3), a server-wide progress bar showing % complete, leaderboard of top 5 contributors below",
            caption: "/globalmission",
          },
        ],
      },
      {
        name: "Pets",
        summary:
          "Cosmetic companions enforced by listener cancellation, not by docs. 15 entries in the V1 catalog, each a vanilla game entity (bee, wolf, fox, etc.) with every harmful interaction it could normally produce — taking damage, dropping items, attacking players, burning, changing blocks — cancelled at the highest-priority hook. The cosmetic-only contract is a code-level invariant, not a configuration toggle.",
        requestedBy: "the line we wouldn't cross on monetization — and a contract the runtime enforces",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "Pet entities are standard game mobs registered through PetService with seven interaction listeners cancelled at HIGHEST priority: EntityDamageEvent, EntityDamageByEntityEvent, EntityChangeBlockEvent, EntityCombustEvent, EntityPotionEffectEvent, EntityDropItemEvent, EntityDeathEvent. They despawn on quit, refresh on join and respawn, scale and float-offset are per-entry config. The Better+ Pup is the only entitlement-locked pet (gated by the subscription plugin's state, not by a separate purchase path). Storefront integration with Tebex (the de-facto Minecraft monetization SaaS) is intentionally kept off — the cosmetic catalog is the only paid surface, the system isn't shaped for upsell.",
        myContribution:
          "The cosmetic-only contract is enforced at the listener layer, not documented as a rule — docs aren't enforcement, code is. The 15-pet catalog is keyed by biome variety, not rarity tiers, so there's no fake scarcity selling pressure. The choice to keep Tebex integration off the paid path: the system has no upsell surface beyond cosmetics, by design.",
        gallery: [
          { src: "/bettersmp/pet-better-pup.png", alt: "Better+ Pup pet — small pale wolf companion (baby, scale 0.72) following the player at ground level. Better+ entitlement icon visible.", caption: "Better+ Pup" },
          { src: "/bettersmp/pet-mini-enderman.png", alt: "Mini Enderman pet — half-scale (0.5) Enderman following silently behind the player", caption: "Mini Enderman" },
          { src: "/bettersmp/pet-red-parrot.png", alt: "Red Parrot pet — floating red-variant parrot at scale 0.9, height-offset 0.95 (shoulder height)", caption: "Red Parrot" },
          { src: "/bettersmp/pet-baby-axolotl.png", alt: "Baby Axolotl pet — baby axolotl companion at scale 0.85", caption: "Baby Axolotl" },
          { src: "/bettersmp/pet-forest-fox.png", alt: "Forest Fox pet — baby red-variant fox at scale 0.72, trotting beside the player", caption: "Forest Fox" },
          { src: "/bettersmp/pet-mini-bee.png", alt: "Mini Bee pet — baby bee floating at shoulder height, scale 0.65, height-offset 0.95", caption: "Mini Bee" },
        ],
      },
      {
        // TODO assets:
        //   /bettersmp/pvp-duel-menu.png — /duel menu GUI showing queue options (Classic / Kit), arena pool, current top 5 stats
        //   /bettersmp/pvp-kit-duel.mp4 — 30s clip: two players accept a Kit Duel, teleport into the arena, fight, loser dies, 60s loot window opens, winner leaves early or claims
        name: "PvP · Duels",
        summary:
          "Player-vs-player duels modeled as a transactional pattern. Entry snapshots the player's full inventory and restores it on exit — so a Kit Duel always fights with the kit, not with real gear smuggled in. A queue, an arena pool (protected by WorldGuard, the standard region-protection plugin), two modes (Classic and Kit), mutual surrender, a 60-second loot window after the kill, per-mode leaderboards. Win/loss stats are tracked separately per mode so the metric doesn't pollute across rule sets.",
        requestedBy: "a duel system where the game-mode contract is enforced, not trusted",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "`/duel` opens the menu, `/duel top [kit]` shows the leaderboard, `/duel stats [player]` is the per-mode K/D. On entry, the player's inventory is snapshotted and replaced with the kit (Kit mode) or kept (Classic mode); on exit, the snapshot is restored unconditionally — even on disconnect mid-fight, even on crash. The loot window is exactly 60 seconds: the loser's dropped items stay on the ground for that window and only the winning player can pick them up. The duration tuned in production: 45s left losers angry, 90s let winners camp. Win/loss and elo-style stats are tracked separately per mode so a Classic-mode top player isn't shoved into the Kit leaderboard.",
        myContribution:
          "Treating entry/exit as a transaction with explicit snapshot/restore — the AI's first cut trusted the entry kit and players brought their real gear into Kit Duels. The 60-second loot window as a tuned constant, not a default. Per-mode stat partitioning so the leaderboard tracks the rule set, not the player. Restore-on-disconnect because Minecraft network drops are real and the worst version of a fight system is the one that costs you your inventory.",
        gallery: [
          {
            src: "/bettersmp/pvp-duel-menu.png",
            alt: "Duel menu GUI — two large mode cards (Classic and Kit Duel), queue button, arena pool indicator, current top 5 leaderboard preview at the bottom",
            caption: "/duel",
          },
          {
            src: "/bettersmp/pvp-kit-duel.mp4",
            alt: "Kit Duel match — 30s clip: two players accept a duel from the menu, teleport into a stone-walled arena, fight with identical kit gear (no real inventory), one dies, 60s loot window timer appears on the BossBar, winner walks to drops",
            caption: "Kit Duel · full match",
            kind: "video",
          },
        ],
      },
      {
        // TODO assets:
        //   /bettersmp/better-plus-status.png — /better+ status command output in chat: subscription state, expiry, perks list (homes 4-5, 50% RPG switch discount, Better+ chat suffix, Better+ Pup pet access)
        //   /bettersmp/better-plus-chat-suffix.png — chat screenshot showing a Better+ subscriber's message with the suffix tag rendered after their name
        name: "Better+",
        summary:
          "The subscription tier built as a three-tier ownership separation. Payment lives in Tebex (the de-facto Minecraft billing SaaS); entitlement state lives in the player-log plugin (the system of record for everything entitlement-related); this plugin is the read-only consumer that turns active state into feature behavior. Expiring a subscription rolls back access, never data.",
        requestedBy: "monetization that respected the no-pay-to-win rule",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "Active subscribers get a 50% discount on profession-switch costs in the RPG plugin (`profession-switch-discount: 0.5`), unlock two extra home slots, get a Better+ chat suffix, and gain access to the Better+ Pup cosmetic. The extra home slots are guarded at teleport time: if a subscription expires, those homes are not deleted — the data is preserved, only the teleport-in is blocked until the subscription renews. Tab-list prefix is prepended through the LuckPerms (the standard permissions plugin) group state.",
        myContribution:
          "The no-rugpull rule on expired data — the AI's first draft just deleted the extra homes when a subscription lapsed; that would have been the worst possible community message. Three-tier ownership: Tebex owns payment, player-log owns state, this plugin owns feature behavior. None of them know about the others' internals. Discount-not-bonus design for RPG: subscribers get a cheaper switch, not a stronger character — paid perks change the cost curve, never the win condition.",
        gallery: [
          {
            src: "/bettersmp/better-plus-status.png",
            alt: "/better+ status output in chat — message block showing 'Active', expiry date 'expires 2026-06-12', perks list (homes 4-5 unlocked, 50% RPG switch discount, Better+ Pup, Better+ chat suffix)",
            caption: "/better+ status",
          },
          {
            src: "/bettersmp/better-plus-chat-suffix.png",
            alt: "In-game chat screenshot — three messages from different players, the Better+ subscriber's name rendered with the [b+] suffix in subtle blue, others without",
            caption: "chat suffix",
          },
        ],
      },
      {
        // TODO assets:
        //   /bettersmp/shards-balance.png — /shards command output in chat: balance, earn rate per minute, link to crates menu
        //   /bettersmp/shards-crates.png — /shardcrates GUI: grid of crate types with shard price, sample loot preview
        name: "Shards",
        summary:
          "A second, deliberately non-tradeable currency. Players earn it passively (per minute online) and spend it on crates and spawner purchases. Sits beside the primary tradeable currency without ever crossing into it — there is no `/shards pay`, no transfer, no listing. The arbitrage between the slot-machine economy and the marketplace economy is closed by design.",
        requestedBy: "a chance-economy currency that doesn't mix with the marketplace",
        shippedAt: "2026-03",
        version: "v1.0.0",
        details:
          "Earn rate is per-player, gated by a default-true permission (`bettersmpshards.earn`); ops can flip `bettersmpshards.noearn` on a per-account basis to exclude bots without touching the earn loop. Balances live in the plugin's own SQLite, exposed through PlaceholderAPI so any HUD can render them. Crate and spawner purchases use Vault for the primary-currency side and the shards balance for the shards side — two distinct ledgers, no rate between them. `/shards crates` and `/shardcrates` are aliases for the same shop GUI.",
        myContribution:
          "The non-tradeable rule — keeps the chance economy from arbitraging against the marketplace. Two separate ledgers (currency and shards) so the slot-machine pool and the player-to-player market never compete for the same gold sink. The earn permission as the only ops-touchable knob: bots get excluded with a single grant, the earn loop itself doesn't need to know.",
        gallery: [
          {
            src: "/bettersmp/shards-balance.png",
            alt: "/shards chat output — shard balance number (e.g. 1,240), 'earning 0.5/min' line under it, hint to use /shardcrates",
            caption: "/shards",
          },
          {
            src: "/bettersmp/shards-crates.png",
            alt: "/shardcrates GUI — 9-slot grid of crate types (Common, Resource, Rare, Epic), each showing the shard price tag and a preview of one possible loot item; sample loot panel on the right",
            caption: "/shardcrates",
          },
        ],
      },
      {
        // TODO assets:
        //   /bettersmp/onboarding-bossbar.png — close-up of the screen top: BossBar shows current step ("Welcome Hub"), hint text below ("Head to the Welcome to BetterSMP hologram at spawn center"), phase label "Core" on the side
        //   /bettersmp/onboarding-tour.mp4 — 20–30s clip: new player joining, BossBar appearing after a 3-second delay, walking to the welcome hologram, REACH_RADIUS triggering, "Objective complete" title fading in, next step appearing with new objective
        name: "Onboarding",
        summary:
          "First-run experience built as an explicit state machine. New players walk a two-tour funnel: a Core tour rewards a starter kit (gear + currency); an optional Extras tour rewards crate keys. Each step has one of six advance types — proximity, command, NPC interaction, daily-mission completion, vote confirmation — so the same engine drives every step transition. The state machine has explicit recovery paths: `/onboarding stuck` escalates to staff, `/onboardingadmin` lets ops reset or jump a player's step.",
        requestedBy: "the funnel decides retention — and it has to survive a player getting stuck",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "Six step advance types declared in YAML: REACH_RADIUS (enter a sphere), COMMAND_THEN_TELEPORT (run a command and be teleported out), COMMAND_PREFIX (run any of a command list), NPC_CLICK (right-click a Citizens NPC — Citizens is the standard NPC plugin), DAILY_COMPLETE (close any daily mission), VOTE_CAST (a vote confirmed by NuVotifier). The HUD repaints every 15 ticks (0.75s). A 5-second grace window after a step becomes active prevents chain-completion — without it, a stationary player could complete step N and step N+1 in the same frame. The starter kit is delivered through the compensation plugin so every grant is audit-logged; if delivery fails for any reason, the player's progress is preserved and an op-tier alert is dispatched.",
        myContribution:
          "The 5-second grace window — the AI's first cut completed step N and N+1 in one frame because both passed their predicates simultaneously; without the grace window the state machine has no causal ordering. Splitting Core (starter kit) from Extras (crate keys) so the foundational reward isn't gated behind 30 minutes of demos. The `kit-failed` escalation path because losing your kit on minute one is the worst possible first impression — the system has to fail loudly when it fails at all.",
        gallery: [
          {
            src: "/bettersmp/onboarding-bossbar.png",
            alt: "Top-of-screen close-up — BossBar shows current step title 'Welcome Hub', hint text below ('Head to the Welcome to BetterSMP hologram at spawn center'), small phase label 'Core' on the right, no other HUD chrome",
            caption: "BossBar HUD",
          },
          {
            src: "/bettersmp/onboarding-tour.mp4",
            alt: "New player onboarding — 20–30s clip: player joins spawn, 3s delay, BossBar fades in with first step, player walks to the holographic 'Welcome to BetterSMP' sign, REACH_RADIUS triggers, 'Objective complete' title fades in, next step text appears on the BossBar",
            caption: "Core tour · first steps",
            kind: "video",
          },
        ],
      },
      {
        // TODO assets:
        //   /bettersmp/tools-pickaxe-tooltip.png — Better Pickaxe item in inventory with the full tooltip showing: dark-purple bold name, enchant list, NBT (op-visible) confirming the PDC id "bettersmp_pickaxe"
        //   /bettersmp/tools-vein-mining.mp4 — 10–15s clip: player with Better Axe in hand breaks the bottom log of an oak tree, cascade breaks remaining logs (up to 64), every block drops at the player's feet, sound + particle feedback on each break
        name: "Tools · Better Pickaxe / Shovel / Axe",
        summary:
          "Three custom items whose identity is enforced by typed metadata, not by their display name. After the security sweep showed that string-matching item names is a class of exploit (players can rename items in-game using an anvil), every custom item on the server moved to identity-by-PersistentDataContainer — a Bukkit-API mechanism for attaching typed, server-only metadata to items. The axe also implements bounded vein-mining: one swing fells up to 64 connected logs of the same species, with a single durability tick for the whole chain.",
        requestedBy: "custom items that survive the rename attack — and a worked example of the PDC pattern across the codebase",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "Tools are minted via `/givetools <player> <pickaxe|shovel|axe>` (op-only). Each tool's identity is a PersistentDataContainer key (`bettersmp_pickaxe`, `bettersmp_shovel`, `bettersmp_axe`) written on creation — the same defensive pattern applied to the portal blocks after the 2026-04-26 security sweep. The use permission is `bettersmp.tools.use`, default true; the identity check is PDC-first with no display-name or lore fallback for newly minted items. Vein-mining walks the contiguous log graph from the break point up to `MAX_LOGS = 64`, gated by an EnumSet of accepted log materials, and yields all drops at the original block. Durability damage applies once per chain, not per log.",
        myContribution:
          "PDC-only identity as a rule across the codebase — not just here. After the security sweep, every custom item that could be renamed needed to move off display-name identity. The 64-log cap on vein mining is the difference between a useful tool and a server-stall: a chunk-spanning jungle tree without the cap chokes the main thread. Durability-once-per-chain because charging per log made the tool break in two trees and broke the gameplay loop.",
        gallery: [
          {
            src: "/bettersmp/tools-pickaxe-tooltip.png",
            alt: "Inventory close-up — Better Pickaxe item hovered, tooltip shows dark-purple bold 'Better Pickaxe' name, enchant list (Efficiency / Unbreaking / Fortune), and the PDC id 'bettersmp_pickaxe' visible via F3+H (op view)",
            caption: "Better Pickaxe · PDC identity",
          },
          {
            src: "/bettersmp/tools-vein-mining.mp4",
            alt: "Vein mining demo — 10–15s clip: player holds Better Axe, faces the bottom log of an oak tree, breaks it; cascade fells the entire trunk (up to 64 logs), drops collect at the player's feet, single durability tick on the axe",
            caption: "Better Axe · vein mining",
            kind: "video",
          },
        ],
      },
      {
        // TODO assets:
        //   /bettersmp/cosmetic-tags-menu.png — /tags GUI: "None" slot + 3 unlocked tags (e.g. [ALPHA GOD], [Event Winner], [active_streak]), currently selected one highlighted
        //   /bettersmp/cosmetic-tags-chat.png — in-game chat with three messages from different players, one with the [ALPHA GOD] prefix in gold-bold, another with [active_streak], one plain
        name: "Cosmetic Tags",
        summary:
          "Player-visible progression rewards rendered as chat and tab-list tags — with a strict invariant: one tag displayed per player at a time, no chat-color creep. Includes an automatic activity tag wired to consecutive-day logins (timezone-aware), and an auto-equip hook so when a player ticks up a tier in the RPG plugin, the corresponding tag is granted and displayed without an extra step.",
        requestedBy: "progression has to be visible to other players, not just in a menu",
        shippedAt: "2026-03",
        version: "v1.0.0",
        details:
          "Tags are defined in config (id → prefix / suffix). Per-player state lives in `players/<uuid>.yml`: an unlocked list plus a single currently-selected tag. The activity tag rule: three consecutive days online (timezone-aware, default `America/Sao_Paulo` so a 23:55 login the night before is the same calendar day from the user's perspective) unlocks or maintains `active_streak`; a missed day removes it on next login and the streak counter resets. Renders through the TAB plugin (the standard tab-list rendering plugin) and PlaceholderAPI for HUDs. Auto-equipped on RPG tier-up through a cross-plugin hook published by the cosmetic-tags service.",
        myContribution:
          "One-tag-at-a-time as a hard rule — multi-tag turned every player name into a wall of prefixes that nobody read. Timezone-aware consecutive-day logic so streaks reflect the user's local day, not server UTC (the kind of bug that makes a daily-reward system feel arbitrary). Auto-equip on RPG tier-up via a cross-plugin hook so progression has visible payoff without making the player remember to switch.",
        gallery: [
          {
            src: "/bettersmp/cosmetic-tags-menu.png",
            alt: "/tags GUI — 9-slot inventory menu: 'None' slot in position 0, three unlocked tag slots ([ALPHA GOD] in gold bold, [Event Winner] in green, [active_streak] in aqua), currently selected tag highlighted with an enchant glint",
            caption: "/tags",
          },
          {
            src: "/bettersmp/cosmetic-tags-chat.png",
            alt: "In-game chat screenshot — three player messages: one with [ALPHA GOD] gold-bold prefix, one with [active_streak] aqua prefix, one plain. Tab list on the side shows the same prefixes against player names.",
            caption: "tag rendering",
          },
        ],
      },
      {
        // TODO assets:
        //   /bettersmp/shulker-preview-rightclick.mp4 — 8–12s clip: player opens inventory, right-clicks a shulker box (NOT placing it), read-only preview GUI opens showing the shulker's 27 slots, closes on Esc
        //   /bettersmp/shulker-preview-ah-confirm.png — Auction House buy confirmation screen with a shulker listing: the shulker's contents shown inline (grid of 27 items) above the confirm/cancel buttons
        name: "Shulker Preview",
        summary:
          "A read-only inventory view, built as a holder-tagged inventory with intercept-and-cancel on every take. Right-clicking a shulker box (a portable container item) in your inventory opens its 27 slots inline without placing it. Integrated with the Auction House: every shulker listing renders its contents on the buy-confirm screen, so buyers see what they're paying for before they pay.",
        requestedBy: "the marketplace only works if buyers can see what they're buying",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "Inventory right-click is detected via `ShulkerPreviewListener` with an `InventoryType.CHEST` guard (the same defensive pattern hardened across the codebase after the 2026-04-26 security sweep). `/shulkerpreview` is the mobile fallback for Bedrock clients, which can't right-click items in inventory. The preview is a `ShulkerPreviewHolder`-tagged inventory: every take/move operation on it is intercepted in the listener and cancelled before it commits — the preview is enforced read-only at the listener layer, not at the UI layer. The Auction House plugin calls the same service for its buy-confirm GUI so a shulker listing is never an opaque purchase.",
        myContribution:
          "Read-only via holder, enforced at the listener layer. The AI's first draft opened the real shulker — a 30-second item-duplication vector, because what's read-only in the UI is read-write in the underlying inventory if nothing intercepts the take operation. The Auction House integration closes the trust loop on shulker listings (the marketplace doesn't work without it). The mobile `/shulkerpreview` fallback because Bedrock clients were the loudest about wanting feature parity with Java.",
        gallery: [
          {
            src: "/bettersmp/shulker-preview-rightclick.mp4",
            alt: "Inventory preview demo — 8–12s clip: player opens inventory, hovers a red shulker box, right-clicks it (no placement), a read-only 27-slot preview GUI opens labeled 'Shulker Preview', player tries to take an item (cancelled), closes with Esc",
            caption: "right-click preview",
            kind: "video",
          },
          {
            src: "/bettersmp/shulker-preview-ah-confirm.png",
            alt: "Auction House buy-confirm screen — top half shows the shulker listing (item icon + seller + price), middle inline panel shows the shulker's full 27-slot contents (grid of items), bottom row has Confirm and Cancel buttons",
            caption: "AH · inline preview",
          },
        ],
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
