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
      website: "https://website.bettersmpmc.net",
      wiki: "https://website.bettersmpmc.net/wiki",
    },
    status: "live",
    // To swap the cover to a gameplay reel (kind: "video"), drop the file at
    // public/bettersmp/preview.mp4 and update the cover below to:
    //   cover: { kind: "video", src: "/bettersmp/preview.mp4", alt: "BetterSMP gameplay reel, 15-30s cut: spawn lobby → ELITE mob spotted → Supply Drop arena → Auction House" },
    cover: { kind: "custom", component: "MinecraftPixels" },
    server: {
      address: "bettersmpmc.net",
      version: "1.21.x",
      edition: "both",
      bedrockPort: 19132,
      banner: "/bettersmp/craftlist-banner.gif",
      bannerAlt: "BetterSMP, bettersmpmc.net · Bedrock port 19132",
    },
    stackChips: ["Java", "Spigot"],
    aiTool: "Claude",
    motivation:
      "Hyped Minecraft servers are AFK farms. Nothing to do, nothing new. We just wanted something better.",
    motivationContext: "me and my friends, february 2026",
    buildLog: [
      {
        date: "2026-02-26",
        version: "v0.1",
        title: "Server up. Auction House and Economy first.",
        body: "Set up a Purpur server (a faster fork of the standard Minecraft server) on 1.21.x, with Geyser and Floodgate so Bedrock players can join a Java server. First two plugins: the auction house and the economy. I don't write Java, so <ai>Claude</ai> wrote the code. I wrote the permission tree and decided what each command was allowed to do.",
      },
      {
        date: "2026-03-25",
        version: "v0.4",
        title: "First daily community goal.",
        body: "Shipped the first daily mission: everyone online works toward the same target and shares the reward when it clears. The first week taught me the rest. Every progress update was pushed to every player's screen at once, and during busy trading hours it flickered like an alarm. I added a per-player cooldown and a login reminder.",
        callouts: [
          {
            kind: "changed",
            label: "changed by hand",
            body: "The first version had no limit on the progress updates. With six players online it already flickered. I wrote a 5-second cooldown per player before the next try.",
          },
        ],
      },
      {
        date: "2026-04-11",
        version: "v0.5",
        title: "World Events and ELITE Mobs.",
        body: "Two of the biggest systems went live together. World Events: every few hours an arena spawns somewhere with waves of enemies, a boss, and rewards for the top survivors. ELITE Mobs: rare named enemies spawn in the open world, and players either track them by direction or buy the exact coordinates from whoever found them first. Information became its own economy.",
      },
      {
        date: "2026-05-01",
        version: "v1.0",
        title: "RPG launch.",
        body: "The RPG layer went live. Pick a class (Miner first, Hunter and Farmer a week later), work through a four-tier quest line, build trust with the NPCs. A compass at the top of the screen points at your target. The quests are YAML files, so content is just data. I added a lint test suite because <ai>Claude</ai> kept quietly breaking the quest format between edits, and nobody noticed until a player got stuck.",
        callouts: [
          {
            kind: "rule",
            label: "the rule",
            body: "I never learned Java. Claude writes every line. My job is the architecture, the tests, and stopping it before it ships something that breaks in production.",
          },
        ],
      },
      {
        date: "2026-07-04",
        version: "v2.0",
        title: "RPG Season 2, plus Dungeons and Parties.",
        body: "Season 2 replaced the profession grind with talent trees, and archived everyone's season 1 progress instead of deleting it. Dungeons shipped alongside it: instanced wave fights for parties of two to four, reusing the PvP arena map so nothing new had to be built. Death in a dungeon drops your items for real, because a safe copy plus a real drop is an item-duplication bug waiting to happen.",
      },
    ],
    results: [
      { value: "0", label: "lines of Java I wrote" },
      { value: "33", label: "plugins live" },
      { value: "12wk", label: "live in prod" },
      { value: "3", label: "RPG classes live" },
    ],
    retrospective:
      "I don't know Java. What I bring is the architecture, the test plan, and knowing when to stop Claude before it ships something that breaks. The hardest lessons were the ones close to money, identity, and permissions. A price stored as a floating-point number instead of integer cents. A shulker preview that was read-only on screen but read-write underneath. Now anything that touches those three gets its rules written down before the first prompt. The rest is typing.",
    plugins: [
      {
        name: "World Events · Supply Drop",
        summary:
          "Every few hours the world wakes up. An arena spawns somewhere on the map, waves of enemies appear, a boss shows up, and players race in for the loot.",
        requestedBy: "the weekly hype moment",
        shippedAt: "2026-04",
        version: "v1.0.0",
        impact:
          "A reason to be online at peak hours. When the Discord alert fires, players drop what they're doing and come back. The server has a pull beyond 'log in to mine.'",
        details:
          "The first version hardcoded one handler per event. The second put everything (wave timing, which mobs, reward tiers, difficulty) in a YAML config the game reads at runtime. Adding a new event became a config change instead of a new plugin. Production taught me the timing: one or two hours apart burned people out, twelve-plus felt empty, and a Discord ping before it spawns gives it weight.",
        myContribution:
          "Events are data, not code. A new event type ships as config, without a deploy.",
        gallery: [
          {
            src: "/bettersmp/world-events-supply-drop.mp4",
            alt: "Supply Drop event, 20-30s clip: Discord-style pre-alert in chat, lime-glass arena marker appearing in open biome, first wave of zombies/skeletons/spiders, mini-boss zombie spawning, chest unlocking after boss death, top survivor opening reward",
            caption: "Supply Drop · full cycle",
            kind: "video",
          },
          {
            src: "/bettersmp/world-events-supply-drop-rewards.png",
            alt: "Reward chest opening screen, top survivor receives $25,000 + 80 shards + resource crate key; runners-up shown in side panel",
            caption: "Winner bonus",
          },
        ],
      },
      {
        name: "ELITE Mobs",
        summary:
          "Rare named enemies spawn somewhere in the open world. Whoever finds one gets the loot.",
        requestedBy: "the anti-idle idea, made literal",
        shippedAt: "2026-04",
        version: "v1.0.0",
        impact:
          "Farming the same corner stops working when rare loot can spawn 14,000 blocks away, and the player next to you might know where. People walk around, talk, and decide what a location is worth.",
        details:
          "The first version showed exact coordinates and died in two days, because finding the mob was just following a marker. I rewrote it to show only a direction (north, south, east, west) and added a screen where players can sell the exact coordinates to each other for in-game money. The rarest thing on the server isn't the loot, it's knowing where it is.",
        myContribution:
          "Information as currency. The rare item is now 'where the rare item is.'",
        gallery: [
          {
            src: "/bettersmp/elite-mobs-spawn.mp4",
            alt: "ELITE mob hunt, 15s clip: wide third-person shot of player walking, BossBar HUD at top shows cardinal direction (N), player turns and direction updates in real time, finally finds the rare mob (e.g. named Zombie) glowing in the wild",
            caption: "Cardinal HUD · tracking",
            kind: "video",
          },
          {
            src: "/bettersmp/elite-mobs-purchase-coords.png",
            alt: "PurchaseConfirmGui screenshot, popup showing a seller's offer of exact ELITE mob coordinates, price in gold, confirm/cancel buttons",
            caption: "Coords-as-currency",
          },
        ],
      },
      {
        name: "RPG · Professions",
        summary:
          "Pick a class (Miner, Hunter, or Farmer) and work through a four-tier quest line. NPCs you build trust with, a journal that tracks your progress, and a compass at the top of the screen pointing at your next target.",
        requestedBy: "depth instead of grind, and content that survives an AI edit",
        shippedAt: "2026-05",
        version: "v1.0.0",
        impact:
          "A long-term goal beyond collecting resources. New players get a path to climb; veterans get something to optimize. A session goes from '15 minutes of mining' to 'one tier closer to the top.'",
        details:
          "The quests live in YAML files, one per class and tier. That had a cost: Claude kept quietly breaking the format between edits, and nobody noticed until a player got stuck. So the plugin grew a lint test suite that fails the build if a quest file drifts from its shape. I planned six classes and shipped three, which was the right size for the launch.",
        myContribution:
          "Content is data, and data needs tests. The lint suite caught a whole class of bug the AI kept re-introducing.",
        gallery: [
          {
            src: "/bettersmp/rpg-profession-menu.png",
            alt: "Profession selection menu, three cards in a row: Miner (active, T2 in progress, progress bar 65%), Hunter (T1 active), Farmer (locked, switch cost shown). Better+ discount tag visible on the switch button.",
            caption: "/rpg menu",
          },
          {
            src: "/bettersmp/rpg-quest-journal.png",
            alt: "Quest journal book open, left page lists active Miner T1 quest with target (mine 64 deepslate), current progress (28/64), and reward summary. Right page shows tier requirements.",
            caption: "Quest journal",
          },
          {
            src: "/bettersmp/rpg-compass-bossbar.png",
            alt: "Screenshot framed on the top of the screen, BossBar shows compass arrow facing NE, distance text reads '142 blocks', quest title 'Find the abandoned mineshaft'",
            caption: "Compass HUD",
          },
        ],
      },
      {
        name: "RPG · Season 2 · Talents",
        summary:
          "Season 2 replaced the profession grind with talent trees. Each class has its own tree of talents you rank up from 0 to 4, unlocked by finishing a short story quest and spending points.",
        requestedBy: "season 1 was a straight line; players wanted choices",
        shippedAt: "2026-07",
        version: "v2.0.0",
        impact:
          "Two players on the same class can now build differently. A miner can go for an ore-finding sonar or for faster mining. The choice gives veterans a reason to come back for a new season.",
        details:
          "Each talent has four ranks and a story quest that unlocks it. Starting Season 2 archives your Season 1 progress and hands you a clean slate, so nobody loses their old work and everyone starts even. The season window (start and end dates) lives in one config file, so rolling a new season is a config change, not a code change.",
        myContribution:
          "A full reset that keeps the old data. Season 1 progress is archived, not deleted, so the reset never costs a player their history.",
      },
      {
        name: "Dungeons",
        summary:
          "Instanced wave fights for parties of two to four. Clear rounds of custom mobs, beat the boss, claim a daily reward. Each run gets its own copy of the world that's thrown away when it ends.",
        requestedBy: "PvE with real stakes, to sit next to the RPG",
        shippedAt: "2026-07",
        version: "v1.0.0",
        impact:
          "A reason to team up. The first dungeon reuses the PvP arena map, so it shipped without building a new world, and RPG talents stay active inside so your class build actually matters.",
        details:
          "The whole party gets a confirmation prompt before entering, with a red warning that items you drop on death are lost if everyone wipes. Death is real: you drop your items like normal Minecraft, a teammate can grab them, and there's no inventory backup, because a backup plus a real drop is an item-duplication bug waiting to happen. Each run clones the arena into a throwaway world and deletes it on the way out, win or lose.",
        myContribution:
          "Real death, no safety net, because the safe version dupes items. The warning is shown before you commit, not after.",
      },
      {
        name: "Auction House",
        summary:
          "Players list items, others browse by name or category and buy instantly. A small player-to-player market.",
        requestedBy: "to stop people shouting prices in chat",
        shippedAt: "2026-02",
        version: "v1.0.0",
        impact:
          "Killed the 'selling 50g for a stack of diamonds' spam. Players trade at any hour, even when nobody's online to haggle. The market runs around the clock.",
        details:
          "Most servers reach for a full database here. I used embedded SQLite: one file, no separate process to babysit. A hundred-player server doesn't need more. The bug worth mentioning got caught in review: the first draft stored prices as floating-point numbers, which quietly lose cents. I switched to integer cents before it went live.",
        myContribution:
          "Picked the smaller database. Money as integer cents, never floats.",
        gallery: [
          {
            src: "/bettersmp/auction-house-listings.png",
            alt: "Auction House main GUI, full grid with at least 8 player-listed items visible (mix of armor, tools, blocks), search bar focused at top, category filter dropdown open showing material categories",
            caption: "/ah · browse",
          },
          {
            src: "/bettersmp/auction-house-my-listings.png",
            alt: "Auction House 'my listings' view, seller's own 4 active listings shown with price, time remaining, and cancel button per row",
            caption: "/ah my",
          },
          {
            src: "/bettersmp/auction-house-history.png",
            alt: "Auction House sales history view, list of completed sales with date/time, buyer name, item, sale price",
            caption: "/ah history",
          },
        ],
      },
      {
        name: "Global Missions",
        summary:
          "One server-wide goal per day. Everyone contributes, everyone shares the reward when it's done.",
        requestedBy: "a daily reason to log in that isn't grinding alone",
        shippedAt: "2026-03",
        version: "v1.0.0",
        impact:
          "Everyone pulling toward the same goal creates a pressure solo objectives can't. Late in the day, players coordinate to push it over the line.",
        details:
          "The hard part wasn't the goal, it was the feedback. Every sale pushed a progress update to every player's status bar (the thin line above the hotbar). With six people online and a busy market, the screen flickered like an alarm. A 5-second limit per player turned it from a fire hose into a heartbeat. How often you show feedback matters as much as the feature itself.",
        myContribution:
          "Feedback rate is part of the design. A 5-second limit saved the screen from itself.",
        gallery: [
          {
            src: "/bettersmp/global-missions-toast.png",
            alt: "First-login title screen, large 'Daily Mission' title across the top, chat-style toast below describing the day's mission (e.g. 'Server goal: 10,000 wheat sold to shops'), reward summary",
            caption: "join toast",
          },
          {
            src: "/bettersmp/global-missions-menu.png",
            alt: "Global mission GUI, single mission card at the top with target text and tier badge (T3), a server-wide progress bar showing % complete, leaderboard of top 5 contributors below",
            caption: "/globalmission",
          },
        ],
      },
      {
        name: "Pets",
        summary:
          "Fifteen cosmetic companions. A bee, a wolf, a baby axolotl. They follow you and sit on command, and that's all they can do.",
        requestedBy: "the line we wouldn't cross on monetization",
        shippedAt: "2026-04",
        version: "v1.0.0",
        impact:
          "A way to support the server that never touches gameplay. Players who want to pay have somewhere to spend; players who don't are never at a disadvantage.",
        details:
          "No damage, no picking up items, no attacks, no block changes, no potion effects. The cosmetic-only rule isn't a line in the docs, it's seven event listeners that cancel every harmful thing a pet could do, at the highest priority. The moment a pet acts like a real mob, the listener cancels it before the game commits.",
        myContribution:
          "The cosmetic-only rule is enforced in code, not written in docs.",
        gallery: [
          { src: "/bettersmp/pet-better-pup.png", alt: "Better+ Pup pet, small pale wolf companion (baby, scale 0.72) following the player at ground level. Better+ entitlement icon visible.", caption: "Better+ Pup" },
          { src: "/bettersmp/pet-mini-enderman.png", alt: "Mini Enderman pet, half-scale (0.5) Enderman following silently behind the player", caption: "Mini Enderman" },
          { src: "/bettersmp/pet-red-parrot.png", alt: "Red Parrot pet, floating red-variant parrot at scale 0.9, height-offset 0.95 (shoulder height)", caption: "Red Parrot" },
          { src: "/bettersmp/pet-baby-axolotl.png", alt: "Baby Axolotl pet, baby axolotl companion at scale 0.85", caption: "Baby Axolotl" },
          { src: "/bettersmp/pet-forest-fox.png", alt: "Forest Fox pet, baby red-variant fox at scale 0.72, trotting beside the player", caption: "Forest Fox" },
          { src: "/bettersmp/pet-mini-bee.png", alt: "Mini Bee pet, baby bee floating at shoulder height, scale 0.65, height-offset 0.95", caption: "Mini Bee" },
        ],
      },
      {
        name: "PvP · Arena & Duels",
        summary:
          "Three ways to fight. One-on-one duels with your own gear or a fixed kit, and a free-for-all arena where everyone gets a maxed kit and fights until they leave. Your real inventory is never on the line.",
        requestedBy: "a fight system that doesn't cost you your real gear",
        shippedAt: "2026-04",
        version: "v1.1.0",
        impact:
          "People actually fight when losing costs nothing. The arena keeps a kills leaderboard; duels keep a separate one per mode. Same-IP kills don't count, so nobody farms stats on an alt.",
        details:
          "The first duel version trusted players to use the kit. They brought enchanted netherite instead, with nothing to lose. So now entering any mode saves your real inventory to disk, loads the kit, and restores your gear when you leave, die, disconnect, or the server crashes mid-fight. Either the match commits fully or it rolls back fully, like a database transaction.",
        myContribution:
          "Treat the fight as a transaction. Save on entry, restore on exit, whatever happens in between.",
        gallery: [
          {
            src: "/bettersmp/pvp-duel-menu.png",
            alt: "Duel menu GUI, two large mode cards (Classic and Kit Duel), queue button, arena pool indicator, current top 5 leaderboard preview at the bottom",
            caption: "/duel",
          },
          {
            src: "/bettersmp/pvp-kit-duel.mp4",
            alt: "Kit Duel match, 30s clip: two players accept a duel from the menu, teleport into a stone-walled arena, fight with identical kit gear (no real inventory), one dies, 60s loot window timer appears on the BossBar, winner walks to drops",
            caption: "Kit Duel · full match",
            kind: "video",
          },
        ],
      },
      {
        name: "Better+",
        summary:
          "The subscription tier. A few dollars a month for extra home slots, a chat tag, an exclusive pet, and a discount on RPG class changes.",
        requestedBy: "monetization that respects the no-pay-to-win rule",
        shippedAt: "2026-04",
        version: "v1.0.0",
        impact:
          "Steady income without pay-to-win. Subscribers get convenience, never power. The server pays for itself and the community doesn't feel squeezed.",
        details:
          "Three plugins, three jobs. Payment lives in the billing platform. A separate plugin owns the state: is this player subscribed, when does it end. This one just reads that state and turns it into features. When a subscription ends, the perks turn off but the data stays. The extra home slots you set up are still there, you just can't visit until you renew.",
        myContribution:
          "Ending a subscription turns off access, never deletes data. Payment, state, and features are three separate plugins on purpose.",
        gallery: [
          {
            src: "/bettersmp/better-plus-status.png",
            alt: "/better+ status output in chat, message block showing 'Active', expiry date 'expires 2026-06-12', perks list (homes 4-5 unlocked, 50% RPG switch discount, Better+ Pup, Better+ chat suffix)",
            caption: "/better+ status",
          },
          {
            src: "/bettersmp/better-plus-chat-suffix.png",
            alt: "In-game chat screenshot, three messages from different players, the Better+ subscriber's name rendered with the [b+] suffix in subtle blue, others without",
            caption: "chat suffix",
          },
        ],
      },
      {
        name: "Shards",
        summary:
          "A second currency. Players earn it over time and spend it on crate-style rewards.",
        requestedBy: "a luck-based currency that stays away from the market",
        shippedAt: "2026-03",
        version: "v1.0.0",
        impact:
          "A second loop that doesn't compete with the market. Players grind shards for random rewards while the gold economy stays about real trade. Two reward systems, neither eating the other.",
        details:
          "The key call was making shards non-tradeable. No paying, no listings, no transfers between players. The market runs on gold, the crates run on shards, and the two never touch. Without that wall, players would trade one against the other within a week.",
        myContribution:
          "Non-tradeable on purpose. Two economies that never cross, so there's nothing to arbitrage.",
        gallery: [
          {
            src: "/bettersmp/shards-balance.png",
            alt: "/shards chat output, shard balance number (e.g. 1,240), 'earning 0.5/min' line under it, hint to use /shardcrates",
            caption: "/shards",
          },
          {
            src: "/bettersmp/shards-crates.png",
            alt: "/shardcrates GUI, 9-slot grid of crate types (Common, Resource, Rare, Epic), each showing the shard price tag and a preview of one possible loot item; sample loot panel on the right",
            caption: "/shardcrates",
          },
        ],
      },
      {
        name: "Onboarding",
        summary:
          "First-time players get walked through the server. A core tour hands out a starter kit, an optional extra tour hands out crate keys, and a status bar at the top tracks your next step.",
        requestedBy: "the funnel decides retention; players follow the arrow, not the rules",
        shippedAt: "2026-04",
        version: "v1.0.0",
        impact:
          "The first fifteen minutes decide who stays. Players who finish the tour stick around; players who quit at step three don't come back. Getting this right beats any feature ten hours in.",
        details:
          "It's a state machine, and the steps come from a YAML file. The bug I caught early: a standing-still player could finish two steps in the same instant because both conditions were met at once. A 5-second gap per step fixed the ordering. And if the starter kit fails to deliver for any reason, the player's progress is kept and staff gets paged. Losing your kit on minute one is the worst first impression there is.",
        myContribution:
          "Steps need an order even when they happen milliseconds apart. The 5-second gap made it hold.",
        gallery: [
          {
            src: "/bettersmp/onboarding-bossbar.png",
            alt: "Top-of-screen close-up, BossBar shows current step title 'Welcome Hub', hint text below ('Head to the Welcome to BetterSMP hologram at spawn center'), small phase label 'Core' on the right, no other HUD chrome",
            caption: "BossBar HUD",
          },
          {
            src: "/bettersmp/onboarding-tour.mp4",
            alt: "New player onboarding, 20-30s clip: player joins spawn, 3s delay, BossBar fades in with first step, player walks to the holographic 'Welcome to BetterSMP' sign, REACH_RADIUS triggers, 'Objective complete' title fades in, next step text appears on the BossBar",
            caption: "Core tour · first steps",
            kind: "video",
          },
        ],
      },
      {
        name: "Tools · Better Pickaxe / Shovel / Axe",
        summary:
          "Three custom mining tools earned through RPG progression. The axe also fells a whole tree in one swing, up to 64 connected logs of the same wood.",
        requestedBy: "items that feel earned, not dropped",
        shippedAt: "2026-04",
        version: "v1.0.0",
        impact:
          "Gives RPG progression something to show for it. Hitting a high tier means a named tool is yours, and every player who hovers it can see it.",
        details:
          "Every custom item on the server keys its identity to typed metadata, not its name. Display names are user-editable: players can rename an item at an anvil and pretend it's the rare one. A typed server-side key can't be faked. The tree-felling has a hard cap too, because without one a huge jungle tree would freeze the main server thread for a noticeable beat.",
        myContribution:
          "Item identity lives in typed metadata, not text. Names can be faked; typed keys can't.",
        gallery: [
          {
            src: "/bettersmp/tools-pickaxe-tooltip.png",
            alt: "Inventory close-up, Better Pickaxe item hovered, tooltip shows dark-purple bold 'Better Pickaxe' name, enchant list (Efficiency / Unbreaking / Fortune), and the PDC id 'bettersmp_pickaxe' visible via F3+H (op view)",
            caption: "Better Pickaxe · PDC identity",
          },
          {
            src: "/bettersmp/tools-vein-mining.mp4",
            alt: "Vein mining demo, 10-15s clip: player holds Better Axe, faces the bottom log of an oak tree, breaks it; cascade fells the entire trunk (up to 64 logs), drops collect at the player's feet, single durability tick on the axe",
            caption: "Better Axe · vein mining",
            kind: "video",
          },
        ],
      },
      {
        name: "Cosmetic Tags",
        summary:
          "Players earn chat tags as progression rewards. Only one shows at a time.",
        requestedBy: "progression should be visible to other players, not hidden in a menu",
        shippedAt: "2026-03",
        version: "v1.0.0",
        impact:
          "Progression that shows up in chat. Players carry the tag next to their name, so it's visible proof instead of a number in a menu.",
        details:
          "Showing every tag at once turned names into a wall nobody read, so it's one at a time. The fun one is the activity tag: log in three days straight and you get a streak; miss a day and it resets. It's timezone-aware, because a login at 23:55 on your clock should count as today, not yesterday in server time. Get that wrong and a daily reward feels random.",
        myContribution:
          "One tag at a time. Showing all of them turned every name into a billboard.",
        gallery: [
          {
            src: "/bettersmp/cosmetic-tags-menu.png",
            alt: "/tags GUI, 9-slot inventory menu: 'None' slot in position 0, three unlocked tag slots ([ALPHA GOD] in gold bold, [Event Winner] in green, [active_streak] in aqua), currently selected tag highlighted with an enchant glint",
            caption: "/tags",
          },
          {
            src: "/bettersmp/cosmetic-tags-chat.png",
            alt: "In-game chat screenshot, three player messages: one with [ALPHA GOD] gold-bold prefix, one with [active_streak] aqua prefix, one plain. Tab list on the side shows the same prefixes against player names.",
            caption: "tag rendering",
          },
        ],
      },
      {
        name: "Shulker Preview",
        summary:
          "Shulker boxes are containers you carry in your inventory. This lets you right-click one to see what's inside without placing it.",
        requestedBy: "the market only works if buyers can see what they're buying",
        shippedAt: "2026-04",
        version: "v1.0.0",
        impact:
          "Closed the trust gap on bagged listings. Without a preview, buying a shulker is a gamble; with it, the market works.",
        details:
          "Listing a shulker used to be a black box: buyers saw the icon, not the contents. So the preview lets them look before paying. The trick was making it truly read-only. The first version just opened the real shulker, which is a 30-second item-duplication exploit, because what looks read-only on screen is read-write underneath if nothing stops the take. The fix cancels every take at the listener level.",
        myContribution:
          "Read-only enforced at the listener, not just the UI. That closed the trust gap on the market.",
        gallery: [
          {
            src: "/bettersmp/shulker-preview-rightclick.mp4",
            alt: "Inventory preview demo, 8-12s clip: player opens inventory, hovers a red shulker box, right-clicks it (no placement), a read-only 27-slot preview GUI opens labeled 'Shulker Preview', player tries to take an item (cancelled), closes with Esc",
            caption: "right-click preview",
            kind: "video",
          },
          {
            src: "/bettersmp/shulker-preview-ah-confirm.png",
            alt: "Auction House buy-confirm screen, top half shows the shulker listing (item icon + seller + price), middle inline panel shows the shulker's full 27-slot contents (grid of items), bottom row has Confirm and Cancel buttons",
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
    //   cover: { kind: "video", src: "/soundwave/preview.mp4", alt: "SoundWave Summit, 20s recording flow: hit record → speak → stop → analysis appears with topics, decisions, action items" },
    cover: { kind: "custom", component: "Waveform" },
    stackChips: ["Vite + React", "Supabase", "Google AI", "Deepgram"],
    aiTool: "Claude",
    motivation:
      "I kept losing the good parts of meetings. Built a pipeline to surface what I missed.",
    motivationContext: ",  december 2025, after the third meeting I couldn't remember the next morning",
    buildLog: [
      {
        date: "2025-12-10",
        version: "v0.1",
        title: "Scaffolded on Lovable. SaaS UI for audio in one evening.",
        body: "Started from a Vite + React + shadcn template through Lovable Cloud, the entire UI shell, auth shapes, and routing landed before I wrote any business logic. Wanted to see the surface first, then carve out what would actually pay rent.",
      },
      {
        date: "2025-12-11",
        version: "v0.2",
        title: "Day-two sprint: ditched the default provider, wired Stripe, set the credits floor.",
        body: "Lovable's default routed everything through OpenAI. Killed it the same day, latency on 50-minute transcripts was unworkable. Switched the analysis brain to Google AI, wired Stripe + webhook for paid plans, set the first MVP credits UX. Day two of selling something.",
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
        body: "Added separate <ai>meetings</ai> and <ai>meeting_transcripts</ai> tables for live-capture flows. The product now had two entry paths (record a meeting in the app or upload an existing file) both ending in the same analysis pipeline.",
      },
      {
        date: "2026-05-11",
        version: "v0.8",
        title: "Transcription chain ships with circuit breakers.",
        body: "Stopped trusting any single transcription provider. Built a fallback chain, Deepgram nova-2 first (fast and cheap), Deepgram whisper-large as the backup (better with noise), Gemini Flash as the last resort (the brain we already use for analysis). Each model has its own circuit breaker: open it after consecutive failures, half-open after a cooldown, closed when it recovers. A 24-hour Postgres view tells me which provider is misbehaving before the support tickets do.",
      },
      {
        date: "2026-05-18",
        version: "v1.0",
        title: "Public sharing with granular visibility.",
        body: "FEAT-009: any analysis can be made public, but the owner decides what's public. Eight independent toggles (audio, transcription, sentiment, speech-time, topics, decisions, insights, todos) each enforced at three layers: Postgres RLS, an Edge Function RPC, and the storage bucket policy on the audio file. Any one layer can fail without exposing data.",
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
      "What started as 'capture my own meetings' grew into a real platform (Stripe billing, anonymous flows, public sharing, multi-provider transcription with a circuit breaker. The thing that changed me most through this build wasn't a feature, it was the layering instinct. Anything that touches identity, money, or visibility now gets three independent enforcement layers) Postgres RLS, an Edge Function gate, a storage policy. Any one of them can fail without exposing data. The lesson generalizes: the UI is convenience. The real gate is at the data layer.",
    plugins: [
      {
        // TODO assets:
        //   /soundwave/transcription-metrics.png, admin dashboard showing the v_transcription_metrics_24h view: rows per model (deepgram-nova-2, deepgram-whisper-large, gemini-2.5-flash) with attempts_total, success_rate_pct, p50_duration_ms, p95_duration_ms
        //   /soundwave/transcription-attempts.png (single-job detail panel showing the transcription_attempts JSON array) three rows: nova-2 (error 4xx), whisper-large (circuit_open), gemini-2.5-flash (ok), with timing
        name: "Transcription Engine",
        summary:
          "Three speech-to-text providers in a fallback chain. If the first fails (or its circuit breaker is open), the next tries, and the next. Every attempt is logged; success rate is tracked per provider in a 24-hour rolling view.",
        requestedBy: "transcription that doesn't fail the user when one vendor has a bad day",
        shippedAt: "2026-05",
        version: "v1.0",
        impact:
          "A failed transcription stopped meaning 'show the error and lose the user.' A noisy meeting recording now goes through three providers and almost always comes back with a result, without the user ever knowing the first two were tried.",
        details:
          "Deepgram nova-2 (fast, cheap) runs first. If it fails, or if its circuit breaker tripped to open after consecutive errors, the request falls to Deepgram whisper-large, slower but better with noise. If that also fails, Gemini 2.5 Flash runs as the last resort. Every attempt writes to a JSONB column on the job: model, outcome, started_at, duration_ms. A Postgres view aggregates success rate and p50/p95 duration per model across the last 24 hours, useful when a provider starts degrading and the support tickets haven't caught up yet.",
        myContribution:
          "Graceful degradation as the default, not an afterthought. The circuit breaker means a bad day at one provider doesn't burn the user's quota retrying it.",
        gallery: [
          {
            src: "/soundwave/transcription-metrics.png",
            alt: "Admin metrics dashboard, three rows for deepgram-nova-2, deepgram-whisper-large, gemini-2.5-flash, each showing total attempts, success rate %, p50 and p95 duration in ms, over the last 24 hours",
            caption: "v_transcription_metrics_24h",
          },
          {
            src: "/soundwave/transcription-attempts.png",
            alt: "Single-job detail panel, transcription_attempts JSON array shown as three timeline rows: nova-2 (outcome: error), whisper-large (outcome: circuit_open), gemini-2.5-flash (outcome: ok), each with started_at and duration_ms",
            caption: "per-job retry log",
          },
        ],
      },
      {
        // TODO assets:
        //   /soundwave/analysis-result.png, finished analysis page: topics card (3 carousel items), decisions card, insights card, todos card, sentiment card with per-participant breakdown
        //   /soundwave/analysis-languages.png, output-language dropdown showing all 10 options (en/pt/es/fr/de/it/ja/ko/zh/ru) with one selected
        name: "Analysis Pipeline",
        summary:
          "Once an audio is transcribed, Gemini extracts the structured analysis (topics, insights, decisions, todos, sentiment) into a typed JSON object the front-end renders into cards. Defensive parsing handles the LLM responses that forget to format.",
        requestedBy: "a transcript alone isn't useful, the user wants the meeting's decisions, not the meeting's words",
        shippedAt: "2025-12",
        version: "v1.0",
        impact:
          "The product's actual job. A 50-minute meeting becomes a one-page summary the user can scan in 30 seconds: what was decided, what's next, who said what, how the room felt.",
        details:
          "Google Gemini 2.5 Flash (with 2.0 Flash as a faster fallback for short clips) takes the transcript and prompts for a structured response. Output language is one of 10 (en/pt/es/fr/de/it/ja/ko/zh/ru). The parser tries three strategies in order (direct JSON.parse, markdown code-block extraction, substring between the first '{' and the last '}') because LLMs occasionally forget formatting. If all three fail, the job retries with a tighter prompt. Sentiment analysis is gated to paid plans.",
        myContribution:
          "Structured output from an LLM deserves a real parser. The 'just JSON.parse it' approach works until it doesn't, and when it doesn't, the user sees an error instead of their meeting summary.",
        gallery: [
          {
            src: "/soundwave/analysis-result.png",
            alt: "Finished analysis page, top half shows a topics carousel (3 cards), middle shows decisions and todos lists, bottom shows insights and a sentiment card with per-participant emotion labels",
            caption: "analysis · all sections",
          },
          {
            src: "/soundwave/analysis-languages.png",
            alt: "Language picker open, dropdown menu listing all 10 output languages (English, Portuguese, Spanish, French, German, Italian, Japanese, Korean, Chinese, Russian) with one currently selected",
            caption: "10 output languages",
          },
        ],
      },
      {
        // TODO assets:
        //   /soundwave/worker-queue.png, admin view of the audio_jobs table: list of rows with status pills (queued / processing / done / error), worker_id column, locked_at timestamp, progress %
        name: "Audio Worker",
        summary:
          "A Node.js worker on Railway that processes audio outside of Supabase Edge Functions. Picks jobs from a Postgres queue, chunks the audio with ffmpeg, transcribes each chunk, writes the result back.",
        requestedBy: "ffmpeg can't run inside Edge Functions, and chunked audio finishes faster than a single huge upload",
        shippedAt: "2026-Q1",
        version: "v1.0",
        impact:
          "Long meetings (1 hour+) actually finish. Without time-based chunking, the LLM would time out on the audio before reaching the analysis step.",
        details:
          "Edge Functions can't spawn subprocesses, which makes ffmpeg unusable there, but ffmpeg is the only reasonable tool for time-based audio chunking. So the worker is a separate Node.js service on Railway. Jobs live in a Postgres `audio_jobs` table; the worker claims one atomically using `SELECT … FOR UPDATE SKIP LOCKED`, then writes a lease (`locked_at` / `locked_by`) so a crashed worker's job can be picked up after a timeout. Default chunk size is 120 seconds. The transcription chain runs per chunk; analysis runs once on the assembled transcript.",
        myContribution:
          "Pick the runtime that matches the operation. Edge Functions are perfect for short, stateless requests; ffmpeg-driven chunking is not that. One service per kind of work, not one service for everything.",
        gallery: [
          {
            src: "/soundwave/worker-queue.png",
            alt: "Audio_jobs admin view, table of recent jobs with columns: status pill (queued / processing / done / error), worker_id, locked_at timestamp, progress percentage, original_filename. One row currently processing, two done, one queued.",
            caption: "audio_jobs queue",
          },
        ],
      },
      {
        // TODO assets:
        //   /soundwave/visibility-toggles.png, settings panel with 8 toggle switches (audio, transcription, sentiment, speech_time, topics, decisions, insights, todos), each labeled, some on/some off
        //   /soundwave/public-view.png, public viewer of a shared analysis: visible sections rendered normally, hidden sections shown as 'not shared' placeholders
        name: "Public Sharing · FEAT-009",
        summary:
          "Any analysis can be made public with eight independent toggles: audio, transcription, sentiment, speech-time, topics, decisions, insights, todos. Public viewers get exactly what the owner allowed, nothing more, nothing less.",
        requestedBy: "owners wanted to share insights without sharing the raw transcript; 'all or nothing' was the wrong primitive",
        shippedAt: "2026-05",
        version: "v1.0",
        impact:
          "Users can share what's useful from a meeting (decisions, action items) without exposing the raw conversation. Was the most-requested feature in the support inbox before it shipped.",
        details:
          "Visibility is a JSONB column on the analysis row, validated by a `pg_jsonschema` CHECK constraint (with a pure-SQL fallback when the extension isn't available). Public reads go through a SECURITY DEFINER RPC that walks the visibility JSON and returns only the allowed fields. The storage policy gates the audio file at the signed-URL layer, a request for the audio fails at the bucket if `audio: false`, even if a UI somehow asks for it. `REVOKE SELECT … FROM anon` on the underlying table is the defense-in-depth: if everything else fails, the anon role still can't read the raw rows.",
        myContribution:
          "Three independent enforcement layers (RLS, RPC, storage policy) for a single property. Any one of them can fail without exposing data. The UI is convenience; the real gate is at the data layer.",
        gallery: [
          {
            src: "/soundwave/visibility-toggles.png",
            alt: "Visibility settings panel, eight labeled toggle switches in two columns: audio, transcription, sentiment, speech_time on the left; topics, decisions, insights, todos on the right. Four are on, four are off. Below: a 'copy public link' button.",
            caption: "8 toggles",
          },
          {
            src: "/soundwave/public-view.png",
            alt: "Public viewer of a shared analysis, header with title and 'shared publicly' badge, topics and decisions cards rendered normally, the audio player section replaced with a small 'audio not shared' placeholder, the transcription section greyed out with a similar placeholder",
            caption: "public view · respects toggles",
          },
        ],
      },
      {
        // TODO assets:
        //   /soundwave/anonymous-flow.mp4, 20-25s clip: landing page → 'try without signup' CTA → upload an audio file → see the analysis result without ever signing up
        //   /soundwave/anonymous-claim.png (signup completion screen showing 'We found 2 analyses you started before signing up) they've been added to your account' with a list
        name: "Anonymous-then-Claim Flow",
        summary:
          "Try the product without signing up. Upload audio, run an analysis, see the result. If you want to keep it, create an account, your in-progress analyses are claimed and migrated to your user automatically.",
        requestedBy: "signup-before-value was losing most visitors at the activation gap",
        shippedAt: "2026-Q1",
        version: "v1.0",
        impact:
          "First-time experience is 'see the product work on your own audio,' not 'fill out a form and verify your email first.' Activation rate measurably improved after this shipped.",
        details:
          "Three edge functions own the flow. `upload-anonymous-audio` writes the file under a session token. `create-anonymous-analysis` queues the job under that token. `claim-anonymous-analyses` runs at signup, re-attaching every analysis matching the session to the new user_id. Anonymous data has a hard expiry (7 days) so abandoned analyses don't accumulate. The same Stripe-aware quota check runs whether the analysis is anonymous or authenticated.",
        myContribution:
          "Activation friction is the first feature, not the last polish. Letting a visitor see the product work on their own audio (before any email) is what made the funnel actually convert.",
        gallery: [
          {
            src: "/soundwave/anonymous-flow.mp4",
            alt: "Anonymous flow demo, 20-25s clip: landing page with prominent 'try without signup' CTA, click → file upload modal → drop an audio file → processing animation → finished analysis appears (topics, decisions, todos visible). No signup wall, no email gate.",
            caption: "anonymous · full flow",
            kind: "video",
          },
          {
            src: "/soundwave/anonymous-claim.png",
            alt: "Post-signup screen (message reads 'We found 2 analyses you started before signing up) they've been added to your account.' Below, a list of two analysis cards with titles and created_at dates, both now linked to the new user.",
            caption: "claim on signup",
          },
        ],
      },
      {
        // TODO assets:
        //   /soundwave/recorder-active.mp4, 15-20s clip: user clicks record, sees the waveform indicator, switches browser tab (Picture-in-Picture window appears with mini waveform), tabs back (title was flashing), clicks stop, recording uploads
        //   /soundwave/recorder-safari.png, Safari-specific permission warning screen with a custom animation explaining how to grant mic + screen-share permissions in Safari's distinct prompts
        name: "Browser Recorder",
        summary:
          "Record audio in the browser: mic only, tab audio only, or both mixed together. Works across Chrome, Firefox, and Safari, each of which has its own personality. Falls back to local download if upload fails so the meeting is never lost.",
        requestedBy: "users wanted to record their meetings in the app, not export them after",
        shippedAt: "2025-12",
        version: "v1.0",
        impact:
          "Closed the loop. The user can hit a button, run a meeting, hit stop, and have a finished analysis minutes later, no exporting from a third-party tool, no file management.",
        details:
          "MediaRecorder API drives the capture. AudioContext mixes mic and tab/display streams through MediaStreamAudioSourceNode → GainNode → MediaStreamAudioDestinationNode so levels can be balanced before encoding. RecordRTC handles the actual recording. Safari has its own user-gesture rules and behaves differently with screen-share audio, there's a dedicated detection path with a custom warning animation. Picture-in-Picture API keeps a tiny preview visible when the user tabs away. Title flashing pulls them back when something needs attention. If upload to Supabase fails, the recording downloads locally so a 40-minute meeting isn't lost to a flaky network.",
        myContribution:
          "Browser APIs are services with personalities. Safari isn't broken, it's enforcing its own permission model, and the recorder has to know that. The download fallback was added after the first user lost a meeting to a network blip.",
        gallery: [
          {
            src: "/soundwave/recorder-active.mp4",
            alt: "Recording flow, 15-20s clip: user clicks the record button on the dashboard, waveform animation starts in the panel; user switches to a different browser tab and a small Picture-in-Picture window appears with a live waveform; user returns to the tab (title was flashing for attention); user clicks stop; upload progress completes",
            caption: "record · tab away · stop",
            kind: "video",
          },
          {
            src: "/soundwave/recorder-safari.png",
            alt: "Safari-specific permission walkthrough, modal with a Safari logo, animated illustration showing how to grant mic permission via Safari's distinct prompt, separate step for screen-share permission with the system dialog highlighted",
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
      alt: "ai-squad overview, fuzzy idea on the left flows through Discovery (Frame, Investigate, Decide) and SDD (Specify, Plan, Tasks, Build) into shipped code on the right",
    },
    stackChips: ["Python stdlib", "JSON schema", "Skills + Subagents"],
    aiTool: "Claude",
    motivation:
      "Using AI to code without a workflow was eating my afternoons. Built the gates I kept forgetting to walk through.",
    motivationContext: ",  april 2026, after the fourth feature I'd half-built and abandoned",
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
        body: "Prompt-discipline alone wasn't enough, Claude would happily edit files outside <ai>.agent-session/</ai> when nothing physically stopped it. Added pure-stdlib Python 3 hooks the runtime enforces: <ai>guard-session-scope</ai>, <ai>block-git-write</ai>, <ai>verify-audit-dispatch</ai>, <ai>verify-output-packet</ai>. The audit-agent is the last gate before handoff and refuses if the dispatch manifest doesn't reconcile against the output packets.",
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
      "What I wanted from this was a workflow that survived me forgetting to be disciplined. The first cut was all prompts, long, careful, full of \"you must\" language. It worked when I read every output. It failed the moment I trusted Phase 4 to run unattended. The fix was hooks: every load-bearing rule moved from \"the prompt asks\" to \"the runtime refuses.\" The second insight was multi-runtime, same Skills source, three IDE targets, because the workflow shouldn't care which editor I'm in this month. The third was the audit-agent: a single read-only reconciliation step at the end that refuses to hand off if the dispatch manifest doesn't match what actually ran. Boring, mechanical, and the reason I now trust the pipeline.",
    plugins: [
      {
        // TODO assets:
        //   /ai-squad/discovery-memo.png, example memo.md output: Frame section with opportunity + user + value hypothesis, Investigate section with codebase-mapper findings + 4 risk-analyst verdicts (validated/refuted/inconclusive per Cagan risk), Decide section with options table + human decision
        name: "Discovery Squad",
        summary:
          "For when you don't know if you should build something. Three phases (Frame, Investigate, Decide) that pressure-test an idea against the Cagan big risks (value, usability, feasibility, viability) before any line of code.",
        requestedBy: "the 'careful code that ships for nobody' problem",
        shippedAt: "2026-05",
        version: "v0.1.0",
        impact:
          "Stops a fuzzy idea from turning into 30 hours of careful implementation aimed at the wrong problem. Either it earns a decision memo and proceeds to SDD, or it dies cleanly with no sunk-cost regret.",
        details:
          "Phase 1 (Frame) is a conversational skill that drafts a memo with the opportunity, the user, the value hypothesis. Phase 2 (Investigate) dispatches a codebase-mapper plus four risk-analysts in parallel (one per Cagan big risk) and aggregates their findings. Phase 3 (Decide) generates an options table with a recommendation and requires a human decision before anything proceeds.",
        myContribution:
          "Discovery is its own pipeline, not a step inside SDD. Decisions made under build pressure tend to favor 'just build it'; separating the squads gives the idea a fair hearing.",
        gallery: [
          {
            src: "/ai-squad/discovery-memo.png",
            alt: "Discovery memo.md rendered in a code viewer, top section 'Frame' with opportunity statement + user + value hypothesis; middle 'Investigate' section with bullet findings from codebase-mapper + four risk-analyst verdicts each labeled (value, usability, feasibility, viability) with verdict tag (validated/refuted/inconclusive); bottom 'Decide' section with 3-option table and a Decision row with the human's choice highlighted",
            caption: "memo.md · all three phases",
          },
        ],
      },
      {
        // TODO assets:
        //   /ai-squad/sdd-tasks.png, example tasks.md output: list of 8 tasks with id (FEAT-001/T1, T2, ...), title, AC coverage tags (AC-001, AC-002 mapped per task), parallelization marker (parallel-safe vs sequential), estimated effort
        name: "SDD Squad, Specify, Plan, Tasks, Build",
        summary:
          "For when you have a clear pitch and need to ship it. Four phases (Specify, Plan, Tasks, Build) where the first three are conversational (you approve each gate) and the fourth runs autonomously.",
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
            alt: "Two-squad overview, left panel 'Discovery' with Frame/Investigate/Decide phases listed vertically with arrow flow; right panel 'SDD' with Specify/Plan/Tasks/Build phases. A bridge in the middle labeled 'Discovery says Proceed → compose pitch'",
            caption: "two squads · one source",
          },
          {
            src: "/ai-squad/sdd-tasks.png",
            alt: "tasks.md rendered as a list, 6-8 tasks each shown as: task ID (FEAT-001/T1, T2, ...), short title, AC coverage tags (AC-001, AC-002 mapped per task), parallelization marker (a 'parallel-safe' badge or 'sequential' badge), effort estimate",
            caption: "tasks.md · AC coverage + parallelization",
          },
        ],
      },
      {
        // TODO assets:
        //   /ai-squad/phase4-handoff.png, handoff.md screenshot: header with task_id + verdict (done), files_changed list, ac_coverage map (FEAT-001/AC-001: covered, AC-002: covered), evidence pointers, audit-agent verdict pill (audit-pass)
        name: "Phase 4, Autonomous Build",
        summary:
          "The autonomous build phase. For each approved task, the orchestrator dispatches a dev (test-first), then code-reviewer + logic-reviewer in parallel, then qa. Findings loop back up to 3 rounds. Up to 5 tasks run concurrently.",
        requestedBy: "the only way to trust an unattended pipeline is to give every step its own gate",
        shippedAt: "2026-05",
        version: "v0.1.0",
        impact:
          "Lets the human walk away after Phase 3. The pipeline runs to completion or escalates explicitly; either way, no silent failure.",
        details:
          "Dev runs first inside an isolated context, writing tests before implementation. code-reviewer (patterns and style) and logic-reviewer (edge cases and races) run in parallel against the same diff. Findings loop back to dev (max 3 rounds) until reviewers sign off. QA validates every acceptance criterion against the spec. If anything stalls or escalates, blocker-specialist writes a decision memo or kicks it back to the human.",
        myContribution:
          "Parallel reviewers with separate concerns (patterns vs. behavior) catch different bugs. The loop cap is what prevents an infinite dev-review ping-pong; the blocker-specialist is what lets the human be away when something goes wrong.",
        gallery: [
          {
            src: "/ai-squad/build-pipeline.svg",
            alt: "Phase 4 pipeline diagram, orchestrator on the left dispatching to dev (test-first), dev's output going to two parallel reviewers (code-reviewer and logic-reviewer) shown side by side, both feeding back into a 'findings?' gate that loops to dev (max 3 rounds), then onward to QA validating acceptance criteria, then a final handoff with a green checkmark. Bottom note: 'Up to 5 tasks run in parallel · escalation goes to blocker-specialist · audit-agent gates the handoff.'",
            caption: "Phase 4 · runs autonomously per task",
          },
          {
            src: "/ai-squad/phase4-handoff.png",
            alt: "handoff.md rendered in a code viewer, header with task_id and verdict pill 'done', section 'files_changed' listing 4-6 relative paths, section 'ac_coverage' showing AC-001/AC-002/AC-003 each marked 'covered' with the test file that covers it, section 'evidence' with PR-style links, footer 'audit-agent: pass' pill",
            caption: "handoff · verifiable artifact",
          },
        ],
      },
      {
        // TODO assets:
        //   /ai-squad/hooks-refuse.png, terminal output: orchestrator tries to edit a consumer-repo file outside .agent-session/, the guard-session-scope hook returns a structured refusal with the violated rule and the offending path
        //   /ai-squad/hooks-list.png, Skill frontmatter snippet showing preToolUse + stop hook references, with explanatory comments about which Skill/Subagent each hook is wired to
        name: "Mechanical Hooks",
        summary:
          "Discipline that lives only in a prompt is not discipline. These are pure-stdlib Python 3 hooks the runtime enforces, orchestrators can't edit consumer-repo files, can't run git writes, can't end a session without dispatching the audit agent. If the agent tries, the runtime refuses.",
        requestedBy: "the prompt-discipline gap, Claude would happily do the wrong thing if nothing physically stopped it",
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
            alt: "Terminal screenshot, orchestrator agent attempts an Edit tool call on a path outside .agent-session/ (e.g., consumer-repo/src/feature.ts). The guard-session-scope hook intercepts and returns a refusal block with: violated rule name, offending path, allowed paths, hint to re-scope the edit",
            caption: "guard-session-scope · refuses out-of-scope edit",
          },
          {
            src: "/ai-squad/hooks-list.png",
            alt: "Skill frontmatter YAML snippet shown with syntax highlighting, keys preToolUse: and stop: each listing 2-3 hook references (python3 paths under ~/.claude/hooks/), with line comments explaining 'guard-session-scope only fires for orchestrator, not dev'",
            caption: "per-Skill hook wiring",
          },
        ],
      },
      {
        // TODO assets:
        //   /ai-squad/audit-manifest.png, JSON dispatch-manifest.json shown in a syntax-highlighted viewer: declared_dispatches array with 3 expected roles, actual_dispatches array with role/task_id/dispatch_id for each completed Task call
        //   /ai-squad/audit-refused.png, handoff refusal screen: header 'AUDIT FAILED', list of 1-2 findings with role/dispatch gap (e.g., 'expected logic-reviewer for FEAT-001/T2, none recorded'), action button 'return to orchestrator'
        name: "Audit Agent + Dispatch Manifest",
        summary:
          "The last gate before handoff. The orchestrator declares the expected pipeline in a JSON manifest before any dispatch; the audit-agent reconciles declared dispatches against actual outputs before allowing handoff. If anything was bypassed, it refuses the handoff and surfaces the gap.",
        requestedBy: "the orchestrator-bypass problem, how do you know the pipeline you described is the one that actually ran?",
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
            alt: "dispatch-manifest.json open in an editor with JSON syntax highlighting, top-level keys: task_id, declared_dispatches (array of 3 expected roles: dev, code-reviewer, logic-reviewer, qa), actual_dispatches (array with role/dispatch_id/output_packet_path for each completed Task call, with timestamps)",
            caption: "dispatch-manifest · declared vs actual",
          },
          {
            src: "/ai-squad/audit-refused.png",
            alt: "Handoff refusal modal (header 'AUDIT FAILED' in red, body lists 2 findings: 'expected logic-reviewer for FEAT-001/T2) no dispatch recorded' and 'qa output_packet missing for FEAT-001/T2', footer with 'return to orchestrator' button. No handoff committed.",
            caption: "handoff refused · specific findings",
          },
        ],
      },
      {
        // TODO assets:
        //   /ai-squad/deploy-targets.png, three-panel side-by-side terminal output: panel 1 'deploy.sh' showing files copied to ~/.claude/, panel 2 'deploy-cursor.sh' showing skills exported + hooks.json merged, panel 3 'deploy-kiro.sh' showing per-Skill conversion to ~/.kiro/agents/*.json
        name: "Multi-runtime Deploy",
        summary:
          "Same Skills source, three IDE targets. deploy.sh installs to Claude Code, deploy-cursor.sh exports to Cursor, deploy-kiro.sh converts to Kiro Custom Agents. The workflow doesn't care which editor you're in this month.",
        requestedBy: "AI workflows shouldn't be tied to a single tool, too much churn in the IDE space to bet on one",
        shippedAt: "2026-05",
        version: "v0.3.0",
        impact:
          "Switching IDEs no longer means redoing your workflow. Same prompts, same hooks, same dispatch manifest, wherever you're working.",
        details:
          "Each deploy script handles its target's quirks. Cursor: per-skill files merged into ~/.cursor/skills/, hooks merged into ~/.cursor/hooks.json. Kiro: each Skill and Subagent converted to a Custom Agent JSON via a Python converter, per-agent hook wiring (so guard-session-scope only fires for the orchestrator, not for dev). Tool name aliases handled (Kiro accepts 'read'/'write'/'shell' or the legacy aliases). WebSearch / WebFetch dropped with a stderr warning when no MCP equivalent exists.",
        myContribution:
          "One source, three runtimes. The IDE is a deployment target, not the source of truth. Lets the workflow survive whichever editor wins the next round.",
        gallery: [
          {
            src: "/ai-squad/deploy-targets.png",
            alt: "Three-panel terminal screenshot side by side, left panel labeled 'Claude Code' showing deploy.sh output with files copied to ~/.claude/skills/ and ~/.claude/agents/; middle panel labeled 'Cursor' showing deploy-cursor.sh output with skills exported and hooks.json merged; right panel labeled 'Kiro' showing deploy-kiro.sh output with per-Skill conversion to JSON Custom Agents at ~/.kiro/agents/",
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
    motivationContext: ",  may 2026, the third unused planner on the shelf",
    buildLog: [
      {
        date: "2026-05-08",
        version: "FEAT-001",
        title: "Foundation scaffolded.",
        body: "Monorepo, design system and test harness, all in before any feature. React 19 + Vite 5 in <ai>web/</ai>, Fastify 5 in <ai>server/</ai>, Caveat + Inter on a 24px baseline grid, type-coverage gate at 95% in CI.",
      },
      {
        date: "2026-05-10",
        version: "FEAT-012",
        title: "Daily page stitches everything together.",
        body: "One swipeable page per day (Intention, Agenda, Priorities, Notes, Mood, Gratitude) with autosave and keyboard navigation. From this point on, the product had a shape.",
      },
      {
        date: "2026-05-19",
        version: "FEAT-030",
        title: "Supabase migration begins.",
        body: "Fastify + JSON files traded for Supabase: relational schema, RLS on every table, the React app talks directly to Supabase. Auth, days persistence and Fastify decommission queued (FEAT-031 → 033).",
      },
    ],
    results: [
      { value: "9", label: "features in active dev" },
      { value: "149", label: "commits" },
      { value: "12", label: "days · foundation to Supabase migration" },
      { value: "95%", label: "type coverage · gated in CI" },
    ],
    retrospective:
      "Still in active development, the daily page works end-to-end, the Supabase migration just started. The honest lesson so far: a feature that feels playful in the spec can quietly eat the build. FEAT-029 added ceremonial audio (quest completion sounds, day-complete fanfares). It was charming for a week. Then I caught myself tuning sound timing instead of shipping the page and ripped the whole system out the same day (<ai>chore(FEAT-029): drop the sound system entirely</ai>). What did pay off didn't feel rewarding while writing it: type coverage gated at 95%, dependency-cruiser blocking cross-feature imports, <ai>console.error</ai> wired to fail tests. Those are the rules keeping this from collapsing into one folder.",
    plugins: [
      {
        // TODO assets:
        //   /calendarfr/daily-page-full.png, full daily page screenshot: Intention header with mood at top, Agenda 06-23h on the left, Priorities + Notes on the right, Gratitude collapsed at the bottom; paper texture and baseline grid visible
        name: "Daily Page",
        summary:
          "One swipeable page per day, composing Intention, Agenda, Priorities, Notes, Mood and Gratitude into a single experience. Swipe or keyboard arrows navigate between dates; autosave runs on every keystroke.",
        requestedBy: "a planner that's one screen, not a maze of tabs",
        shippedAt: "2026-05",
        version: "FEAT-012",
        impact:
          "The whole product is this page. Every other feature is plumbing for the moment someone opens today and starts writing.",
        details:
          "The <ai>daily-page</ai> feature composes types from every other feature's <ai>types.ts</ai>. An autosave gateway sits between the rich-text editors and the companion API, every keystroke debounces into a PUT. Loading is a paper-skeleton; an empty date renders cleanly because GET returns an in-memory skeleton without writing a file.",
        myContribution:
          "One feature owns the composition. The composing feature is allowed to know everything; the composed features stay ignorant of each other.",
        gallery: [
          {
            src: "/calendarfr/daily-page-full.png",
            alt: "Full daily page, Intention header with mood at top, Agenda 06-23h on the left, Priorities and Notes on the right, Gratitude collapsed at the bottom; paper texture and baseline grid visible",
            caption: "daily page · full layout",
          },
        ],
      },
      {
        // TODO assets:
        //   /calendarfr/agenda-energy.png, Agenda column: 06-23h grid with several rows filled in (handwritten text), each row showing its energy-state emoji on the right
        name: "Hourly Agenda",
        summary:
          "An 18-row grid from 06:00 to 23:00. Each row is a rich-text line with an energy-state picker, six emoji icons mapping the hour to how it felt.",
        requestedBy: "an agenda that tracks not just what I did, but how it felt doing it",
        shippedAt: "2026-05",
        version: "FEAT-009 + FEAT-023",
        impact:
          "Looking back, the energy picker is the part I check most. The schedule reminds me what; the energy reminds me whether it was worth it.",
        details:
          "Each agenda row is a <ai>rich-text-line</ai>. Energy state is its own feature (FEAT-023), six emojis on a notebook-textured palette, persisted with the row. Empty rows render as a subtle baseline; you only see the lines you used.",
        myContribution:
          "Don't track everything. Track the thing you actually want to look at later.",
        gallery: [
          {
            src: "/calendarfr/agenda-energy.png",
            alt: "Agenda column, 06-23h grid with several rows filled in handwritten text, each row showing its energy-state emoji on the right",
            caption: "agenda · energy state per hour",
          },
        ],
      },
      {
        // TODO assets:
        //   /calendarfr/rich-text-toolbar.png, floating toolbar above a selected agenda row: four icons (B, I, U, S), inline editor active
        name: "Rich Text Line",
        summary:
          "A single-line inline editor with exactly four formatting tags allowed: bold, italic, underline, strike. Tiptap powers it; nothing else in the app knows that.",
        requestedBy: "the right amount of formatting, enough to mark something important, not enough to turn the journal into a Word doc",
        shippedAt: "2026-05",
        version: "FEAT-007",
        impact:
          "Less rope means fewer cuts. The day Tiptap breaks, exactly one feature has to change.",
        details:
          "<ai>rich-text-line</ai> is the only file that imports Tiptap. Sanitization mirrors on both sides: client uses isomorphic-dompurify, server uses DOMPurify, both enforcing the same four-tag whitelist atomically. Plain text wins by default, formatting is a deliberate choice.",
        myContribution:
          "One feature owns the library. The rest of the app uses the abstraction. Vendor lock-in becomes a refactor, not a rewrite.",
        gallery: [
          {
            src: "/calendarfr/rich-text-toolbar.png",
            alt: "Floating toolbar above a selected agenda row, four icons (B, I, U, S), inline editor active",
            caption: "four tags allowed, period",
          },
        ],
      },
      {
        // TODO assets:
        //   /calendarfr/priorities-dnd.mp4 (short clip: drag a priority from position 3 to position 1, then check it done) wavy hand-drawn strikethrough animates over the text
        name: "Priorities",
        summary:
          "Reorderable priority list with drag-and-drop, done-checkbox, and a wavy hand-drawn strikethrough that un-draws on regression.",
        requestedBy: "priorities I can re-rank during the day without re-typing them",
        shippedAt: "2026-05",
        version: "FEAT-008",
        impact:
          "Top-of-mind items stay at the top, physically. The animation rewards completion enough to feel like checking a box on paper.",
        details:
          "@dnd-kit/core + @dnd-kit/sortable handle the reorder. The strikethrough is a hand-drawn SVG that animates in over the text; toggling done back un-draws the same path. Order is persisted with the priority array.",
        myContribution:
          "Tactile feedback is not decoration, it's the reason the user comes back. The wavy strikethrough is more important than it sounds.",
        gallery: [
          {
            src: "/calendarfr/priorities-dnd.mp4",
            alt: "Short clip, drag a priority from position 3 to position 1, then check it done; a wavy hand-drawn strikethrough animates over the text",
            caption: "drag · reorder · strike",
            kind: "video",
          },
        ],
      },
      {
        // TODO assets:
        //   /calendarfr/mood-picker.png, mood picker open at the top of the daily page: six-emoji palette on notebook-textured background, one selected
        name: "Mood & Energy",
        summary:
          "Two emoji-based pickers sharing one design language: a daily Mood at the top of the page, a per-hour Energy state on each agenda row. Six emojis on a notebook-textured palette.",
        requestedBy: "emotion as a first-class field, not a comment buried in notes",
        shippedAt: "2026-05",
        version: "FEAT-010 + FEAT-023",
        impact:
          "I journal the feeling, not just the event. Patterns surface across weeks that I wouldn't notice from text alone.",
        details:
          "FEAT-010 (mood) and FEAT-023 (energy) are separate features but share the picker shell. The palette is the same six emojis; the data shape is per-day for mood, per-hour for energy.",
        myContribution:
          "Two features, one design language. The shell ships once; the data shape stays distinct.",
        gallery: [
          {
            src: "/calendarfr/mood-picker.png",
            alt: "Mood picker open at the top of the daily page, six-emoji palette on notebook-textured background, one currently selected",
            caption: "mood · same shell as energy",
          },
        ],
      },
      {
        name: "Server Companion (transitional)",
        summary:
          "Fastify 5 API serving GET/PUT for days, with atomic JSON writes and a lazy-create pattern. Built to last until the Supabase migration replaces it (FEAT-030 → 033).",
        requestedBy: "persistence without committing to a database before the product proves itself",
        shippedAt: "2026-05",
        version: "FEAT-006",
        impact:
          "A blank day is a real state, not a missing record. The filesystem never fills up with empty days I might have scrolled past.",
        details:
          "<ai>GET /api/days/:date</ai> returns an in-memory skeleton without writing, the day is created on the first PUT. Atomic writes via tmp + rename. Zod schemas validate every request; HTML sanitization mirrors the client whitelist. Companion is decommissioned in FEAT-033 when Supabase takes over auth and days persistence.",
        myContribution:
          "Prototype with a real architecture, but pick the transitional tech that's small enough to throw away later. Fastify + JSON files cost nothing to maintain and even less to delete.",
      },
    ],
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
