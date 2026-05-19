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
