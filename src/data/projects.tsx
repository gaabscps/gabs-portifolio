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
        title: "First daily community goal goes live.",
        body: "Shipped the first daily mission. Everyone online contributes to the same target, everyone shares the reward when it clears. The first week taught me the rest: every progress event was broadcast to every player on a status bar at the top of the screen, and during peak trading hours the screen flickered like an alarm. Added a per-player rate-limit and a join-day reminder.",
        callouts: [
          {
            kind: "changed",
            label: "changed by hand",
            body: "<ai>AI</ai>'s first cut had no rate-limit on the feedback channel. With six players online it was already flicker. I wrote a 5-second cooldown per player into the spec before the next try.",
          },
        ],
      },
      {
        date: "2026-04-11",
        version: "v0.5",
        title: "World Events ship: Supply Drop + ELITE Mobs.",
        body: "Two of the biggest gameplay systems went live together. World Events: every few hours, an arena materializes somewhere with waves of enemies, a boss, and tiered rewards for the top survivors. ELITE Mobs: rare named enemies spawn at random in the open world, and players track them by cardinal direction — or buy the exact coordinates from whoever found them first. Information became the secondary economy.",
      },
      {
        date: "2026-04-26",
        version: "v0.7",
        title: "Security sweep — six exploits closed in a weekend.",
        body: "Community testers found a stack of exploits in one community-test weekend. A renamed container opened a shop screen it shouldn't have. A permissions command interpolated a username straight into the console — textbook injection. A purchase charged 100ms after the command, leaving a race to undo it before the bill landed. Six fixes shipped in one sweep — and every custom item on the server moved to typed-metadata identity to close that whole class of bug at the root.",
        callouts: [
          {
            kind: "rejected",
            label: "rejected",
            body: "<ai>AI</ai>'s first patch for the rename exploit was a substring match. Players renamed their containers around the substring and bypassed it in five minutes. The real fix was checking the inventory type first — boring, correct, written after I rejected the clever one.",
          },
        ],
      },
      {
        date: "2026-05-01",
        version: "v1.0",
        title: "RPG launch — Miner live, Hunter and Farmer a week later.",
        body: "The RPG layer went live. Pick a class — Miner first, Hunter and Farmer a week later — walk a quest line of four tiers, build trust with the NPCs along the way. A compass at the top of the screen points at your active target. The quest definitions are YAML files: content as data. The plugin grew a real lint test suite because the AI kept silently regressing the schema between iterations, breaking quests in subtle ways nobody noticed until a player got stuck.",
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
      "I don't know Java. What I know is how to write the architecture, the observability plan, the test plan, and the scope — and how to stop AI when it's about to ship something that'll break in production. The biggest rollback wasn't a bug. It was me trusting Claude's defaults on security-adjacent code without writing what \"safe\" meant. A string-match on inventory titles that a player bypassed in five minutes by renaming a container. A console command that interpolated a username straight into a permissions call — textbook command injection. A purchase that charged 100ms after the command ran, leaving a race for the player to undo it before the bill landed. Six exploits in one community-test weekend, all shipped in one sweep. The lesson generalizes past Minecraft: anything that touches money, identity, or permissions gets its acceptance criteria written before the first prompt. The rest is typing.",
    plugins: [
      {
        // TODO assets:
        //   /bettersmp/world-events-supply-drop.mp4 — 20–30s clip: pre-alert message in chat → arena materializing in open biome (lime glass marker → emerald base) → first wave of zombies/skeletons/spiders spawning at 30s interval → mini-boss zombie appearing → chest unlocking, top survivor opens it
        //   /bettersmp/world-events-supply-drop-rewards.png — winner reward screen showing $25,000 + 80 shards + "resource" crate key
        name: "World Events · Supply Drop",
        summary:
          "Every few hours, the world wakes up. An arena materializes somewhere on the map, enemy waves spawn, a boss appears, players race in for the loot drop.",
        requestedBy: "the weekly hype moment",
        shippedAt: "2026-04",
        version: "v1.0.0",
        impact:
          "A reason to be online at peak hours. When the Discord pre-alert fires, players actually drop what they're doing and come back — the server has gravity beyond 'log in to mine.'",
        details:
          "The first cut was a hardcoded handler per event. The second put everything — wave timing, mob composition, reward tiers, difficulty curves — in a YAML config the runtime walks. Adding 'Eclipse Hunt' or 'Treasure Run' became a config diff, not a new plugin. Production taught me the rest: 1–2 hours between events burned players out, 12+ hours felt empty, and a Discord ping when one's incoming gave it gravity before it spawned.",
        myContribution:
          "Event catalogs as data, not code. New event types ship as config, not deploys.",
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
          "Rare named enemies spawn somewhere in the open world. Whoever finds one wins tier-specific loot.",
        requestedBy: "the anti-idle thesis, made literal",
        shippedAt: "2026-04",
        version: "v1.0.0",
        impact:
          "Idle farming the same corner stops being viable when rare loot can spawn 14,000 blocks away — and the player next to you might know exactly where. Players walk around, talk to each other, decide what information is worth selling.",
        details:
          "The first version showed exact coordinates and killed itself in two days — finding the rare mob was just 'follow the marker.' I rewrote it to show only a cardinal hint (N/S/E/W) and built a confirmation-dialog UI where players could *sell* the exact coordinates to each other for in-game currency. Information became the most valuable item in the game. The rarest thing on the server isn't the loot — it's the location of the loot.",
        myContribution:
          "Information as currency. The rarest item in the game is now 'where the rare item is.'",
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
          "Pick a class — Miner, Hunter, or Farmer — and walk a quest line of four tiers. NPCs you build trust with. A book that tracks your journal. A compass at the top of the screen that points at your next target.",
        requestedBy: "depth, not grind — and content that didn't break every time the AI touched it",
        shippedAt: "2026-05",
        version: "v1.0.0",
        impact:
          "A long-term arc beyond 'collect resources.' New players have a structured way to climb; veterans have something to optimize. Sessions go from '15 minutes of mining' to 'one tier closer to T4.'",
        details:
          "The quests themselves live in YAML files, one per class-tier. That decision had a cost: Claude kept silently regressing the schema between iterations, breaking quests in subtle ways nobody noticed until a player got stuck. So the plugin grew a real lint test suite that fails the build if the YAML drifts from its contract. Six classes were in the original brief; three was the right size for a 12-week launch. Under-promise, ship, expand.",
        myContribution:
          "Content is data, and data needs tests. The lint suite stopped a regression class the AI kept reintroducing.",
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
          "Players list items, others browse by name or category, instant buyout. A small player-to-player marketplace.",
        requestedBy: "to replace shouting prices in chat",
        shippedAt: "2026-02",
        version: "v1.0.0",
        impact:
          "Killed the chat spam of 'WTS 50g for stack of diamonds.' Players price-discover at any hour, even when nobody's online to negotiate — the economy runs 24/7.",
        details:
          "Most servers reach for Postgres for this. I picked embedded SQLite — one JAR, no separate process to babysit, no DB team. A 100-player server doesn't need the operational tail of a real database. The interesting bug got caught in review: Claude's first draft stored prices as floating-point doubles. Money in floats is the classic mistake nobody notices until reconciliation breaks. Switched to integer cents before deploy. Two migrations later (I changed my mind on storage shape twice), still embedded, still fast.",
        myContribution:
          "Picked the smaller database. Embedded SQLite, no operational tail, ships in one JAR.",
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
          "One server-wide goal per day. Everyone contributes, everyone shares the same reward when it clears.",
        requestedBy: "a daily reason to log in that didn't depend on grinding alone",
        shippedAt: "2026-03",
        version: "v1.0.0",
        impact:
          "A daily reason to log in that isn't 'check the dailies.' Everyone pulling toward the same goal creates a social pressure solo objectives can't match — late-day, players coordinate to push the bar over.",
        details:
          "The interesting problem wasn't the goal — it was the feedback channel. Every item sold triggered a progress update broadcast to every player on the action-bar (a thin status line above the hotbar). With six people online and a busy market, the screen flickered like an alarm. A 5-second throttle per player turned it from a fire hose into a heartbeat. Feedback rate is a load-bearing concern; the AI's first cut had no backpressure on user-facing events.",
        myContribution:
          "Feedback rate is a load-bearing concern. A 5-second throttle saved the chat window from itself.",
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
          "Fifteen cosmetic companions. A bee, a wolf, a baby axolotl. They follow you, they sit on command, they can't do anything else.",
        requestedBy: "the line we wouldn't cross on monetization",
        shippedAt: "2026-04",
        version: "v1.0.0",
        impact:
          "The monetization lane that doesn't compromise gameplay. Players who want to support the server have somewhere to spend; players who don't are never at a disadvantage.",
        details:
          "No damage. No item pickup. No attacks. No block changes. No status effects. The cosmetic-only contract isn't a paragraph in the docs; it's seven event listeners that cancel every harmful interaction the pet could otherwise produce, at the highest priority. The instant a pet starts behaving like a real mob, the listener cancels it before the engine commits. Docs aren't enforcement. Code is.",
        myContribution:
          "Docs aren't enforcement. The cosmetic-only contract is seven cancelled listeners, not a paragraph.",
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
          "Players queue, get teleported to an arena, fight. Two modes: bring-your-own gear or use the standard kit.",
        requestedBy: "a fight system that didn't ruin your real inventory",
        shippedAt: "2026-04",
        version: "v1.0.0",
        impact:
          "Lets players settle fights without the loss-aversion that kills most server PvP. The risk-free arena means people actually duel; the per-mode stats give competitive players something to chase.",
        details:
          "The first version trusted players to use the kit themselves. They brought enchanted netherite instead — the strongest gear in the game, no consequence if they lost. So I added an inventory snapshot on entry: your real gear is stashed, the kit is loaded, and on exit (win, lose, disconnect, mid-fight crash) the original is restored. Either the duel commits fully or it rolls back fully. Treat it like a database transaction.",
        myContribution:
          "Treat the duel as a transaction. Snapshot on entry, restore on exit, no exceptions.",
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
          "The subscription tier. A few dollars a month unlocks extra home slots, a chat suffix, an exclusive pet, and a discount on RPG profession changes.",
        requestedBy: "monetization that respected the no-pay-to-win rule",
        shippedAt: "2026-04",
        version: "v1.0.0",
        impact:
          "Sustainable revenue without pay-to-win. Subscribers get convenience, never power. The server pays for itself without the community feeling fleeced.",
        details:
          "Three plugins, three responsibilities. Payment lives in the third-party billing platform. A dedicated entitlement plugin owns the state — is this player subscribed, when does it expire. This plugin is the read-only consumer that turns active state into feature behavior. None of them know the others' internals. When a subscription expires, the perks are rolled back; the data is never deleted. The extra home slots you set up while subscribed stay where you left them — you just can't visit until you renew.",
        myContribution:
          "Expiring a subscription rolls back access, never data. Payment, state, and behavior are three separate plugins for a reason.",
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
          "A second currency. Players earn it over time and spend it on lootbox-style crates.",
        requestedBy: "a chance-economy currency that doesn't mix with the marketplace",
        shippedAt: "2026-03",
        version: "v1.0.0",
        impact:
          "A second loop that doesn't compete with the marketplace. Players grind shards for chance rewards; the gold economy stays focused on real trade. Two separate dopamine systems, neither cannibalizing the other.",
        details:
          "The interesting call was making shards non-tradeable. No /shards pay. No listings. No transfer between players. The marketplace runs on gold; the slot machine runs on shards; the two economies never touch. Without the wall, players would arbitrage one against the other in a week. Non-tradeability is a feature, not a limitation.",
        myContribution:
          "Non-tradeable by design. Two economies, never crossing — closes arbitrage before it can open.",
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
          "First-time players get walked through the server. Two tours: a Core tour rewards a starter kit, an optional Extras tour rewards crate keys. A status bar at the top of the screen tracks your next step.",
        requestedBy: "the funnel decides retention — players don't read rules, they follow the arrow",
        shippedAt: "2026-04",
        version: "v1.0.0",
        impact:
          "The funnel that decides retention. Players who finish the tour stick around; players who quit at step three don't come back. Getting the first 15 minutes right is worth more than any feature ten hours in.",
        details:
          "The shape is a state machine; the steps come from a YAML file. The bug I caught early: a stationary player could complete two steps in the same frame because both their advance conditions were satisfied at once (proximity AND command). Five-second grace window per step before the next can fire, and the chain ordering held. If the starter kit fails to deliver — for any reason — the player's progress is preserved and staff gets paged. Losing your kit on minute one is the worst possible first impression.",
        myContribution:
          "State machines need causal ordering, even when state changes in milliseconds. The 5-second grace window made it real.",
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
          "Three custom mining tools earned through RPG progression. The axe also fells whole trees in one swing — up to 64 connected logs of the same species.",
        requestedBy: "items that feel earned, not dropped",
        shippedAt: "2026-04",
        version: "v1.0.0",
        impact:
          "Gives RPG progression a tangible payoff. Hitting a high tier means a named, useful tool is yours — visible to every other player who hovers it. Progression with nothing to show for it doesn't motivate anyone.",
        details:
          "The week after the security sweep, every custom item on the server moved to typed-metadata identity. Display names are user-mutable — players can rename items at an anvil and pretend any item is the rare one. Typed server-side keys aren't. The vein-mining cap matters too: without a hard limit, a chunk-spanning jungle tree locks up the main server thread for a noticeable beat.",
        myContribution:
          "Item identity lives in typed metadata, not strings. Display names are user-mutable; typed keys aren't.",
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
          "Players earn chat tags as progression rewards. Only one displays at a time.",
        requestedBy: "progression has to be visible to other players, not just in a menu",
        shippedAt: "2026-03",
        version: "v1.0.0",
        impact:
          "Progression that shows up in chat. Players walk around with the tag attached to their name — social proof of consistency, not a number hidden in a menu. The Activity Tag rewards showing up without making it feel like a job.",
        details:
          "Multi-tag turned every name into a billboard nobody read. The Activity Tag is the fun one: log in three days in a row and you get a streak tag; miss a day and it's gone, you start over. Timezone-aware, because a 23:55 login on the user's clock should count as 'today,' not 'yesterday' in server UTC. The kind of detail that makes a daily-reward system feel arbitrary when it's wrong.",
        myContribution:
          "One tag at a time. Multi-tag turned every name into a billboard.",
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
          "Shulker boxes are portable containers you carry around in your inventory. This plugin lets you right-click one and see its contents without placing it.",
        requestedBy: "the marketplace only works if buyers can see what they're buying",
        shippedAt: "2026-04",
        version: "v1.0.0",
        impact:
          "Closed the trust loop on bagged inventory listings. Without preview, buying a shulker is a gamble; with it, the marketplace works. Quality-of-life that makes one of the biggest features land.",
        details:
          "Listing a shulker on the marketplace used to be a black box for buyers — you saw the icon, not the contents. So the preview lets them inspect before paying. The trick was making it genuinely read-only. The first cut just opened the real shulker. That's a 30-second item-duplication exploit, because what's read-only in the UI is read-write in the underlying inventory if nothing intercepts the take operation. The fix was a tagged inventory that cancels every take at the listener layer.",
        myContribution:
          "Read-only enforced at the listener, not the UI. Closed the trust loop on the marketplace.",
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
    startedAt: "2025-12",
    category: "audio AI platform",
    images: [],
    skills: [skills.react, skills.typescript, skills.github],
    links: {
      route: "/work/soundwave",
      github: "https://github.com/gaabscps/soundwave-summit",
    },
    status: "live",
    // To swap the cover to a recording-flow video (kind: "video"), drop the file at
    // public/soundwave/preview.mp4 and update the cover to:
    //   cover: { kind: "video", src: "/soundwave/preview.mp4", alt: "SoundWave Summit — 20s recording flow: hit record → speak → stop → analysis appears with topics, decisions, action items" },
    cover: { kind: "custom", component: "Waveform" },
    stackChips: ["Vite + React", "Supabase", "Google AI", "Deepgram"],
    aiTool: "Claude",
    motivation:
      "I kept losing the good parts of meetings. Built a pipeline to surface what I missed.",
    motivationContext: "— december 2025, after the third meeting I couldn't remember the next morning",
    buildLog: [
      {
        date: "2025-12-10",
        version: "v0.1",
        title: "Scaffolded on Lovable. SaaS UI for audio in one evening.",
        body: "Started from a Vite + React + shadcn template through Lovable Cloud — the entire UI shell, auth shapes, and routing landed before I wrote any business logic. Wanted to see the surface first, then carve out what would actually pay rent.",
      },
      {
        date: "2025-12-11",
        version: "v0.2",
        title: "Day-two sprint: ditched the default provider, wired Stripe, set the credits floor.",
        body: "Lovable's default routed everything through OpenAI. Killed it the same day — latency on 50-minute transcripts was unworkable. Switched the analysis brain to Google AI, wired Stripe + webhook for paid plans, set the first MVP credits UX. Day two of selling something.",
        callouts: [
          {
            kind: "rejected",
            label: "rejected",
            body: "<ai>AI</ai>'s default of \"just call the LLM with the full transcript\" was fine for two-minute clips and unusable for a fifty-minute meeting. Wrote the transcription-chain spec before any more prompts.",
          },
        ],
      },
      {
        date: "2026-04-18",
        version: "v0.5",
        title: "Meeting capture goes live alongside file upload.",
        body: "Added separate <ai>meetings</ai> and <ai>meeting_transcripts</ai> tables for live-capture flows. The product now had two entry paths — record a meeting in the app or upload an existing file — both ending in the same analysis pipeline.",
      },
      {
        date: "2026-05-11",
        version: "v0.8",
        title: "Transcription chain ships with circuit breakers.",
        body: "Stopped trusting any single transcription provider. Built a fallback chain — Deepgram nova-2 first (fast and cheap), Deepgram whisper-large as the backup (better with noise), Gemini Flash as the last resort (the brain we already use for analysis). Each model has its own circuit breaker: open it after consecutive failures, half-open after a cooldown, closed when it recovers. A 24-hour Postgres view tells me which provider is misbehaving before the support tickets do.",
      },
      {
        date: "2026-05-18",
        version: "v1.0",
        title: "Public sharing with granular visibility.",
        body: "FEAT-009: any analysis can be made public, but the owner decides what's public. Eight independent toggles — audio, transcription, sentiment, speech-time, topics, decisions, insights, todos — each enforced at three layers: Postgres RLS, an Edge Function RPC, and the storage bucket policy on the audio file. Any one layer can fail without exposing data.",
        callouts: [
          {
            kind: "rule",
            label: "the rule",
            body: "Anything that touches identity, money, or visibility gets three independent enforcement layers. The UI is convenience; the real gate is at the data layer.",
          },
        ],
      },
    ],
    results: [
      { value: "3", label: "AI providers · transcription chain" },
      { value: "10", label: "output languages" },
      { value: "17", label: "edge functions live" },
      { value: "399", label: "tests · 69 files" },
    ],
    retrospective:
      "What started as 'capture my own meetings' grew into a real platform — Stripe billing, anonymous flows, public sharing, multi-provider transcription with a circuit breaker. The thing that changed me most through this build wasn't a feature, it was the layering instinct. Anything that touches identity, money, or visibility now gets three independent enforcement layers — Postgres RLS, an Edge Function gate, a storage policy. Any one of them can fail without exposing data. The lesson generalizes: the UI is convenience. The real gate is at the data layer.",
    plugins: [
      {
        // TODO assets:
        //   /soundwave/transcription-metrics.png — admin dashboard showing the v_transcription_metrics_24h view: rows per model (deepgram-nova-2, deepgram-whisper-large, gemini-2.5-flash) with attempts_total, success_rate_pct, p50_duration_ms, p95_duration_ms
        //   /soundwave/transcription-attempts.png — single-job detail panel showing the transcription_attempts JSON array — three rows: nova-2 (error 4xx), whisper-large (circuit_open), gemini-2.5-flash (ok), with timing
        name: "Transcription Engine",
        summary:
          "Three speech-to-text providers in a fallback chain. If the first fails (or its circuit breaker is open), the next tries — and the next. Every attempt is logged; success rate is tracked per provider in a 24-hour rolling view.",
        requestedBy: "transcription that doesn't fail the user when one vendor has a bad day",
        shippedAt: "2026-05",
        version: "v1.0",
        impact:
          "A failed transcription stopped meaning 'show the error and lose the user.' A noisy meeting recording now goes through three providers and almost always comes back with a result — without the user ever knowing the first two were tried.",
        details:
          "Deepgram nova-2 (fast, cheap) runs first. If it fails — or if its circuit breaker tripped to open after consecutive errors — the request falls to Deepgram whisper-large, slower but better with noise. If that also fails, Gemini 2.5 Flash runs as the last resort. Every attempt writes to a JSONB column on the job: model, outcome, started_at, duration_ms. A Postgres view aggregates success rate and p50/p95 duration per model across the last 24 hours — useful when a provider starts degrading and the support tickets haven't caught up yet.",
        myContribution:
          "Graceful degradation as the default, not an afterthought. The circuit breaker means a bad day at one provider doesn't burn the user's quota retrying it.",
        gallery: [
          {
            src: "/soundwave/transcription-metrics.png",
            alt: "Admin metrics dashboard — three rows for deepgram-nova-2, deepgram-whisper-large, gemini-2.5-flash, each showing total attempts, success rate %, p50 and p95 duration in ms, over the last 24 hours",
            caption: "v_transcription_metrics_24h",
          },
          {
            src: "/soundwave/transcription-attempts.png",
            alt: "Single-job detail panel — transcription_attempts JSON array shown as three timeline rows: nova-2 (outcome: error), whisper-large (outcome: circuit_open), gemini-2.5-flash (outcome: ok), each with started_at and duration_ms",
            caption: "per-job retry log",
          },
        ],
      },
      {
        // TODO assets:
        //   /soundwave/analysis-result.png — finished analysis page: topics card (3 carousel items), decisions card, insights card, todos card, sentiment card with per-participant breakdown
        //   /soundwave/analysis-languages.png — output-language dropdown showing all 10 options (en/pt/es/fr/de/it/ja/ko/zh/ru) with one selected
        name: "Analysis Pipeline",
        summary:
          "Once an audio is transcribed, Gemini extracts the structured analysis — topics, insights, decisions, todos, sentiment — into a typed JSON object the front-end renders into cards. Defensive parsing handles the LLM responses that forget to format.",
        requestedBy: "a transcript alone isn't useful — the user wants the meeting's decisions, not the meeting's words",
        shippedAt: "2025-12",
        version: "v1.0",
        impact:
          "The product's actual job. A 50-minute meeting becomes a one-page summary the user can scan in 30 seconds: what was decided, what's next, who said what, how the room felt.",
        details:
          "Google Gemini 2.5 Flash (with 2.0 Flash as a faster fallback for short clips) takes the transcript and prompts for a structured response. Output language is one of 10 (en/pt/es/fr/de/it/ja/ko/zh/ru). The parser tries three strategies in order — direct JSON.parse, markdown code-block extraction, substring between the first '{' and the last '}' — because LLMs occasionally forget formatting. If all three fail, the job retries with a tighter prompt. Sentiment analysis is gated to paid plans.",
        myContribution:
          "Structured output from an LLM deserves a real parser. The 'just JSON.parse it' approach works until it doesn't — and when it doesn't, the user sees an error instead of their meeting summary.",
        gallery: [
          {
            src: "/soundwave/analysis-result.png",
            alt: "Finished analysis page — top half shows a topics carousel (3 cards), middle shows decisions and todos lists, bottom shows insights and a sentiment card with per-participant emotion labels",
            caption: "analysis · all sections",
          },
          {
            src: "/soundwave/analysis-languages.png",
            alt: "Language picker open — dropdown menu listing all 10 output languages (English, Portuguese, Spanish, French, German, Italian, Japanese, Korean, Chinese, Russian) with one currently selected",
            caption: "10 output languages",
          },
        ],
      },
      {
        // TODO assets:
        //   /soundwave/worker-queue.png — admin view of the audio_jobs table: list of rows with status pills (queued / processing / done / error), worker_id column, locked_at timestamp, progress %
        name: "Audio Worker",
        summary:
          "A Node.js worker on Railway that processes audio outside of Supabase Edge Functions. Picks jobs from a Postgres queue, chunks the audio with ffmpeg, transcribes each chunk, writes the result back.",
        requestedBy: "ffmpeg can't run inside Edge Functions, and chunked audio finishes faster than a single huge upload",
        shippedAt: "2026-Q1",
        version: "v1.0",
        impact:
          "Long meetings (1 hour+) actually finish. Without time-based chunking, the LLM would time out on the audio before reaching the analysis step.",
        details:
          "Edge Functions can't spawn subprocesses, which makes ffmpeg unusable there — but ffmpeg is the only reasonable tool for time-based audio chunking. So the worker is a separate Node.js service on Railway. Jobs live in a Postgres `audio_jobs` table; the worker claims one atomically using `SELECT … FOR UPDATE SKIP LOCKED`, then writes a lease (`locked_at` / `locked_by`) so a crashed worker's job can be picked up after a timeout. Default chunk size is 120 seconds. The transcription chain runs per chunk; analysis runs once on the assembled transcript.",
        myContribution:
          "Pick the runtime that matches the operation. Edge Functions are perfect for short, stateless requests; ffmpeg-driven chunking is not that. One service per kind of work, not one service for everything.",
        gallery: [
          {
            src: "/soundwave/worker-queue.png",
            alt: "Audio_jobs admin view — table of recent jobs with columns: status pill (queued / processing / done / error), worker_id, locked_at timestamp, progress percentage, original_filename. One row currently processing, two done, one queued.",
            caption: "audio_jobs queue",
          },
        ],
      },
      {
        // TODO assets:
        //   /soundwave/visibility-toggles.png — settings panel with 8 toggle switches (audio, transcription, sentiment, speech_time, topics, decisions, insights, todos), each labeled, some on/some off
        //   /soundwave/public-view.png — public viewer of a shared analysis: visible sections rendered normally, hidden sections shown as 'not shared' placeholders
        name: "Public Sharing · FEAT-009",
        summary:
          "Any analysis can be made public with eight independent toggles: audio, transcription, sentiment, speech-time, topics, decisions, insights, todos. Public viewers get exactly what the owner allowed — nothing more, nothing less.",
        requestedBy: "owners wanted to share insights without sharing the raw transcript; 'all or nothing' was the wrong primitive",
        shippedAt: "2026-05",
        version: "v1.0",
        impact:
          "Users can share what's useful from a meeting (decisions, action items) without exposing the raw conversation. Was the most-requested feature in the support inbox before it shipped.",
        details:
          "Visibility is a JSONB column on the analysis row, validated by a `pg_jsonschema` CHECK constraint (with a pure-SQL fallback when the extension isn't available). Public reads go through a SECURITY DEFINER RPC that walks the visibility JSON and returns only the allowed fields. The storage policy gates the audio file at the signed-URL layer — a request for the audio fails at the bucket if `audio: false`, even if a UI somehow asks for it. `REVOKE SELECT … FROM anon` on the underlying table is the defense-in-depth: if everything else fails, the anon role still can't read the raw rows.",
        myContribution:
          "Three independent enforcement layers (RLS, RPC, storage policy) for a single property. Any one of them can fail without exposing data. The UI is convenience; the real gate is at the data layer.",
        gallery: [
          {
            src: "/soundwave/visibility-toggles.png",
            alt: "Visibility settings panel — eight labeled toggle switches in two columns: audio, transcription, sentiment, speech_time on the left; topics, decisions, insights, todos on the right. Four are on, four are off. Below: a 'copy public link' button.",
            caption: "8 toggles",
          },
          {
            src: "/soundwave/public-view.png",
            alt: "Public viewer of a shared analysis — header with title and 'shared publicly' badge, topics and decisions cards rendered normally, the audio player section replaced with a small 'audio not shared' placeholder, the transcription section greyed out with a similar placeholder",
            caption: "public view · respects toggles",
          },
        ],
      },
      {
        // TODO assets:
        //   /soundwave/anonymous-flow.mp4 — 20–25s clip: landing page → 'try without signup' CTA → upload an audio file → see the analysis result without ever signing up
        //   /soundwave/anonymous-claim.png — signup completion screen showing 'We found 2 analyses you started before signing up — they've been added to your account' with a list
        name: "Anonymous-then-Claim Flow",
        summary:
          "Try the product without signing up. Upload audio, run an analysis, see the result. If you want to keep it, create an account — your in-progress analyses are claimed and migrated to your user automatically.",
        requestedBy: "signup-before-value was losing most visitors at the activation gap",
        shippedAt: "2026-Q1",
        version: "v1.0",
        impact:
          "First-time experience is 'see the product work on your own audio,' not 'fill out a form and verify your email first.' Activation rate measurably improved after this shipped.",
        details:
          "Three edge functions own the flow. `upload-anonymous-audio` writes the file under a session token. `create-anonymous-analysis` queues the job under that token. `claim-anonymous-analyses` runs at signup, re-attaching every analysis matching the session to the new user_id. Anonymous data has a hard expiry (7 days) so abandoned analyses don't accumulate. The same Stripe-aware quota check runs whether the analysis is anonymous or authenticated.",
        myContribution:
          "Activation friction is the first feature, not the last polish. Letting a visitor see the product work on their own audio — before any email — is what made the funnel actually convert.",
        gallery: [
          {
            src: "/soundwave/anonymous-flow.mp4",
            alt: "Anonymous flow demo — 20–25s clip: landing page with prominent 'try without signup' CTA, click → file upload modal → drop an audio file → processing animation → finished analysis appears (topics, decisions, todos visible). No signup wall, no email gate.",
            caption: "anonymous · full flow",
            kind: "video",
          },
          {
            src: "/soundwave/anonymous-claim.png",
            alt: "Post-signup screen — message reads 'We found 2 analyses you started before signing up — they've been added to your account.' Below, a list of two analysis cards with titles and created_at dates, both now linked to the new user.",
            caption: "claim on signup",
          },
        ],
      },
      {
        // TODO assets:
        //   /soundwave/recorder-active.mp4 — 15–20s clip: user clicks record, sees the waveform indicator, switches browser tab (Picture-in-Picture window appears with mini waveform), tabs back (title was flashing), clicks stop, recording uploads
        //   /soundwave/recorder-safari.png — Safari-specific permission warning screen with a custom animation explaining how to grant mic + screen-share permissions in Safari's distinct prompts
        name: "Browser Recorder",
        summary:
          "Record audio in the browser: mic only, tab audio only, or both mixed together. Works across Chrome, Firefox, and Safari, each of which has its own personality. Falls back to local download if upload fails so the meeting is never lost.",
        requestedBy: "users wanted to record their meetings in the app, not export them after",
        shippedAt: "2025-12",
        version: "v1.0",
        impact:
          "Closed the loop. The user can hit a button, run a meeting, hit stop, and have a finished analysis minutes later — no exporting from a third-party tool, no file management.",
        details:
          "MediaRecorder API drives the capture. AudioContext mixes mic and tab/display streams through MediaStreamAudioSourceNode → GainNode → MediaStreamAudioDestinationNode so levels can be balanced before encoding. RecordRTC handles the actual recording. Safari has its own user-gesture rules and behaves differently with screen-share audio — there's a dedicated detection path with a custom warning animation. Picture-in-Picture API keeps a tiny preview visible when the user tabs away. Title flashing pulls them back when something needs attention. If upload to Supabase fails, the recording downloads locally so a 40-minute meeting isn't lost to a flaky network.",
        myContribution:
          "Browser APIs are services with personalities. Safari isn't broken — it's enforcing its own permission model, and the recorder has to know that. The download fallback was added after the first user lost a meeting to a network blip.",
        gallery: [
          {
            src: "/soundwave/recorder-active.mp4",
            alt: "Recording flow — 15–20s clip: user clicks the record button on the dashboard, waveform animation starts in the panel; user switches to a different browser tab and a small Picture-in-Picture window appears with a live waveform; user returns to the tab (title was flashing for attention); user clicks stop; upload progress completes",
            caption: "record · tab away · stop",
            kind: "video",
          },
          {
            src: "/soundwave/recorder-safari.png",
            alt: "Safari-specific permission walkthrough — modal with a Safari logo, animated illustration showing how to grant mic permission via Safari's distinct prompt, separate step for screen-share permission with the system dialog highlighted",
            caption: "Safari · custom walkthrough",
          },
        ],
      },
    ],
  },

  {
    id: "ai-squad",
    slug: "ai-squad",
    translationKey: "aiSquad",
    year: "2026",
    startedAt: "2026-05",
    category: "AI workflow",
    images: [],
    skills: [skills.typescript, skills.github],
    links: {
      route: "/work/ai-squad",
      github: "https://github.com/gaabscps/ai-squad",
      changelog: "https://github.com/gaabscps/ai-squad/blob/main/CHANGELOG.md",
    },
    status: "live",
    cover: {
      kind: "screenshot",
      src: "/ai-squad/hero.svg",
      alt: "ai-squad overview — fuzzy idea on the left flows through Discovery (Frame, Investigate, Decide) and SDD (Specify, Plan, Tasks, Build) into shipped code on the right",
    },
    stackChips: ["Python stdlib", "JSON schema", "Skills + Subagents"],
    aiTool: "Claude",
    motivation:
      "Using AI to code without a workflow was eating my afternoons. Built the gates I kept forgetting to walk through.",
    motivationContext: "— april 2026, after the fourth feature I'd half-built and abandoned",
    buildLog: [
      {
        date: "2026-05-03",
        version: "v0.1.0",
        title: "Initial architecture: two squads, ten roles, capped concurrency.",
        body: "Discovery for fuzzy ideas (Frame → Investigate → Decide). SDD for clear pitches (Specify → Plan → Tasks → Build). Phase 4 runs unattended with up to 5 tasks in parallel, hash-based stall detection, and a blocker-specialist that writes a decision memo when anything escalates. MIT licensed, scaffolded as a mono-repo of skills and subagents.",
      },
      {
        date: "2026-05-06",
        version: "v0.2.0",
        title: "Mechanical hooks ship. Bypass becomes impossible.",
        body: "Prompt-discipline alone wasn't enough — Claude would happily edit files outside <ai>.agent-session/</ai> when nothing physically stopped it. Added pure-stdlib Python 3 hooks the runtime enforces: <ai>guard-session-scope</ai>, <ai>block-git-write</ai>, <ai>verify-audit-dispatch</ai>, <ai>verify-output-packet</ai>. The audit-agent is the last gate before handoff and refuses if the dispatch manifest doesn't reconcile against the output packets.",
        callouts: [
          {
            kind: "rule",
            label: "the rule",
            body: "Discipline that lives only in a prompt is not discipline. If the agent can ignore it, eventually it will. Hooks moved every load-bearing rule from \"the prompt asks for X\" to \"the runtime refuses non-X.\"",
          },
        ],
      },
      {
        date: "2026-05-06",
        version: "v0.3.0",
        title: "Three runtimes, one source. Cursor and Kiro deploy paths.",
        body: "Same day as 0.2.0. Cursor export converts each Skill to a Cursor artifact and merges hooks into the user's <ai>~/.cursor/hooks.json</ai>. Kiro path converts every Skill and Subagent to a Custom Agent JSON with per-agent hook wiring so <ai>guard-session-scope</ai> only fires for the orchestrator, not the dev. Three IDE targets from one set of source files.",
      },
      {
        date: "2026-05-19",
        version: "0.4 · unreleased",
        title: "Canonical status enum + committer subagent.",
        body: "Single source-of-truth for dispatch status lives in <ai>shared/schemas/dispatch-manifest.schema.json</ai>. Python and TypeScript consumers derive their enums from it at runtime. Added a <ai>committer</ai> subagent (haiku) that auto-commits the working tree at the end of Phase 4 when verdict is <ai>done</ai>. Deprecated the <ai>partial</ai> status; full removal planned for vNext+1.",
      },
    ],
    results: [
      { value: "10", label: "roles in the pipeline" },
      { value: "59/59", label: "smoke tests · PASS" },
      { value: "3", label: "IDE runtimes · Claude / Cursor / Kiro" },
      { value: "16d", label: "v0.1 to v0.4" },
    ],
    retrospective:
      "What I wanted from this was a workflow that survived me forgetting to be disciplined. The first cut was all prompts — long, careful, full of \"you must\" language. It worked when I read every output. It failed the moment I trusted Phase 4 to run unattended. The fix was hooks: every load-bearing rule moved from \"the prompt asks\" to \"the runtime refuses.\" The second insight was multi-runtime — same Skills source, three IDE targets — because the workflow shouldn't care which editor I'm in this month. The third was the audit-agent: a single read-only reconciliation step at the end that refuses to hand off if the dispatch manifest doesn't match what actually ran. Boring, mechanical, and the reason I now trust the pipeline.",
    plugins: [
      {
        // TODO assets:
        //   /ai-squad/discovery-memo.png — example memo.md output: Frame section with opportunity + user + value hypothesis, Investigate section with codebase-mapper findings + 4 risk-analyst verdicts (validated/refuted/inconclusive per Cagan risk), Decide section with options table + human decision
        name: "Discovery Squad",
        summary:
          "For when you don't know if you should build something. Three phases — Frame, Investigate, Decide — that pressure-test an idea against the Cagan big risks (value, usability, feasibility, viability) before any line of code.",
        requestedBy: "the 'careful code that ships for nobody' problem",
        shippedAt: "2026-05",
        version: "v0.1.0",
        impact:
          "Stops a fuzzy idea from turning into 30 hours of careful implementation aimed at the wrong problem. Either it earns a decision memo and proceeds to SDD, or it dies cleanly with no sunk-cost regret.",
        details:
          "Phase 1 (Frame) is a conversational skill that drafts a memo with the opportunity, the user, the value hypothesis. Phase 2 (Investigate) dispatches a codebase-mapper plus four risk-analysts in parallel — one per Cagan big risk — and aggregates their findings. Phase 3 (Decide) generates an options table with a recommendation and requires a human decision before anything proceeds.",
        myContribution:
          "Discovery is its own pipeline, not a step inside SDD. Decisions made under build pressure tend to favor 'just build it'; separating the squads gives the idea a fair hearing.",
        gallery: [
          {
            src: "/ai-squad/discovery-memo.png",
            alt: "Discovery memo.md rendered in a code viewer — top section 'Frame' with opportunity statement + user + value hypothesis; middle 'Investigate' section with bullet findings from codebase-mapper + four risk-analyst verdicts each labeled (value, usability, feasibility, viability) with verdict tag (validated/refuted/inconclusive); bottom 'Decide' section with 3-option table and a Decision row with the human's choice highlighted",
            caption: "memo.md · all three phases",
          },
        ],
      },
      {
        // TODO assets:
        //   /ai-squad/sdd-tasks.png — example tasks.md output: list of 8 tasks with id (FEAT-001/T1, T2, ...), title, AC coverage tags (AC-001, AC-002 mapped per task), parallelization marker (parallel-safe vs sequential), estimated effort
        name: "SDD Squad — Specify, Plan, Tasks, Build",
        summary:
          "For when you have a clear pitch and need to ship it. Four phases — Specify, Plan, Tasks, Build — where the first three are conversational (you approve each gate) and the fourth runs autonomously.",
        requestedBy: "AI-assisted code without a workflow tends to produce careful output that doesn't match what you meant",
        shippedAt: "2026-05",
        version: "v0.1.0",
        impact:
          "Turns 'vibe coding' into a structured pipeline with explicit checkpoints. The first three phases pin down what you're building; the fourth phase actually builds it without you babysitting.",
        details:
          "Phase 1 (Specify) drafts the feature spec with user stories and acceptance criteria. Phase 2 (Plan) proposes architecture decisions. Phase 3 (Tasks) breaks the work into parallelizable units with AC coverage. Phase 4 (Build) dispatches dev → reviewers → qa per task. Every gate is a human approval; only Phase 4 runs unattended.",
        myContribution:
          "Conversational gates for the decisions; autonomous execution for the typing. The first three phases are where judgment lives; the fourth is where typing happens.",
        gallery: [
          {
            src: "/ai-squad/squads.svg",
            alt: "Two-squad overview — left panel 'Discovery' with Frame/Investigate/Decide phases listed vertically with arrow flow; right panel 'SDD' with Specify/Plan/Tasks/Build phases. A bridge in the middle labeled 'Discovery says Proceed → compose pitch'",
            caption: "two squads · one source",
          },
          {
            src: "/ai-squad/sdd-tasks.png",
            alt: "tasks.md rendered as a list — 6–8 tasks each shown as: task ID (FEAT-001/T1, T2, ...), short title, AC coverage tags (AC-001, AC-002 mapped per task), parallelization marker (a 'parallel-safe' badge or 'sequential' badge), effort estimate",
            caption: "tasks.md · AC coverage + parallelization",
          },
        ],
      },
      {
        // TODO assets:
        //   /ai-squad/phase4-handoff.png — handoff.md screenshot: header with task_id + verdict (done), files_changed list, ac_coverage map (FEAT-001/AC-001: covered, AC-002: covered), evidence pointers, audit-agent verdict pill (audit-pass)
        name: "Phase 4 — Autonomous Build",
        summary:
          "The autonomous build phase. For each approved task, the orchestrator dispatches a dev (test-first), then code-reviewer + logic-reviewer in parallel, then qa. Findings loop back up to 3 rounds. Up to 5 tasks run concurrently.",
        requestedBy: "the only way to trust an unattended pipeline is to give every step its own gate",
        shippedAt: "2026-05",
        version: "v0.1.0",
        impact:
          "Lets the human walk away after Phase 3. The pipeline runs to completion or escalates explicitly; either way, no silent failure.",
        details:
          "Dev runs first inside an isolated context, writing tests before implementation. code-reviewer (patterns and style) and logic-reviewer (edge cases and races) run in parallel against the same diff. Findings loop back to dev — max 3 rounds — until reviewers sign off. QA validates every acceptance criterion against the spec. If anything stalls or escalates, blocker-specialist writes a decision memo or kicks it back to the human.",
        myContribution:
          "Parallel reviewers with separate concerns — patterns vs. behavior — catch different bugs. The loop cap is what prevents an infinite dev-review ping-pong; the blocker-specialist is what lets the human be away when something goes wrong.",
        gallery: [
          {
            src: "/ai-squad/build-pipeline.svg",
            alt: "Phase 4 pipeline diagram — orchestrator on the left dispatching to dev (test-first), dev's output going to two parallel reviewers (code-reviewer and logic-reviewer) shown side by side, both feeding back into a 'findings?' gate that loops to dev (max 3 rounds), then onward to QA validating acceptance criteria, then a final handoff with a green checkmark. Bottom note: 'Up to 5 tasks run in parallel · escalation goes to blocker-specialist · audit-agent gates the handoff.'",
            caption: "Phase 4 · runs autonomously per task",
          },
          {
            src: "/ai-squad/phase4-handoff.png",
            alt: "handoff.md rendered in a code viewer — header with task_id and verdict pill 'done', section 'files_changed' listing 4–6 relative paths, section 'ac_coverage' showing AC-001/AC-002/AC-003 each marked 'covered' with the test file that covers it, section 'evidence' with PR-style links, footer 'audit-agent: pass' pill",
            caption: "handoff · verifiable artifact",
          },
        ],
      },
      {
        // TODO assets:
        //   /ai-squad/hooks-refuse.png — terminal output: orchestrator tries to edit a consumer-repo file outside .agent-session/, the guard-session-scope hook returns a structured refusal with the violated rule and the offending path
        //   /ai-squad/hooks-list.png — Skill frontmatter snippet showing preToolUse + stop hook references, with explanatory comments about which Skill/Subagent each hook is wired to
        name: "Mechanical Hooks",
        summary:
          "Discipline that lives only in a prompt is not discipline. These are pure-stdlib Python 3 hooks the runtime enforces — orchestrators can't edit consumer-repo files, can't run git writes, can't end a session without dispatching the audit agent. If the agent tries, the runtime refuses.",
        requestedBy: "the prompt-discipline gap — Claude would happily do the wrong thing if nothing physically stopped it",
        shippedAt: "2026-05",
        version: "v0.2.0",
        impact:
          "Bypass becomes impossible, not just discouraged. Every load-bearing rule moved from 'the prompt asks for X' to 'the runtime refuses non-X.'",
        details:
          "Five hooks ship today: guard-session-scope (orchestrator can only edit inside .agent-session/<task_id>/), block-git-write (orchestrator cannot run git commit/add/reset/push), verify-audit-dispatch (orchestrator session cannot end without dispatching the audit-agent), verify-output-packet (every subagent must write its output packet before completing), verify-pipeline-completeness (catches incomplete pipelines before handoff). All pure stdlib so they ship in the same install as the skills.",
        myContribution:
          "Hooks moved every load-bearing rule from prompt to runtime. The prompt asks; the hook enforces. Without that, every workflow eventually gets bypassed under pressure.",
        gallery: [
          {
            src: "/ai-squad/hooks-refuse.png",
            alt: "Terminal screenshot — orchestrator agent attempts an Edit tool call on a path outside .agent-session/ (e.g., consumer-repo/src/feature.ts). The guard-session-scope hook intercepts and returns a refusal block with: violated rule name, offending path, allowed paths, hint to re-scope the edit",
            caption: "guard-session-scope · refuses out-of-scope edit",
          },
          {
            src: "/ai-squad/hooks-list.png",
            alt: "Skill frontmatter YAML snippet shown with syntax highlighting — keys preToolUse: and stop: each listing 2-3 hook references (python3 paths under ~/.claude/hooks/), with line comments explaining 'guard-session-scope only fires for orchestrator, not dev'",
            caption: "per-Skill hook wiring",
          },
        ],
      },
      {
        // TODO assets:
        //   /ai-squad/audit-manifest.png — JSON dispatch-manifest.json shown in a syntax-highlighted viewer: declared_dispatches array with 3 expected roles, actual_dispatches array with role/task_id/dispatch_id for each completed Task call
        //   /ai-squad/audit-refused.png — handoff refusal screen: header 'AUDIT FAILED', list of 1-2 findings with role/dispatch gap (e.g., 'expected logic-reviewer for FEAT-001/T2, none recorded'), action button 'return to orchestrator'
        name: "Audit Agent + Dispatch Manifest",
        summary:
          "The last gate before handoff. The orchestrator declares the expected pipeline in a JSON manifest before any dispatch; the audit-agent reconciles declared dispatches against actual outputs before allowing handoff. If anything was bypassed, it refuses the handoff and surfaces the gap.",
        requestedBy: "the orchestrator-bypass problem — how do you know the pipeline you described is the one that actually ran?",
        shippedAt: "2026-05",
        version: "v0.2.0",
        impact:
          "Catches the orchestrator skipping a step (e.g., dispatching dev but not reviewers) before the handoff would land. The human sees a refused handoff with a specific finding, not a silently broken pipeline.",
        details:
          "The dispatch manifest lives at .agent-session/<task_id>/dispatch-manifest.json. The orchestrator declares expected dispatches before any Task call and appends to actual_dispatches[] after each. The audit-agent runs 6 mechanical checks: manifest completeness, dispatch-to-output 1:1, role/task_id consistency, pipeline-stage coverage, AC closure, source-file ownership. If any check fails, the handoff is refused. Lineage: GitHub required status checks + Verifiability-First Audit Agents (arXiv 2512.17259) + transactional Outbox.",
        myContribution:
          "A mechanical reconciliation step at the end is the difference between trusting the agent and trusting the system the agent ran in. The audit agent doesn't believe the orchestrator's claims; it checks them.",
        gallery: [
          {
            src: "/ai-squad/audit-manifest.png",
            alt: "dispatch-manifest.json open in an editor with JSON syntax highlighting — top-level keys: task_id, declared_dispatches (array of 3 expected roles: dev, code-reviewer, logic-reviewer, qa), actual_dispatches (array with role/dispatch_id/output_packet_path for each completed Task call, with timestamps)",
            caption: "dispatch-manifest · declared vs actual",
          },
          {
            src: "/ai-squad/audit-refused.png",
            alt: "Handoff refusal modal — header 'AUDIT FAILED' in red, body lists 2 findings: 'expected logic-reviewer for FEAT-001/T2 — no dispatch recorded' and 'qa output_packet missing for FEAT-001/T2', footer with 'return to orchestrator' button. No handoff committed.",
            caption: "handoff refused · specific findings",
          },
        ],
      },
      {
        // TODO assets:
        //   /ai-squad/deploy-targets.png — three-panel side-by-side terminal output: panel 1 'deploy.sh' showing files copied to ~/.claude/, panel 2 'deploy-cursor.sh' showing skills exported + hooks.json merged, panel 3 'deploy-kiro.sh' showing per-Skill conversion to ~/.kiro/agents/*.json
        name: "Multi-runtime Deploy",
        summary:
          "Same Skills source, three IDE targets. deploy.sh installs to Claude Code, deploy-cursor.sh exports to Cursor, deploy-kiro.sh converts to Kiro Custom Agents. The workflow doesn't care which editor you're in this month.",
        requestedBy: "AI workflows shouldn't be tied to a single tool — too much churn in the IDE space to bet on one",
        shippedAt: "2026-05",
        version: "v0.3.0",
        impact:
          "Switching IDEs no longer means redoing your workflow. Same prompts, same hooks, same dispatch manifest — wherever you're working.",
        details:
          "Each deploy script handles its target's quirks. Cursor: per-skill files merged into ~/.cursor/skills/, hooks merged into ~/.cursor/hooks.json. Kiro: each Skill and Subagent converted to a Custom Agent JSON via a Python converter, per-agent hook wiring (so guard-session-scope only fires for the orchestrator, not for dev). Tool name aliases handled (Kiro accepts 'read'/'write'/'shell' or the legacy aliases). WebSearch / WebFetch dropped with a stderr warning when no MCP equivalent exists.",
        myContribution:
          "One source, three runtimes. The IDE is a deployment target, not the source of truth. Lets the workflow survive whichever editor wins the next round.",
        gallery: [
          {
            src: "/ai-squad/deploy-targets.png",
            alt: "Three-panel terminal screenshot side by side — left panel labeled 'Claude Code' showing deploy.sh output with files copied to ~/.claude/skills/ and ~/.claude/agents/; middle panel labeled 'Cursor' showing deploy-cursor.sh output with skills exported and hooks.json merged; right panel labeled 'Kiro' showing deploy-kiro.sh output with per-Skill conversion to JSON Custom Agents at ~/.kiro/agents/",
            caption: "one source · three runtimes",
          },
        ],
      },
    ],
  },

  {
    id: "CalendarFR",
    slug: "calendarfr",
    translationKey: "calendarfr",
    year: "2026",
    startedAt: "2026-05",
    category: "personal tool",
    images: [],
    skills: [skills.react, skills.typescript, skills.github],
    links: { route: "/work/calendarfr" },
    status: "wip",
    cover: { kind: "custom", component: "MiniCalendar" },
    stackChips: ["Vite + React", "Fastify", "Tiptap"],
    aiTool: "Claude",
    motivation:
      "Every year I'd buy a planner and drop it by February. Built one that lives where I already am.",
    motivationContext: "— may 2026, the third unused planner on the shelf",
    buildLog: [
      {
        date: "2026-05-08",
        version: "v0.1",
        title: "Monorepo and design system scaffolded before any feature.",
        body: "Started with the boring parts on purpose: React 19 + Vite 5 in <ai>web/</ai>, Fastify 5 companion API in <ai>server/</ai>, shared types in a workspace package, a Playwright + Jest test harness, and a paper-textured design system (Caveat for the handwritten lines, Inter for everything functional, a 24px baseline grid enforced in e2e). Type coverage gate at 95% in CI before line one of business logic. The investment paid for itself by the second feature.",
      },
      {
        date: "2026-05-09",
        version: "v0.2",
        title: "Server companion ships with the lazy-create data model.",
        body: "Fastify API live with <ai>/api/days/:date</ai> (GET/PUT), Zod schemas on every request, atomic JSON writes. The data-model decision that shaped everything after: GET on an empty date returns an in-memory skeleton without persisting. A blank day is a real state, not a missing record — and the filesystem doesn't fill up with empty files for every date I might scroll past.",
      },
      {
        date: "2026-05-10",
        version: "v0.3",
        title: "Daily page orchestrator stitches the experience together.",
        body: "FEAT-012: one swipeable page per day — morning Intention header, an hourly Agenda from 06h to 23h, Priorities, Notes, Mood picker, evening Gratitude. Tiptap is the only component that knows what rich text is; the rest of the app treats it as a black box. HTML sanitization is restrictive on purpose — four inline tags allowed (bold, italic, underline, strike), mirrored on client and server. Less rope, fewer cuts.",
        callouts: [
          {
            kind: "rule",
            label: "the rule",
            body: "One feature owns the library. Everyone else sees the abstraction. The day Tiptap breaks, exactly one file needs to change.",
          },
        ],
      },
      {
        date: "2026-05-19",
        version: "v0.4",
        title: "Supabase migration begins — Fastify on the way out.",
        body: "FEAT-030: traded the Fastify + JSON filesystem prototype for Supabase. Relational schema, RLS on every table, the React app talks to Supabase directly (no BFF). Three more FEATs queued — auth (email + password), days persistence, decommission Fastify. The migration roadmap was driven by the founders cohort pricing decision: multi-tenant and auth become mandatory the moment someone pays.",
      },
    ],
    results: [
      { value: "12", label: "days · foundation to Supabase migration" },
      { value: "150", label: "commits" },
      { value: "14", label: "features shipped" },
      { value: "456", label: "test files · unit, integration, e2e" },
    ],
    retrospective:
      "The thing I keep relearning: a feature that feels playful in the spec can quietly eat the build. FEAT-029 added ceremonial audio — quest completion sounds, day-complete fanfares. It was charming. Then I caught myself tuning sound timing instead of shipping the daily page, and ripped the whole system out the same week (<ai>chore(FEAT-029): drop the sound system entirely</ai>). What did pay off didn't feel rewarding while writing it: type coverage gated at 95%, dependency-cruiser blocking cross-feature imports, <ai>console.error</ai> wired to fail tests. Those are the rules that kept 14 features in 12 days from collapsing into one folder.",
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
