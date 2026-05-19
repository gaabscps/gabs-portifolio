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
        body: "Purpur (1.21.x) on a Bloom Host panel, Geyser + Floodgate for Bedrock. First two custom plugins drafted: BetterSMPAuctionHouse and BetterSMPEconomy. Spigot has a lot of ceremony — <ai>AI</ai> wrote every line, I wrote the plugin.yml permissions and what each command was allowed to do.",
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
      "I don't know Java. I never have. What I know is how to write the architecture, an observability plan, a test plan, and the scope of a thing — and how to stop AI when it's about to ship something that'll break in production. The biggest rollback came from one thing: I trusted Claude's defaults for security-adjacent code (a string-match on inventory titles, a console-dispatch with <ai>player.getName()</ai> in it) without writing what \"safe\" had to mean. Six exploits landed in one community-test pass and shipped in one sweep. Now I write the acceptance criteria for any listener that touches money, items, or permissions before the first prompt — InventoryType guards, PersistentDataContainer for item identity, charge-before-action ordering. The rest is just typing.",
    plugins: [
      {
        // TODO assets:
        //   /bettersmp/world-events-supply-drop.mp4 — 20–30s clip: pre-alert message in chat → arena materializing in open biome (lime glass marker → emerald base) → first wave of zombies/skeletons/spiders spawning at 30s interval → mini-boss zombie appearing → chest unlocking, top survivor opens it
        //   /bettersmp/world-events-supply-drop-rewards.png — winner reward screen showing $25,000 + 80 shards + "resource" crate key
        name: "World Events · Supply Drop",
        summary:
          "Random server-wide event every 4–12 hours. A protected arena materializes in the open world, mob waves spawn on a 30-second tick, a mini-boss locks the reward chest until it dies, top 5 survivors get tier-2 rewards, the player who cracks the chest gets the headline drop.",
        requestedBy: "the weekly hype moment",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "Scheduler runs a 30-second poll; between min-delay-minutes: 240 and max-delay-minutes: 720 a new event is drawn. Spawn location is random within a 14,750-block radius from world center with a 250-block border margin. Waves: 30s interval, 6 mobs per wave (Zombie/Skeleton/Spider), max 2 active waves, capped at 12 total. Mini-boss is a 4× health, 1.8× damage Zombie that has to die before the chest unlocks. Difficulty rolls (easy/normal/hard/extreme) scale reward multipliers and mob stats. Base reward is $15,000 + 20 shards; winner bonus is $25,000 + 80 shards + a resource crate key. Discord webhook fires the pre-alert.",
        myContribution:
          "the survive-then-race mechanic, the difficulty/reward multiplier curve, the 4–12 hour cadence (not 1–2 — players were burning out), the Discord pre-alert as a presence signal.",
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
          "Rare named mobs spawn anywhere on the world map and drop tier-specific loot. Players only see a cardinal-direction hint — N/S/E/W — and have to walk it down. Whoever finds one first can sell the exact coordinates on the GUI to anyone else: information is currency.",
        requestedBy: "the anti-AFK thesis, made literal",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "Configurable spawn loop (default: every 20 minutes, 2 mobs per cycle, capped at 12 alive). Spawn distance 48–14,750 blocks from spawn, retried up to 20 times if the picked location fails a safety check. Four tiers (EASY / NORMAL / HARD / EXTREME), each with its own reward table and bonus drops. Players who already saw one can list its coordinates for sale via PurchaseConfirmGui — buyer pays, both get a chat record. The cardinal HUD is rendered as a BossBar so it works for Bedrock players via Geyser too.",
        myContribution:
          "the cardinal-hint-only rule (Claude's first cut showed exact coords — that killed the game), the coords-as-currency secondary market, the weighted spawn pool that biases toward HARD mid-week.",
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
          "Three professions live (Miner, Hunter, Farmer), each with four tiers of quests, NPC pedestals you build trust with, a quest journal book, and a BossBar compass HUD that points at the active target. Switching profession is paid — Better+ subscribers get 50% off.",
        requestedBy: "depth, not grind",
        shippedAt: "2026-05",
        version: "v1.0.0",
        details:
          "Each profession runs T1 → T4 quest YAMLs (validated by a real lint test — QuestCatalogueLintTest — because Claude kept silently breaking the schema). Quest types include SELL_VOLUME (polled every 5 seconds against BetterSMPSell), kill counts, gather counts, and NPC delivery. The compass HUD repaints every server tick (20 ticks/s) with distance and atan2 facing — cheap enough to run for every online player. Trust per (player, npc) pair caps at a configurable ceiling and gates higher-tier rewards. Persistence flushes every 5 minutes plus on logout.",
        myContribution:
          "the three-profession cut (started with six in the brief — three was the right size for a 12-week launch), trust-as-progression, the test suite that stopped quest config regressions, the Better+ discount as a soft monetization lane.",
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
          "Server-wide buyout marketplace backed by SQLite. /ah to browse, /ah sell <price> to list, /ah my to manage your listings, /ah history to see what's sold. Vault for payments, BetterSMPShulkerPreview integration so buyers can inspect shulker contents before they buy.",
        requestedBy: "to replace shouting prices in chat",
        shippedAt: "2026-02",
        version: "v1.0.0",
        details:
          "SQLite via xerial sqlite-jdbc 3.51.2.0. Two tables: listings (id, seller_uuid, seller_name, price_cents, created_at as ISO-8601 TEXT, material, search_key, item_blob) and sales (sold_at as ISO-8601 TEXT). Three indexes — idx_listings_price for the sort, idx_listings_search for the substring match, idx_listings_seller for /ah my. Prices stored as integer cents to avoid floating-point drift. Two real migrations live in the repo: epoch-ms → ISO-8601 TEXT for created_at, and price → price_cents.",
        myContribution:
          "the integer-cents rule (Claude wrote it as a double — caught it before deploy), the three-index choice, accepting that a server with 200 players doesn't need Postgres, the two migrations after I changed my mind on the storage shape.",
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
          "One server-wide community mission per UTC day. Everyone contributes to the same target, everyone shares the same reward when it clears. Tier-weighted (15 / 30 / 55) so easy days come up just often enough to feel doable, hard days feel like a real event.",
        requestedBy: "a daily reason to log in that didn't depend on grinding alone",
        shippedAt: "2026-03",
        version: "v1.0.0",
        details:
          "UTC rollover polled every server second (utc-rollover-check-ticks: 20). Progress flushed to disk every 30 seconds, action-bar feedback throttled to 5s per player to stop chat flicker. Reminders: join toast on first login of the day, periodic action-bar every 60 minutes if your contribution is still zero. Mission catalog and contributors leaderboard rendered through PlaceholderAPI so any HUD plugin can pick them up.",
        myContribution:
          "the throttle constants (Claude's defaults flickered the action-bar with 6 players online), the tier weights, the deliberate choice to keep this server-wide instead of per-player — the social pressure is the feature.",
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
          "Server-exclusive cosmetic companions — 15 in the V1 catalog, from Mini Bee to Better+ Pup. They follow you, despawn on /home, can't attack, drop items, change blocks, take damage, or carry potion effects. The monetization lane on the server, by design.",
        requestedBy: "the line we wouldn't cross on monetization",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "Pet entities are vanilla mobs (BEE, WOLF, FOX, AXOLOTL, PARROT, etc.) registered through PetService with every harmful interaction listener cancelled at HIGHEST priority — EntityDamageEvent, EntityDamageByEntityEvent, EntityChangeBlockEvent, EntityCombustEvent, EntityPotionEffectEvent, EntityDropItemEvent, EntityDeathEvent. They despawn on quit, refresh on join and respawn, scale and float-offset are per-entry config. Better+ Pup is the only entitlement-locked pet (gated by BetterSMPBetterPlus subscription state).",
        myContribution:
          "the cosmetic-only rule and the fact it's enforced by cancelled listeners, not just docs. The 15-pet catalog targeted at biome variety, not rarity tiers. Tebex integration intentionally kept off — no pay-to-win, no exceptions.",
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
          "Unranked duel system with a queue, an arena pool, two modes (Classic and Kit), automatic inventory backup on entry, mutual surrender, a 60-second loot window after the kill, and per-mode win/loss stats. WorldGuard handles the arena protection.",
        requestedBy: "a fight system that didn't ruin your real inventory",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "/duel opens the menu, /duel top [kit] shows the leaderboard, /duel stats [player] is the per-mode K/D. Entry snapshots the player's inventory before the teleport so a Kit Duel always uses the kit (no smuggling enchanted netherite into a stone-tools duel). Loot window is exactly 60 seconds — the loser's dropped items stay for that long and only the winner can pick them up. Win/loss and elo-style stats are tracked separately per mode.",
        myContribution:
          "the inventory backup rule (Claude's first draft trusted the entry kit — players brought their real gear), the 60s loot window (45s left losers angry, 90s let winners camp), separate stats per mode so Classic Sword Player ≠ Kit Player.",
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
          "The subscription tier. Tebex handles the payment side, BetterSMPPlayerLog owns the entitlement state, and this plugin reads it. Active subscribers unlock homes 4 and 5, a chat suffix, the Better+ Pup pet, and a 50% discount on RPG profession switches. Expired subscribers lose the perks cleanly — no rugpull on the homes' contents.",
        requestedBy: "monetization that respected the no-pay-to-win rule",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "profession-switch-discount: 0.5 (50% off RPG switch costs while active, full price otherwise). Home 4/5 teleport guard: if Better+ expires, those homes block teleport-in instead of being deleted — you keep the data, you just can't visit until you renew. Tab list grouping prepends a better-plus prefix when the LuckPerms group is active.",
        myContribution:
          "the no-rugpull rule on expired homes (Claude's draft just deleted them — community would have lynched me), the chat suffix instead of a chat color (less aggressive), the discount-not-bonus design for RPG (active perk, not stacking advantage).",
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
          "The second currency. Earned passively (per minute online, bot accounts excluded), spent on crates and spawner purchases. Sits beside gold instead of replacing it — gold is for trade, shards are for the chance economy.",
        requestedBy: "a slow-burn currency that wasn't tradeable",
        shippedAt: "2026-03",
        version: "v1.0.0",
        details:
          "Earn rate is per-player, default-true permission (bettersmpshards.earn), with bettersmpshards.noearn for ops to exclude bots. Balances live in the plugin's own DB, exposed through PlaceholderAPI for HUDs. Crates and spawner shop use Vault for the gold side and the shards balance for the shards side. /shards crates and /shardcrates are aliases for the same GUI.",
        myContribution:
          "the deliberate non-tradeable rule (no /shards pay — keeps the inflation curve flat), separating crates from gold so the AH doesn't trade against the slot-machine economy, the bot-exclusion permission as the only ops-touchable knob.",
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
          "Two-tour funnel for new players. Core tour rewards a starter kit (gear + cash + shards); the optional Extras tour rewards crate keys. A BossBar HUD chases the next step in real time. /onboarding stuck escalates to staff, /onboardingadmin can reset or jump steps for support cases.",
        requestedBy: "the funnel decides retention — players don't read rules, they follow the arrow",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "Step types: REACH_RADIUS (enter a sphere), COMMAND_THEN_TELEPORT (run a command and get RTP'd out), COMMAND_PREFIX (one of a command list), NPC_CLICK (right-click a Citizens NPC), DAILY_COMPLETE (any daily mission), VOTE_CAST (NuVotifier confirms). HUD refreshes every 15 ticks (0.75s). A 5-second grace window after a step becomes active prevents chain-completion when a player stands still. Starter kit is delivered through BetterSMPCompensation so the grant is auditable; if delivery fails, progress is saved and staff is paged with kit-failed.",
        myContribution:
          "the 5-second grace window (Claude's first cut completed step N and N+1 in one frame), the two-tour split so the starter kit isn't gated behind 30 minutes of demos, the kit-failed escalation path because losing your kit on minute one is the worst possible first impression.",
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
          "Three custom Netherite tools (Pickaxe / Shovel / Axe) granted as RPG-tier or admin rewards. Identity lives on a PersistentDataContainer key (bettersmp_pickaxe / shovel / axe), never on name or lore — so anvil renames cannot fake one. The axe vein-mines logs up to 64 in a single break.",
        requestedBy: "items that feel earned, not dropped",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "Tools are minted via /givetools <player> <pickaxe|shovel|axe> (op-only). Each tool's id is written into a PersistentDataContainer key — same defensive pattern as the post-2026-04-26 portal blocks. The use permission is bettersmp.tools.use, default true; identity check is PDC-first with no name/lore fallback for new items. Axe vein-mining walks the contiguous log graph up to MAX_LOGS = 64 with an EnumSet of accepted log materials, then yields drops at the original block. Durability damage applies once per chain.",
        myContribution:
          "the PDC-only identity rule (anvil renames cannot promote a regular pickaxe), the 64-log cap on vein mining so a chunk-spanning jungle tree doesn't lag the server, durability-once-per-chain because charging per log made the tool break in two trees.",
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
          "Chat and tab-list tags as rewards. Staff grants a tag via /tags give <player> <tag_id>; the player opens /tags and picks which to display (or 'None'). An auto activity tag tracks consecutive daily logins — miss a day, it's removed; three days back-to-back, it's re-granted. No LuckPerms groups, no chat-color creep — a single tag per player at a time.",
        requestedBy: "progression has to be visible to other players, not just in a menu",
        shippedAt: "2026-03",
        version: "v1.0.0",
        details:
          "Tags defined in config (id → prefix/suffix). Per-player state in players/<uuid>.yml: unlocked list + currently selected. Activity tag rule: 3 consecutive days online (timezone-aware, default America/Sao_Paulo) unlocks/keeps active_streak; a missed day removes it on the next login and the streak restarts. Integrates with TAB plugin for tab-list rendering and PlaceholderAPI for HUDs. Auto-equipped on RPG tier-up via the cosmetic-tags hook.",
        myContribution:
          "single-tag-at-a-time rule (multi-tag turned every name into a wall of prefixes), the consecutive-days reset logic for the activity tag so streaks mean something, the auto-equip on RPG tier-up so players don't have to remember to switch.",
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
          "Right-click any shulker box in your inventory (or run /shulkerpreview with one in main hand on mobile) to inspect its contents — read-only, no placing required. Integrated with the Auction House: shulker listings show their inside on the buy-confirm screen.",
        requestedBy: "the AH only works if buyers can see what they're buying",
        shippedAt: "2026-04",
        version: "v1.0.0",
        details:
          "Inventory right-click is detected via ShulkerPreviewListener with an InventoryType.CHEST guard (same defensive pattern as the post-2026-04-26 security sweep). /shulkerpreview is the mobile fallback because Bedrock can't right-click in inventory. The preview is a ShulkerPreviewHolder-tagged inventory — taking items from it is intercepted and cancelled, so the preview is genuinely read-only. BetterSMPAuctionHouse calls the same service on its buy-confirm GUI so a shulker listing is never a black box for the buyer.",
        myContribution:
          "the read-only-via-holder rule (Claude's first draft opened the real shulker — a 30-second item dupe vector), the AH integration so the preview closes the trust loop on shulker listings, the mobile /shulkerpreview fallback because Bedrock players were the loudest about wanting this.",
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
