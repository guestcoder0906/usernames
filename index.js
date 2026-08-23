const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); 
app.use(express.json());

// Enable CORS so external websites/tools can query your API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const ROBLOX_SECURITY_TOKEN = process.env.ROBLOX_SECURITY_TOKEN || "";

// Standard Axios instance with timeout and headers
const http = axios.create({
  timeout: 3500,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/json'
  }
});

// Leetspeak generation map (used when creating usernames)
const LEET_MAP = {
  'a': ['4'],
  'b': ['8', '13', '6'],
  'e': ['3'],
  'f': ['ph'],
  'g': ['6', '9'],
  'i': ['1'], 
  'l': ['1', '7'],
  'o': ['0'],
  'p': ['9'],
  'q': ['9', '2'],
  'r': ['12'],
  's': ['5', 'z', '2'],
  't': ['7', '1'],
  'w': ['vv', 'uu'],
  'x': ['ex'],
  'z': ['2']
};

// Explicit De-leet map for profanity scanning (Number -> Letter)
const DELEET_MAP = {
  '0': 'o',
  '1': 'i',
  '2': 'z',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '6': 'g',
  '7': 't',
  '8': 'b',
  '9': 'g',
  '$': 's',
  '@': 'a'
};

const MULTI_DELEET = [
  { pattern: '13', rep: 'b' },
  { pattern: 'l3', rep: 'b' },
  { pattern: '12', rep: 'r' },
  { pattern: 'lz', rep: 'r' },
  { pattern: 'ph', rep: 'f' },
  { pattern: 'vv', rep: 'w' },
  { pattern: 'uu', rep: 'w' }
];

// PURE SLANG / BRAINROT / MEME LIST
const SLANG_LIST = [
  "aaa_game", "aave", "abbreviation", "absolute_cinema", "ace", "aceu", "acoustic", "acronym",
  "acting_brand_new", "addy", "admin", "admin_abuse", "adopt_me", "adulting", "aesthetic",
  "affirmations", "afk", "aimbot", "air_fryer", "akaza", "alex", "alimony", "all_fax_no_printer",
  "all_star", "allat", "alpha", "alpha_male", "alt_account", "american_psycho", "amirite", "amogus",
  "amped", "ancient", "ancient_city", "and_did", "and_i_oop", "andrew_tate", "angel", "angel_race",
  "angelcore", "anime_defenders", "anjay", "antagonist", "any_percent", "anya", "ape_together",
  "aquarius", "aries", "arise", "arsenal", "ascendant", "asl", "asmr", "astd", "astra", "astrology",
  "asuka", "ate", "ate_and_left_no_crumbs", "ate_down", "audacity", "aura", "aura_farming",
  "aura_loss", "aura_points", "aw_man", "awakening", "awp", "axolotl", "baby_girl", "baby_gronk",
  "bachira", "backrooms", "baddie", "baddie_core", "bae", "bag_chaser", "bagel_bites", "baja_blast",
  "baka", "balletcore", "bandwagon", "bankai", "barbenheimer", "barbie", "barbiecore", "barou",
  "barrier", "base", "based", "department", "basic", "batman_arkham", "battle_pass", "bb",
  "bbg", "beans", "beast_mode", "bed_rot", "bedwars", "beefing", "behelit", "beige_flag", "beli",
  "benching", "berserk", "bestie", "bestie_vibes", "bet", "better_call_saul", "beyonce", "bffr",
  "bfr", "biblically_accurate", "biden_blast", "big", "big_back", "big_back_energy", "big_brain",
  "big_cap", "big_dog", "big_flex", "big_mad", "big_moves", "big_sad", "big_three", "big_w",
  "big_yikes", "slay", "bimbocore", "bing_chilling", "bingewatch", "bird_brain", "bite_me",
  "bitcoin", "bjir", "black_cat", "black_cat_energy", "black_flash", "black_noir", "black_pilled",
  "blahaj", "blade_runner", "blast_off", "blaze", "blep", "blind_spot", "blissed_out", "blizzard",
  "blockchain", "blokecore", "bloomer", "bloxburg", "bloxfruits", "bloxy", "blue_heat", "blue_lobster",
  "blue_lock", "blue_pilled", "blue_screen", "blud", "blueprint", "boba_tea", "bocil", "bocchi",
  "boi", "bomb", "bombastic", "bombastic_side_eye", "bomboclat", "bone", "bonk", "boo", "bood_up",
  "boomer", "energy", "boomer_energy", "boop", "snoot", "bootleg", "bop", "borgar", "bot_frag", "botnet",
  "botting", "boujee", "bougie", "boutta", "bows", "boxing", "boy_math", "boyfriend_air",
  "boyfriend_reveal", "brain_fog", "brain_rot", "brainworm", "brand_of_sacrifice", "brat",
  "brat_green", "brat_summer", "breadcrumbing", "break_the_internet", "breaking_bad", "brick",
  "brimstone", "bro_code", "bro_really_thought", "bro_thinks_he", "bro_visited", "bronze", "brook",
  "brookhaven", "bros", "brother_eww", "brown_sugar", "bruh", "bruh_moment", "bruh_sound", "bruv",
  "bubble_tea", "buddha", "buff", "buffed", "bug", "buggy", "bukber", "buldak", "business_card",
  "bussin", "busted", "felicia", "cake", "callouts", "cancel", "cancel_culture", "canceled", "cancer", "canon", "canon", "cap",
  "cap_detector", "capper", "capricorn", "capybara", "carbonara", "carnival", "cash", "cash_grab", "canon_event",
  "cash_money", "casting_spells", "catch_fade", "catch_feels", "catch_these_hands", "catfish",
  "cat_snake", "catto", "caught_in_four_k", "caught_in_k", "caught_lacking", "cave_spider", "cdk",
  "celsius", "ceo_of", "chad", "chadette", "chainsaw_man", "chamber", "character_arc",
  "character_name", "chat", "chat_is_this_real", "check_the_vibes", "cheeking", "cheerleader_effect",
  "cheese", "cheems", "cheetos", "chef_kiss", "cheugy", "chicanery", "chidori", "chiefs",
  "child_support", "chill", "chill_pill", "chilling", "chimken", "chip_spin", "chlorine",
  "choppelganger", "chopped", "chop", "chopper", "chroma", "chud", "chudding", "chudjak", "cilukba",
  "cillian_murphy", "cinema", "cinematic_masterpiece", "citadel", "clapped", "clapback", "clean",
  "clean_girl", "clean_girl_aesthetic", "clicking", "clip_farming", "clip_it", "clipped", "clock",
  "clock_that", "clock_tea", "clocking", "clout", "clout_chaser", "clove", "clown_behavior",
  "clowncore", "clutch", "coconut_doggy", "coded", "coffee_badging", "coin", "cold_brew",
  "cold_take", "common_l", "common_w", "comms", "compound_v", "consoomer", "control",
  "control_devil", "conveyor", "conveyor_belt", "cook", "cooked", "coop", "coquette", "core",
  "core_memory", "corner_camper", "corner_clip", "corrupt", "cottagecore", "couch_potato",
  "coughing_baby", "coworker_core", "crab_mentality", "crah", "crash", "crash_out", "crashing_out",
  "cray_cray", "creeper", "criminal_side_eye", "cringe", "cringe_comp", "cringe_fest", "cringey",
  "cross_guild", "crumb", "crunchy", "crybaby", "crypto", "crystal_girl", "cuh", "culling_game",
  "cup_noodles", "cushioning", "cyberpunk", "cyborg", "cypher", "da_hood", "dab", "daily_grind",
  "danger_noodle", "dank", "dank_memes", "dap", "dap_up", "dark_academia", "dark_blade",
  "dark_brandon", "dark_fruit", "dark_matter", "dark_web", "dattebayo", "daughter_tax", "day_one",
  "dayroom", "ddos", "dead", "dead_internet", "deadass", "deadlock", "deagle", "deal_breaker",
  "death_stare", "deep_fried", "defuse", "delulu", "delulu_is_the_solulu", "demand", "demon_hunter",
  "demon_slayer", "denji", "derank", "derp", "destroy_lonely", "devex", "devs_lazy", "dialed_in",
  "dialogue_skipper", "diamond", "diamond_armor", "diamond_fruit", "diamond_hands", "dieselpunk",
  "diff", "difficulty_chart", "dinnerbone", "dip", "dirtbag", "divorce", "dl", "dog_water", "doge", "dogecoin", "doggo", 
  "dogwater", "doing_numbers", "orginal",
  "doing_the_most", "dolphin", "domain_expansion", "dominance", "dominus", "done", "done_dirty",
  "donk", "dont_cook", "doom_scrolling", "doomer", "dope", "doritos", "dorsia", "double_down",
  "double_kill", "double_tap", "dough", "down_bad", "down_tremendous", "downtown_girl", "dox",
  "doxed", "drag", "dragged", "dragon", "dragonslayer", "drainer", "drake", "draking", "dream",
  "dreamcore", "drip", "drip_check", "dripped_out", "drive", "dropper", "dry_texting", "dtr",
  "dub", "duolingo", "dupe", "dynamite", "eat", "eat_it_up", "eating_glass", "eboy", "eclipse",
  "eco", "edit", "eepy", "efficiency", "egghead", "egirl", "elon_musk",
  "elo_hell", "elytra", "emerald", "eminem", "emo", "emotional_damage", "enchanted", "ender_dragon",
  "enderman", "energy_vampire", "engagement", "engagement_farming", "epep", "epic_fail", "era",
  "eras_tour", "ers", "escape_matrix", "etc", "ethereum", "euphoria", "evangelion", "exclusive",
  "executed", "f_in_chat", "facts", "fade", "faded", "fail_comp",
  "fairycore", "fake_deep", "fake_flex", "fake_news", "faker", "falcon", "falling_pipe", "fam", "family_guy_", "behavior", 
  "fan", "service", "team", "fan_service", "fanum", "fanum_tax",
  "farming", "fast_fashion_fatigue", "fat_l", "favourite", "fb", "feastables", "feeding", "fein",
  "ferret", "fever_dream", "ffa", "fifty_fifty", "fight_club", "fighting", "filler_episode",
  "finsta", "finna", "finesse", "fire", "firecracker", "firewall", "first_blood", "first_rule",
  "fit", "fit_check", "fit_pic", "five_hundred_error", "flame", "flavored_air", "fleek", "flex",
  "flex_culture", "flex_on_them", "flex_time", "flexin", "flexing", "flexitarian", "flick",
  "flipping", "floof", "flop", "flop_era", "era", "flop", "fomo", "foo_bar",
  "force_buy", "fortune", "coded", "culture", 
  "four_plus_four", "fragment", "franky", "free_fire", "frogge",
  "fruit_notif", "fruit_tea", "fruity", "frutiger_aero", "ftw", "fudge", "fuel_the_fire",
  "fuhuhluhtoogan", "full_blown", "full_buy", "full_send", "funyuns", "furry", "future", "fyp",
  "g", "ggs", "gacha", "game_is_game", "gamepass", "gamer_girl", "gamersupps",
  "gang", "gas", "gas_fees", "gaslight", "gaslighting", "gassing", "gatekeep", "gd", "gear_five",
  "gear_four", "gear_three", "gear_two", "geeking", "gekko", "gem", "gemini", "general_chat",
  "generational_trauma", "georgenotfound", "get_gud", "get_in_line",
  "get_money", "get_real", "get_rekt", "get_served", "get_to_the_bag", "get_wrecked", "geto",
  "gfuel", "gg", "ggez", "ghast", "ghost", "ghosted", "ghosting", "ghoul", "gig_economy",
  "gigachad", "girl_dinner", "girl_math", "girlboss", "girlfriend_air", "girlfriend_reveal",
  "giving_me_life", "giving_what_it_needed_to_give", "glass_cannon", "glaze", "glazer", "glazing",
  "glitch_wrap", "glitchcore", "glitchless", "glow_down", "glow_up", "go_bananas", "go_dummy",
  "go_hard", "go_off", "go_outside", "goat", "goated", "goblincore", "godlike", "godly", "gojo",
  "golden", "golden_retriever", "golden_retriever_energy", "gold", "good_game", "good_look",
  "good_vibes_only", "goofy_ahh", "gorpcore", "got_hands", "grandpa_core", "granola", "granola_girl",
  "gravity", "gremlin_mode", "green_flag", "green_fn", "griefing", "griffith", "grim_walls",
  "grimace_shake", "grind", "grindset", "groovy", "gtg", "guap", "gucci", "gun_devil", "gus_fring",
  "guts", "gyat", "gyatt", "hackerman", "hacked", "haki", "half_baked", "halftime", "hammered",
  "hand_check", "hard_launch", "hard_pass", "hardlock", "hardstuck", "harbor", "hasbulla",
  "hate_watching", "hater_energy", "haunting", "hawk_tuah", "hax", "haxxor", "headcanon",
  "headless", "heart_eyes", "heat", "heated", "heavy_metal", "heem", "heisenberg", "heist",
  "hella", "hella_skrilla", "hello_world", "herobrine", "hero_buy", "hidden_gem", "high_key",
  "highkey", "highlighter_kid", "hirono", "hits_different", "hoco", "hodl", "hoglin",
  "hollow_purple", "hollywood", "homelander", "homixide_gang", "hop_off", "hot_cheetos", 
  "hot_mess", "hot_pocket", "hot_take", "howard_hamlin", "htn", "huge", "human", "hunter", "hunty", 
  "hustle_culture", "hustlers_university", "emo", 
  "hydrogen_baby", "hype", "hype_beast", "hype_man", "hype_train", "hyperpop", "i_fear",
  "i_miss_her", "i_sits", "everything", "ick", "icymi", "if_i_fits", "igl", "ikea_shark",
  "immortal", "impact", "impostor", "in_my_bag", "in_my_era", "in_my_feelings", "in_the_trenches",
  "indie_dev", "indie_sleaze", "index_out_of", "infinite_loop", "infinite_void", "infinity",
  "inosuke", "insane_work", "inting", "ipad_kid", "iron", "iron_farm", "ironic_posting",
  "is_he_stupid", "isagi", "ishowspeed", "iso", "it_be_like_that", "its_giving", "iwel", "iykwim",
  "iykyk", "j_cole", "jawn", "jeb", "jesse_pinkman", "jett", "jinbe", "jin_woo", "jittleyang",
  "jit", "john_xina", "jojos", "jomo", "jonkler", "joyboy", "judge", "jukes_towers", "jumpscare",
  "jungle_diff", "just_created", "just_vibing", "juul", "juuling", "kaido", "kai_cenat", "kanye",
  "karen", "karmic", "kats_eye", "kayo", "kda", "buck", "one_hundred",
  "keep_it_real", "kekw", "ken", "carson", "kendrick", "kick_rocks", "knockout", "killjoy", "kind", 
  "kitsune", "kitten", "knockback", "kokushibo", "kono_dio_da", "korblox",
  "kpopdemonhunters", "krunk", "l", "l_bracket", "l_mans", "l_plus_ratio", "l_ratio",
  "labubu", "ladder_flick", "lag", "lalo", "lamar", "lao_gan_ma", "larp", "larper", "larping",
  "laser", "laugh_clip", "lb", "leaderboard", "lean", "lean_in", "lebaran", "left_no_crumbs",
  "left_on_delivered", "left_on_read", "legendary", "legit", "leo", "leopard", "let_him_cook",
  "let_me_be_clear", "let_them_cook", "lets_get_this_bread", "level_up", "lewk", "libra", "lifting",
  "light", "light_academia", "lightwork", "like_a_boss", "like_my_recent", "liminal_space",
  "limiteds", "lineups", "liquid_cat", "lit", "live", "living", "living_for_it",
  "living_my_best_life", "livvy_dunne", "lmao", "lmfao", "lms", "loaf", "localhost", "lock_in",
  "locked_in", "loid_forger", "lol", "look_at_me", "lookin_like_a_snack", "looksmax", "looksmaxxing",
  "looting", "lore_reason", "lorem_ipsum", "los_pollos", "lose_your_aura", "loud_budgeting",
  "love", "love_bomb", "love_bombing", "love_language", "lovecore", "low_hanging_fruit", "low_key",
  "low_profile", "low_taper_fade", "lowkey", "lucky_girl", "lucky_girl_syndrome", "luger",
  "luh_calm_fit", "lunchly", "mad", "mad_respect", "mafia_boss", "magma", "magma_cube", "mahoraga",
  "main_character", "main_character_energy", "main_character_syndrome", "mainframe", "major_w",
  "major_yikes", "makima", "malding", "malevolent_shrine", "mammoth", "man_ham", "manhunt",
  "manifest", "manifesting", "maruchan", "marineford", "matcha_latte", "matchmaking",
  "math_aint_mathing", "matrix", "meet_the_grahams", "megathread", "melting", "mending", "menty_b",
  "mercury", "mercury_retrograde", "merge_conflict", "metal_pipe", "method_acting", "metro_boomin",
  "mew", "mewing", "mid", "mid_diff", "mihawk", "mike_ehrmantraut", "mindfulness",
  "minecraft_axolotl", "mining", "mink", "minting", "misery", "miss_me_with_that", "mission_passed",
  "mlem", "mm_two", "mob_psycho", "mog", "mogged", "mogger", "mogging", "money_bag",
  "money_counter", "money_gang", "money_moves", "monkas", "monkaw", "monster_energy", "mood",
  "mood_board", "mooning", "morbius", "morbillion", "morning_routine", "motion", "mountain_dew",
  "mouse_moments", "movie_magic", "mrbeast", "mrbeast_bar", "mug_root_beer", "murder_mystery",
  "murderer", "mushroom_soup", "muzans", "my_bad", "my_dudes", "my_fault", "my_guy",
  "my_lil_yea_yea", "nacho", "nagi", "nah_fr", "nah_id_win", "nami", "narrative", "narrator",
  "negative_aura", "negative_ghostrider", "neon", "nerd_alert", "nerd_lineups", "nerf", "nerv",
  "netherite", "netzwerk", "neurodivergent_coded", "neurospicy", "never_let_them_know_your_next_move",
  "nezuko", "nfl", "nft", "ngl", "nika", "ninja_defuse", "nitro", "nitro_pepsi", "no_cap",
  "no_chill", "no_context", "no_drama", "no_filter", "no_home", "no_lies_detected", "no_new_friends",
  "no_optics", "no_questions_asked", "no_receipts", "no_tea_no_shade", "no_way_bro", "nope_rope",
  "normcore", "normie", "not_giving", "not_gonna_lie", "not_hot", "not_it", "not_like_us",
  "not_stonks", "notch", "npc", "npc_behavior", "npc_energy", "npc_interaction", "nuclear_bomb",
  "nuggies", "null_pointer", "number_fifteen", "oacky_way", "oat_milk", "obamna", "obby",
  "obsidian", "odin", "off_it", "off_meta", "off_the_chain", "off_the_grid", "off_the_meter",
  "off_the_rip", "off_the_wall", "offline_core", "og", "og_status", "ohio", "ohio_final_boss",
  "oi_hughie", "ok_boomer", "ok_i_pull_up", "okay_boomer", "okay_geeze", "old_money",
  "old_money_aesthetic", "oldweb", "omg", "oml", "omen", "omw", "on_brand", "on_deck",
  "on_fleek", "on_game", "on_god", "on_my_mama", "on_point", "on_sight", "on_the_low",
  "one_brain_cell", "one_piece", "one_tap", "one_time_for_the_one_time", "ong", "only_in_ohio",
  "oof", "oomf", "oomfie", "open_mic", "operator", "op_crutch", "opp", "oppenheimer", "opps",
  "ops", "orange_cat", "orbiting", "order_sixty_six", "ost", "otp", "out_of_pocket",
  "out_unbothered", "outta_here", "outta_pocket", "owala", "owo", "pack_watch", "pack_your_bags",
  "packet_loss", "pain", "pale_nimbus", "panicking", "paper_hands", "parched", "parkour",
  "passing_the_vibe_check", "patch_notes", "patrick_bateman", "paul_allen", "penta_kill", "pepe",
  "period", "periodt", "perm", "permanent", "permaban", "perry_the_platypus", "pet_sim",
  "pet_sim_ninety_nine", "petty", "petty_energy", "pewdiepie", "pged", "phantom", "phantom_forces",
  "phantom_mob", "phantom_tax", "philza", "phoenix", "phrog", "pick_me", "pick_me_boy",
  "pick_me_girl", "picture_me_rolling", "piglin", "pilk", "ping", "pink_sauce", "pipe_down",
  "pisces", "pity", "pixel_art", "pizza_rolls", "plant_the_bomb", "platinum", "play_stupid_games",
  "playboi_carti", "plink", "plot_armor", "plot_twist", "plug", "plug_talk", "plus_aura",
  "pmoys", "pocket_sage", "pocketing", "pochita", "pog", "poggers", "point_of_view", "poisoned",
  "polite_cat", "pop_off", "pop_out", "popmart", "portal", "possum", "post_irony", "pov",
  "pov_you", "power", "power_hour", "power_move", "precise_gunplay", "preppy", "pressed",
  "prestige", "pretty_privilege", "prime_drink", "project_mayhem", "projection", "protection",
  "protagonist", "protest_vote", "proxy", "psx", "pulled", "pulling", "pump_and_dump", "punch",
  "pupper", "purple_drank", "pushing_p", "put_in_work", "put_on_blast", "pwn", "pwned", "p2w",
  "quadra_kill", "quandale", "quandale_dingle", "quick_maths", "quiet_cutting", "quiet_firing",
  "quiet_luxury", "quiet_quitting", "rage_bait", "rage_quit", "raid", "raid_farm", "rainbow",
  "ramen_noodles", "ranboo", "rank_up", "rap", "rare_l", "rare_w", "rasengan", "rat",
  "rat_girl_summer", "rat_mode", "ratchet", "npc", "ratio", "ratioed", "rawr", "raze",
  "real_eyes_realize", "real_one", "real_real", "real_talk", "rebirth", "receipts", "red_bull",
  "red_flag", "red_pill", "redemption_arc", "reddit_gold", "reggae_ton", "rei",
  "rekt", "renaissance", "rengoku", "rent_free", "respect_fully", "respect_plus", "retrograde",
  "retrowave", "reveal_arc", "reverse_card", "rework", "reyna", "rich_in_life", "right_click",
  "rip", "rip_bozo", "rip_me", "rizz", "rizz_god", "rizzler", "rn", "roaching", "roast", "robin",
  "rock", "rocket", "rocket_emoji", "roll_up", "rolling_in_it", "roman_empire", "root", "rot",
  "rot_maxxing", "rotflmao", "royalcore", "rpg", "rubber", "rubber_band", "rubber_duck",
  "rug_pull", "rumble", "run_and_gun", "run_it_back", "run_that_back", "rush_b", "ryan_gosling",
  "sacred_timeline", "sad_boy", "sad_girl", "safari_park", "sage", "sagittarius", "sahur",
  "salad_fingers", "salamanca", "salty", "same_energy", "samyang", "sand", "sanji", "sapnap",
  "saul_goodman", "savage", "save", "save_as", "saw", "say_less", "scammer", "scammer_energy",
  "scared_straight", "scorpio", "screenshot", "script_kiddie", "sea_urchin",
  "second_hand_embarrassment", "secret_sauce", "seele", "seething", "segfault", "sending_me",
  "sephora_kid", "server_boost", "server_issue", "serving", "serving_looks", "shade", "shadow",
  "shadow_monarch", "shadow_wizard", "shadowban", "shanks", "shark", "shark_pup", "shark_race",
  "sharpness", "sheesh", "sheriff", "sheriff_demon", "shibuya_incident", "shiesty", "shift_lock",
  "shin_ramyun", "shinji", "shiny", "ship", "shoe_game", "shook", "shooketh", "shooting_your_shot",
  "short_king", "shorty", "shot_caller", "shoulder_check", "shroud", "shulker", "shutdown",
  "sick", "side_character", "side_eye", "side_hustle", "side_quest", "sigma", "sigma_fein",
  "sigma_grindset", "sigma_male", "sigma_rizz", "silian_rail", "silk_touch", "silver", "simulator",
  "simp", "simp_nation", "sip_tea", "sis", "sister_sage", "situation_ship", "situationship",
  "six_seven", "six_seven_motion", "sizzurp", "skater_boy", "skater_girl", "skeet", "skibidi",
  "skibidi_gyat", "skibidi_ohio", "skibidi_rizz", "skibidi_toilet", "skill_issue",
  "skip_to_the_end", "skull", "skullpanda", "skye", "slap", "slaps", "slasher", "slay", "slayed",
  "slaying", "sleep_on", "sleep_walking", "slime", "slim_sus", "slim_thicc", "slim_thick",
  "slow_burn", "slow_mode", "smacks", "smh", "smiski", "smoke", "smoke_and_mirrors", "smol",
  "smurf", "snack", "snatched", "sneks", "snipping", "snitched", "so", "so_fetch", "so_true",
  "soap", "social_battery", "social_credit", "soda", "soft_boy", "soft_girl", "soft_launch",
  "softlock", "solarpunk", "soldier_boy", "solo_leveling", "solulu", "somethings_cooking",
  "sonny_angel", "soul_guitar", "soulmate", "sound", "sova", "soyjak", "spacecore",
  "spaghetti_code", "sparks", "speak_on_it", "spear_of_longinus", "speedrun", "speedrunner",
  "speedrunner_vs", "spider", "spider_verse", "spike", "spill_the_beans", "spill_the_tea",
  "spin", "spinbot", "spinny_fish", "spirit", "spit_facts", "spit_on_that_thang", "sploot",
  "spooky_season", "sport_mode", "spring", "behavior", "spray_and_pray", "spy_x_family", "squad_goals",
  "sriracha", "stack_overflow", "stage", "stan", "stan_account", "stan_twitter", "stand_business",
  "stand_proud", "standing_on_business", "stanley_cup", "star_boy", "star_girl", "starlight",
  "stashing", "stay_mad", "stay_pressed", "stay_toxic", "stay_woke", "steampunk", "steeple",
  "steve", "stink_eye", "stinker", "stoked", "stonks", "stop_the_cap", "stormfront", "strat",
  "streak", "street_smarts", "stressing", "strider", "strike_a_pose", "stud", "styll",
  "pewdiepie", "subtweet", "sudo", "sugar_coating", "sukuna", "sunlight", "superbowl",
  "sus", "sussing", "sussy", "sussy_baka", "sweater_weather", "swerve", "swerved", "swiftie",
  "swipe", "swole", "swoop", "synthwave", "syntax_error", "t_rex", "table_slap",
  "taco_bell_bong", "tactics", "chill", "take_a_seat", "take_notes", "take_the_l",
  "take_the_w", "takis", "takis_fuego", "takjil", "tanghulu", "tanjiro", "tapioca", "tarik",
  "taro", "tas", "taurus", "taylor_swift", "tbh", "tea", "technoblade", "tek_knight", "temp_v",
  "tendies", "tenz", "that_girl", "that_guy", "thats_a_reach", "thats_cap", "thats_on_me",
  "thats_on_period", "thats_wild", "the_boys", "math_aint_mathing", "plot",
  "thicc", "thick_skin", "thirsty", "thorns", "thought_daughter", "thr", "throw_hands",
  "throw_shade", "thug_shaker", "titanic", "to_the_moon", "toe_beans", "arc", 
  "toh", "toilet_tower", "toji", "top_diff", "top_frag", "top_g", "top_tier",
  "tor", "totem", "totes", "touch_grass", "tower_of_hell", "toxic", "toxic_positivity", "trade_hangout",
  "trad", "trad_wife", "traffic_light", "training_arc", "trans_icon", "translucent", "trap_phone",
  "trash_panda", "trauma_dump", "trauma_dumping", "traumacore", "travis_kelce", "triple_kill",
  "trolling", "truss", "trust_the_process", "tseries", "ttd", "tubbo", "tuco", "tuff",
  "tungtungsahur", "turn_up", "tweakin", "twin", "twin_flame", "twizzy", "tycoon", "tyler_durden",
  "uhh", "unalive", "unbothered", "unbreaking", "unc", "uncanny_valley", "uncle_prod",
  "understood_the_assignment", "unit_zero_one", "unhinged", "unlock_potential", "unserious",
  "upgrader", "urban_legend", "usopp", "uwu", "uwu_girl", "v", "valkyrie",
  "value", "vamp", "vandal", "vanilla", "vaporwave", "venom", "vented", "vibe", "vibe_check",
  "vibe_killer", "vibing", "blame", "videogame", "villager", "villain_arc",
  "villain_mode", "vintage", "viper", "virgo", "vitamin_d", "void", "void_cat", "vought", "vpn",
  "vsco", "girl", "boy", "vultures", "w", "w_bracket", "w_mans", "w_rizz", "wack",
  "wallflower", "wallhack", "wallstreet", "walter_white", "wano", "warden", "warm_take",
  "wasted", "wasted_money", "watch_party", "we_are_so_back", "we_move", "webcore", "wednesday",
  "weird_flex_but_ok", "weird_flex", "champ", "weirdchamp", "whale", "whip", "who_is_this_diva", "who_let_him_cook",
  "let_him_cook_", "whole_meal", "wide_peppo", "wig", "wig_snatched", "wilbur", "wild", "wildin", "winning",
  "winter_arc", "witchcore", "wither", "wkwk", "wocky_slush", "slay", "wojak", "wok", "woke", "woofer",
  "world_record", "wsb", "wya", "wyd", "wylin", "xan", "xqc", "yaas", "yapper", "yapping",
  "yare_yare", "ye", "yeet", "yeeted", "yeezy", "yig", "yoink", "yor_forger", "yoriichi", "yoru",
  "you_ate", "you_good", "young_unc", "your_honor", "y2k",
  "zenitsu", "zero_chill", "zimomo", "zombie", "zombiecore", "zombieing", "zoomies", "zoomer",
  "perm", "zoro", "bk_foot_lettuce", "number_15", "type", "chronically_online", 
  "dreamybull", "vine_boom", "chocolate_chocolate", "ice_cream", "spawn_peek", "caught_in_4k", 
  "rng", "rng_gods", "f2p", "brb", "feature", "balance", "meta", "wall_hop", "dance_clip", 
  "checkpoint", "tapping", "innocent", "fang", "seer", "cursed", "v4", "radiant", 
  "trading_hall", "skeleton", "shrek", "morb", "deep", "a_train", "choccy_milk", "twin",
  "good_boy", "git", "404", "rng", "solar", "punk", "lunar", "turn_off", "friends", "fwb", 
  "nsa", "relationship", "shower", "devilcore", "weirdcore", "core", "error"
];

// ============================================================================
// EFFICIENT BAD WORDS LIST
// ============================================================================

const SUBSTRING_BAD_WORDS = [
  "2 girls 1 cup", "2g1c", "4r5e", "50 yard cunt punt", "5h1t", "5hit", "a2m", "acrotomophilia", 
  "alabama hot pocket", "alaskan pipeline", "anilingus", "apeshit", "arsehole", "assbang", "assfuck", 
  "asshat", "asshole", "assmaster", "assmucus", "assmunch", "asswipe", "auto erotic", "autoerotic", 
  "azazel", "babeland", "baby batter", "baby juice", "ball gag", "ball gravy", "ball kicking", 
  "ball licking", "ball sack", "ball sucking", "ballbag", "bangbros", "bareback", "barely legal", 
  "barenaked", "bastard", "bastardo", "bastinado", "bbw", "bdsm", "beaner", "beardedclam", "beastial", 
  "beastiality", "beaver cleaver", "beaver lips", "bellend", "bestiality", "big black", "big breasts", 
  "big knockers", "big tits", "bimbos", "birdlock", "bitch", "blow me", "blow mud", "blowjob", 
  "blow your load", "blue waffle", "blumpkin", "bodily", "boiolas", "bollocks", "bondage", "boobies", 
  "bootie", "booty call", "brown showers", "brunette action", "buceta", "bukkake", "bulldyke", 
  "bullet vibe", "bullshit", "bung hole", "bunghole", "bunny fucker", "bust a load", "busty", 
  "butt fuck", "buttcheeks", "butthole", "buttmuch", "caca", "cahone", "camel toe", "cameltoe", 
  "camgirl", "camslut", "camwhore", "carpet muncher", "carpetmuncher", "cawk", "cervix", "chinc", 
  "chink", "chocolate rosebuds", "circlejerk", "cleveland steamer", "clit", "clitoris", "clover clamps", 
  "clusterfuck", "cnut", "cocain", "cocaine", "cock", "coital", "cokmuncher", "commie", "condom", 
  "coon", "cop some wood", "coprolagnia", "coprophilia", "cornhole", "corp whore", "crackwhore", 
  "creampie", "cum chugger", "cum dumpster", "cum freak", "cum guzzler", "cumdump", "cummer", 
  "cumming", "cumshot", "cumslut", "cumstain", "cunilingus", "cunnilingus", "cunny", "cunt", 
  "cyalis", "cyberfuc", "darkie", "date rape", "daterape", "dawgie-style", "deep throat", "deepthroat", 
  "dendrophilia", "dick", "dildo", "diligaf", "dillweed", "dingleberry", "dipship", "dirsa", 
  "dirty pillows", "dirty sanchez", "dlck", "dog-fucker", "doggie style", "doggiestyle", "doggin", 
  "doggy style", "doggystyle", "dolcett", "domination", "dominatrix", "dommes", "dong", "donkey punch", 
  "donkeyribber", "doosh", "double dong", "double penetration", "douche", "dp action", "dry hump", 
  "duche", "dumass", "dumbass", "dvda", "dyke", "eat a dick", "eat hair pie", "eat my ass", "ecchi", 
  "ejaculate", "ejaculation", "ejakulate", "enlargement", "erection", "erotic", "erotism", "escort", 
  "essohbee", "eunuch", "extacy", "extasy", "faggot", "fannybandit", "fannyflaps", "fartknocker", 
  "fcuk", "fecal", "fecker", "felch", "fellatio", "feltch", "female squirting", "femdom", "figging", 
  "fingerbang", "fingering", "fisting", "fisty", "flog the log", "floozy", "foad", "fondle", 
  "foot fetish", "footjob", "foreskin", "freaky", "freex", "frigg", "frotting", "fubar", "fuck", 
  "fudge packer", "fudgepacker", "futanari", "fux0r", "gang bang", "gangbang", "ganja", "gassy ass", 
  "gay sex", "gaylord", "genitals", "genital", "giant cock", "gigolo", "girl on top", "girls gone wild", "glans", 
  "goatcx", "goatse", "god damn", "gokkun", "golden shower", "gonad", "goodpoop", "goo girl", 
  "gook", "goregasm", "gringo", "grope", "group sex", "g-spot", "gtfo", "guido", "guro", "ham flap", 
  "hand job", "handjob", "hard core", "hard on", "hardcore", "hebe", "heeb", "hentai", "heroin", 
  "herpes", "heshe", "hitler", "hoar", "hobag", "homoerotic", "honkey", "hooch", "hookah", "hooker", 
  "hootch", "hooter", "hore", "horniest", "hot carl", "hot chick", "how to kill", "how to murder", 
  "huge fat", "humping", "hussy", "hymen", "inbred", "incest", "injun", "intercourse", "jack off", 
  "jackass", "jackhole", "jackoff", "jail bait", "jailbait", "jap", "jelly donut", "jerk off", 
  "jerk0ff", "jerkoff", "jigaboo", "jiggaboo", "jiggerboo", "jism", "jiz", "jizz", "juggs", "junkie", 
  "kike", "kinbaku", "kinkster", "kinky", "kkk", "klan", "knobbing", "kondum", "kooch", "kootch", 
  "kraut", "kum", "kunilingus", "kwif", "kyke", "labia", "leather restraint", "lech", "lemon party", 
  "leper", "lesbian", "lesbo", "lez", "lmfao", "loin", "lolita", "lovemaking", "mafugly", 
  "make me come", "male squirting", "masochist", "massa", "masturbate", "masturbation", "maxi", 
  "menage a trois", "menses", "menstruate", "meth", "milf", "missionary position", "mofo", "molest", 
  "moolie", "moron", "motherfucker", "mound of venus", "mr hands", "muff diver", "muff puff", 
  "muffdiver", "muffdiving", "murder", "mutha", "nambla", "napalm", "nappy", "nawashi", "nazi", 
  "need the dick", "negro", "neonazi", "nigga", "nigger", "niggle", "niglet", "nig nog", "nimphomania", 
  "nimrod", "ninny", "nipple", "nob jokey", "nobhead", "nobjocky", "nooky", "nsfw", "nude", "nudity", 
  "numbnuts", "nut butter", "nutsack", "nympho", "nymphomania", "octopussy", "omorashi", "one cup two girls", 
  "one guy one jar", "opiate", "opium", "orgasim", "orgasm", "orgy", "ovary", "ovum", "paedophile", 
  "paki", "panties", "panty", "pastie", "pasty", "pcp", "pecker", "pedobear", "pedophile", "pedophilia", 
  "pegging", "penial", "penile", "penis", "perversion", "peyote", "phalli", "phallic", "phone sex", 
  "phonesex", "phuck", "phuk", "phuq", "piece of shit", "pigfucker", "pillowbiter", "pimpis", "pinko", 
  "piss pig", "pissflaps", "pissing", "pisspig", "playboy", "pleasure chest", "polack", "pole smoker", 
  "pollock", "ponyplay", "poof", "poon", "poontang", "poop chute", "poopchute", "porn", "porno", 
  "prig", "prince albert piercing", "prostitute", "prude", "pthc", "pubes", "pubic", "pubis", "punkass", 
  "punky", "punany", "pussy", "puto", "queaf", "queef", "quicky", "quim", "racy", "raghead", 
  "raging boner", "rectal", "rectum", "rectus", "reefer", "reetard", "reich", "retard", "reverse cowgirl", 
  "revue", "rimjaw", "rimjob", "rimming", "ritard", "rosy palm", "rtard", "rumprammer", "ruski", 
  "rusty trombone", "sadism", "sadist", "sandbar", "santorum", "sausage queen", "scag", "scantily", 
  "schizo", "schlong", "scissoring", "scroat", "scrog", "scrotum", "scrud", "seaman", "semen", 
  "seks", "segs", "sexual", "shag", "shamedame", "shaved beaver", "shemale", "shibari", "shit", 
  "shiz", "shota", "shrimping", "sissy", "skag", "skeet", "slanteye", "slave", "sleaze", "slope", 
  "slut", "smegma", "smut", "snuff", "snowballing", "sodom", "sodomize", "sodomy", "son-of-a-bitch", 
  "souse", "spac", "sperm", "spic", "spik", "splooge", "spooge", "spread legs", "spunk", "steamy", 
  "stfu", "stiffy", "stoned", "strap on", "strapon", "strappado", "strip club", "style doggy", 
  "suck", "suicide girls", "sultry women", "sumofabiatch", "swastika", "swinger", "tainted love", 
  "tampon", "tawdry", "tea bagging", "teabagging", "teat", "teets", "teez", "terd", "teste", 
  "testical", "testicle", "testis", "threesome", "throating", "thrust", "thug", "tied up", "tight white", 
  "tinkle", "titfuck", "titties", "titty", "toke", "tongue in a", "toots", "topless", "tosser", 
  "towelhead", "tranny", "transsexual", "trashy", "tribadism", "tub girl", "tubgirl", "tushy", 
  "twat", "twink", "twunt", "ugly", "undies", "undressing", "unwed", "upskirt", "urethra", "urinal", 
  "urine", "urophilia", "uterus", "uzi", "vagina", "valium", "venus mound", "viagra", "vibrator", 
  "violet wand", "virgin", "vixen", "vodka", "vomit", "vorarephilia", "voyeur", "vulgar", "vulva", 
  "wad", "wang", "wank", "wazoo", "wedgie", "weewee", "weiner", "weirdo", "wench", "wet dream", 
  "wetback", "white power", "whitey", "whiz", "whore", "wigger", "willies", "willy", "womb", "woody", 
  "wop", "wrapping men", "wrinkled starfish", "x-rated", "xxx", "yaoi", "yeasty", "yellow showers", 
  "yiffy", "yobbo", "zoophile", "zoophilia", "giving head", "givinghead", "getting head", "give head", 
  "suck head", "suck dick", "suck my", "eat my", "eat out", "swallow cum", "swallow load", 
  "goon", "gooning", "gooners", "child predator", "biatch", "buttplug", "fellate", "felching", 
  "knobend", "arrse", "beeyotch", "bosom", "choade", "climax", 
  "diddle", "dimwit", "doofus", "dopey", "douche", "fack", "fcuk", "felcher", "frigga", 
  "fvck", "fxck", "godamn", "herp", "hiv", "hoare", "kawk", "kwif", "lezbian", "lezbo", 
  "lezzie", "lezzy", "mams", "muther", "nazism", "nigri", "nigrifies", "orgasims", 
  "orgasmic", "orgies", "pedo", "pedophiliac", "pisser", "pusse", "pussi", 
  "queero", "rtard", "raper", "raunch", "retarded", "scrot", "scrote", "shagger", "shite", 
  "shited", "shitey", "shitt", "smutty", "soused", "spick", "spiks", "tittie", 
  "twats", "twatty", "twunter", "wanker", "wanky", "weenie", "whoar"
];

const BOUNDARY_BAD_WORDS = [
  "ass", "anal", "rape", "cum", "weed", "pot", "dih", "kys", "stroke", "snatch", "knob", "muff", "tit", "tits", 
  "chode", "dong", "hump", "lube", "pimp", "scat", "shaft", "shag", "skank", "strip", "tart", 
  "tramp", "sex", "boner", "perv", "fag", "fk", "fuk", "bum", "crap", "damn", "hell", "homo", 
  "jerk", "lmao", "omg", "piss", "poop", "prick", "pube", "queer", "turd", "oral", "head",

  // --- Relocated potential false-positive roots & generic terms ---
  "gai", "gae", "pron", "cipa", "dago", "titi", "pms", "bra", "crack", "fat", "lust", "pee", "rum", 
  "screw", "scum", "vag", "puss", "titt", "babe", "drunk", "dummy", "kill", "naked", "organ", "pawn", "potty", "stupid"
];

// Exceptions that are clean despite matching boundary rules
const EXCEPTIONS = ["pen is", "penis mightier"];

// Recognized affixes that keep bad boundary words flagged (e.g. dumbass, asses)
const ALLOWED_SUFFIXES = [
  "s", "es", "z", "ez", "ed", "d", "ing", "in", "er", "ers", "a", "ah", "r", "y", "ie", "ee", "ly", 
  "bag", "head", "hole", "tard", "wad", "wit", "face", "shit", "fuck", "cock", "muncher", 
  "sucker", "licker", "fucker", "boy", "girl", "hat", "wipe", "plug", "munch", "juice"
];

const ALLOWED_PREFIXES = [
  "dumb", "jack", "fat", "smart", "lazy", "ugly", "shit", "fuck", "bitch", "cum", "cock", "ass", 
  "mother", "motha", "bull", "horse", "dog", "cat", "pig", "cow", "rat", "pieceof"
];

// ============================================================================
// OBSCENITY ENGINE
// ============================================================================

const ObscenityEngine = (function () {

  // Dynamic Sus Adjectives Combiner
  const SUS_MODIFIERS = ["wet", "hard", "juicy", "throbbing", "stiff", "sweaty", "sticky", "horny", "massive"];
  const SUS_TARGETS = ["eggplant", "peach", "sausage", "weiner", "hotdog", "cucumber", "banana", "melon", "meat", "stick", "wood", "kitty", "cat"];
  
  for (let m = 0; m < SUS_MODIFIERS.length; m++) {
    for (let t = 0; t < SUS_TARGETS.length; t++) {
      SUBSTRING_BAD_WORDS.push(SUS_MODIFIERS[m] + " " + SUS_TARGETS[t]);
    }
  }

  const escapeRegExp = function(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const buildRegex = function(word) {
    let cleanWord = word.toLowerCase().replace(/[\s_\-\.\*]/g, "");
    if (cleanWord.length === 0) return null;
    
    // Deduplicate to allow regex + rule to function effectively
    cleanWord = cleanWord.replace(/(.)\1+/g, '$1');

    let patternStr = "";
    for(let k=0; k<cleanWord.length; k++) {
       let c = cleanWord[k];
       let nextC = cleanWord[k+1];
       let isLast = (k === cleanWord.length - 1);
       let isSecondToLast = (k === cleanWord.length - 2);
       
       if (c === 'c' && nextC === 'k') {
          patternStr += '(?:c+k+|k+|x+|q+)';
          k++; 
       }
       else if (c === 'i' && nextC === 'e' && isSecondToLast) {
          patternStr += '(?:i+e+|y+|e+e+|e+y+|i+i+)';
          k++;
       }
       else if (c === 'e' && nextC === 'r' && isSecondToLast) {
          patternStr += '(?:e+r+|a+|r+|a+h+)';
          k++;
       }
       else if (c === 'y' && isLast) {
          patternStr += '(?:y+|i+e+|e+e+|e+y+|i+i+)';
       }
       else if (c === 's' && isLast) {
          patternStr += '(?:s+|z+)';
       }
       else if (c === 'z' && isLast) {
          patternStr += '(?:z+|s+)';
       }
       else if (c === 'o' && isLast) {
          patternStr += '(?:o+|o+e+)';
       }
       else {
          patternStr += escapeRegExp(c) + '+';
       }
    }
    return new RegExp(patternStr, 'g');
  };

  const REGEX_SUBSTRING = [];
  const REGEX_BOUNDARY = [];

  for (let i = 0; i < SUBSTRING_BAD_WORDS.length; i++) {
    const r = buildRegex(SUBSTRING_BAD_WORDS[i]);
    if (r) REGEX_SUBSTRING.push({ word: SUBSTRING_BAD_WORDS[i], regex: r });
  }

  for (let j = 0; j < BOUNDARY_BAD_WORDS.length; j++) {
    const r = buildRegex(BOUNDARY_BAD_WORDS[j]);
    if (r) REGEX_BOUNDARY.push({ word: BOUNDARY_BAD_WORDS[j], regex: r });
  }

  function normalizeWithMap(input) {
    let normalized = "";
    let i = 0;
    const lowerInput = input.toLowerCase();

    while (i < lowerInput.length) {
      const char = lowerInput[i];

      if (char === '_' || char === ' ' || char === '-') {
        i++;
        continue;
      }

      let multiMatched = false;
      for (let m = 0; m < MULTI_DELEET.length; m++) {
        const pat = MULTI_DELEET[m].pattern;
        if (lowerInput.substring(i, i + pat.length) === pat) {
          normalized += MULTI_DELEET[m].rep;
          i += pat.length;
          multiMatched = true;
          break;
        }
      }
      if (multiMatched) continue;

      // Map numbers/symbols to letters, keep regular letters completely intact
      const resolved = DELEET_MAP[char] || char;
      normalized += resolved;
      i++;
    }

    return { normalized: normalized, original: lowerInput };
  }

  function getWordCharsPrefix(str, index) {
    let prefix = "";
    for (let i = index - 1; i >= 0; i--) {
      if (/[a-z0-9]/i.test(str[i])) {
        prefix = str[i] + prefix;
      } else {
        break;
      }
    }
    return prefix;
  }

  function getWordCharsSuffix(str, index) {
    let suffix = "";
    for (let i = index; i < str.length; i++) {
      if (/[a-z0-9]/i.test(str[i])) {
        suffix += str[i];
      } else {
        break;
      }
    }
    return suffix;
  }

  function checkExceptions(origStr) {
    const cleanOrig = origStr.replace(/[_]/g, ' ').replace(/\s+/g, ' ').trim();
    for (let e = 0; e < EXCEPTIONS.length; e++) {
      if (cleanOrig.indexOf(EXCEPTIONS[e]) !== -1) return true;
    }
    return false;
  }

  function scan(input) {
    if (!input) return false;
    
    const data = normalizeWithMap(input);
    const norm = data.normalized;
    const orig = data.original;

    if (checkExceptions(orig)) return false;

    // 1. Check Substring Words
    for (let s = 0; s < REGEX_SUBSTRING.length; s++) {
      const entry = REGEX_SUBSTRING[s];
      entry.regex.lastIndex = 0; 
      const found = entry.regex.test(norm);
      entry.regex.lastIndex = 0; 
      if (found) {
        return true;
      }
    }

    // 2. Check Boundary Words with Affixes
    for (let r = 0; r < REGEX_BOUNDARY.length; r++) {
      const bEntry = REGEX_BOUNDARY[r];
      bEntry.regex.lastIndex = 0; 
      let match;

      while ((match = bEntry.regex.exec(norm)) !== null) {
        const prefix = getWordCharsPrefix(norm, match.index);
        const suffix = getWordCharsSuffix(norm, match.index + match[0].length);
        
        const prefixValid = (prefix === "" || ALLOWED_PREFIXES.indexOf(prefix) !== -1);
        const suffixValid = (suffix === "" || ALLOWED_SUFFIXES.indexOf(suffix) !== -1);

        if (prefixValid && suffixValid) {
          bEntry.regex.lastIndex = 0; 
          return true; 
        }
      }
      bEntry.regex.lastIndex = 0; 
    }
    
    return false;
  }

  return { hasMatch: scan };
})();

// ============================================================================
// SMART PHONETIC & SUBTLE REDUCTION LOGIC
// ============================================================================

function applySmartSubtleReduction(word) {
  if (!word || word.length < 3) return null;
  const str = word.toLowerCase();

  const candidates = [];

  // --- Phonetics/Endings ---
  const matchY = str.match(/([^aeiou])(ie|y|ee)$/);
  if (matchY) {
    const base = str.substring(0, matchY.index + 1);
    const currentEnding = matchY[2];
    const endings = ["y", "ie", "ee", "ii", "ey"].filter(e => e !== currentEnding);
    candidates.push(base + endings[Math.floor(Math.random() * endings.length)]);
  }

  if (/er$/.test(str)) {
    const opts = ["a", "r", "ah"];
    candidates.push(str.replace(/er$/, opts[Math.floor(Math.random() * opts.length)]));
  }

  if (/ck$/.test(str)) {
    const opts = ["k", "x", "q"];
    candidates.push(str.replace(/ck$/, opts[Math.floor(Math.random() * opts.length)]));
  }

  if (/s$/.test(str)) candidates.push(str.replace(/s$/, "z"));
  if (/z$/.test(str)) candidates.push(str.replace(/z$/, "s"));
  if (/o$/.test(str)) candidates.push(str.replace(/o$/, "oe"));

  const reduced = str.charAt(0) + str.slice(1).replace(/[aeiou]/g, "");
  if (reduced.length >= 3 && reduced.length !== str.length) {
    candidates.push(reduced);
  }

  // --- Structural Reductions ---
  const doubleLetterPattern = /(.)\1+/g;
  const reducedDouble = str.replace(doubleLetterPattern, '$1');
  if (reducedDouble !== str && reducedDouble.length >= 3) {
    candidates.push(reducedDouble);
  }

  const vowels = ['a', 'e', 'i', 'o', 'u'];
  for (let i = 1; i < str.length - 1; i++) {
    if (vowels.indexOf(str[i]) !== -1) {
      const reducedVowel = str.slice(0, i) + str.slice(i + 1);
      if (reducedVowel.length >= 3 && reducedVowel.length <= 20) {
        candidates.push(reducedVowel);
      }
    }
  }

  if (str.length > 6) {
    const truncated = str.substring(0, Math.max(4, Math.floor(str.length * 0.7)));
    if (truncated.length >= 3) {
      candidates.push(truncated);
    }
  }

  const suffixes = ['er', 'ly', 'ing', 'ed', 'ness', 'tion', 'sion', 'ment', 'able', 'ible'];
  for (let s = 0; s < suffixes.length; s++) {
    const suffix = suffixes[s];
    if (str.endsWith(suffix) && str.length > suffix.length + 2) {
      const stemmed = str.slice(0, -suffix.length);
      if (stemmed.length >= 3) {
        candidates.push(stemmed);
        break;
      }
    }
  }

  // Deduplicate and pick random candidate
  if (candidates.length > 0) {
    const uniqueCandidates = [...new Set(candidates)];
    const validCandidates = uniqueCandidates.filter(c => c.length >= 3 && c.length <= 20);

    if (validCandidates.length > 0) {
      return validCandidates[Math.floor(Math.random() * validCandidates.length)];
    }
  }

  return null;
}

// ============================================================================
// HELPERS
// ============================================================================

async function getRandomWord(mode) {
  try {
    const response = await http.get("https://random-word-api.herokuapp.com/word?number=5");
    const words = response.data;
    
    if (!Array.isArray(words) || words.length === 0) return "bruh";

    if (mode === "short") {
      const short = words.find(w => w.length <= 5);
      return short || words[0]; 
    } else if (mode === "medium") {
      const med = words.find(w => w.length <= 9);
      return med || words[0];
    }
    return words[0];
  } catch (e) {
    return "bruh"; 
  }
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ============================================================================
// MASTER AVAILABILITY CHECKER
// ============================================================================

async function checkRobloxValidation(usernameToTest) {
  const apiUrl = "https://auth.roblox.com/v2/usernames/validate";
  const payload = { "username": usernameToTest, "birthday": "1999-01-01" };

  try {
    const response = await http.post(apiUrl, payload, { validateStatus: () => true });
    // Code 0 is success in Roblox's validate schema [1]
    if (response.data && typeof response.data.code !== 'undefined') {
      return response.data.code === 0;
    }
    return true;
  } catch (error) {
    return false;
  }
}

async function checkIsProfane(text) {
  try {
    const encodedText = encodeURIComponent(text);
    const url = "https://www.purgomalum.com/service/json?text=" + encodedText;
    const response = await http.get(url, { validateStatus: () => true });
    if (response.data && response.data.result && response.data.result.indexOf("*") !== -1) return true; 
    return false;
  } catch (e) {
    return false; 
  }
}

async function checkUsernameAvailability(usernameToTest) {
  if (!usernameToTest || !/^[a-zA-Z0-9_]+$/.test(usernameToTest)) return false;
  
  // Roblox rule: at most 1 underscore, and cannot start or end with underscore
  if (usernameToTest.startsWith('_') || usernameToTest.endsWith('_')) return false;
  const underscores = (usernameToTest.match(/_/g) || []).length;
  if (underscores > 1) return false;

  if (usernameToTest.length < 3 || usernameToTest.length > 20) return false;

  if (ObscenityEngine.hasMatch(usernameToTest)) return false;

  if (!(await checkRobloxValidation(usernameToTest))) return false;

  let cookieHeader = "";
  if (ROBLOX_SECURITY_TOKEN) {
    cookieHeader = ROBLOX_SECURITY_TOKEN.startsWith(".ROBLOSECURITY=") 
      ? ROBLOX_SECURITY_TOKEN 
      : `.ROBLOSECURITY=${ROBLOX_SECURITY_TOKEN}`;
  }

  const apiUrl = "https://users.roblox.com/v1/usernames/users";
  const payload = { "usernames": [usernameToTest], "excludeBannedUsers": false };

  try {
    const response = await http.post(apiUrl, payload, {
      headers: cookieHeader ? { 'Cookie': cookieHeader } : {},
      validateStatus: () => true
    });

    if (response.status !== 200) return false; 

    const isRobloxAvailable = (response.data && response.data.data && response.data.data.length === 0);
    if (!isRobloxAvailable) return false;

    return !(await checkIsProfane(usernameToTest));
  } catch (error) {
    return false;
  }
}

async function solveLeetspeak(word) {
  const wordArr = word.toLowerCase().split('');
  const indices = [];
  
  for (let i = 0; i < wordArr.length; i++) {
    if (LEET_MAP[wordArr[i]]) indices.push(i);
  }

  if (indices.length === 0) return null;

  const maxLevel = Math.min(indices.length, 3);
  
  // Rate-limiting-safe: max 2 attempts per level
  for (let level = 1; level <= maxLevel; level++) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const tempWordArr = [...wordArr];
      const targets = shuffleArray(indices).slice(0, level);
      
      targets.forEach(idx => {
        const char = tempWordArr[idx];
        const replacements = LEET_MAP[char];
        const replacementIdx = Math.floor(Math.random() * Math.min(replacements.length, 2)); 
        tempWordArr[idx] = replacements[replacementIdx];
      });

      const candidate = tempWordArr.join('');
      if (candidate.length >= 3 && candidate.length <= 20) {
        if (await checkUsernameAvailability(candidate)) {
          return candidate;
        }
      }
    }
  }
  return null;
}

// ============================================================================
// COOL GENERATOR LOGIC
// ============================================================================

async function generateCoolUsername() {
  const isComboMode = Math.random() < 0.30; 
  const slangListDefined = typeof SLANG_LIST !== 'undefined' && SLANG_LIST.length > 0;

  if (isComboMode) {
    const comboType = Math.random(); 
    let part1 = "";
    let part2 = "";

    if (comboType < 0.33) {
      const allowLong = Math.random() < 0.20;
      part1 = await getRandomWord(allowLong ? "medium" : "short");
      part2 = await getRandomWord(allowLong ? "medium" : "short");
    } else if (comboType < 0.66) {
      const rawSlang1 = slangListDefined ? SLANG_LIST[Math.floor(Math.random() * SLANG_LIST.length)] : await getRandomWord("short");
      part1 = rawSlang1.replace(/_/g, ""); 
      part2 = await getRandomWord("short");
    } else {
      part1 = await getRandomWord("short");
      const rawSlang2 = slangListDefined ? SLANG_LIST[Math.floor(Math.random() * SLANG_LIST.length)] : await getRandomWord("short");
      part2 = rawSlang2.replace(/_/g, "");
    }
    
    part1 = part1.charAt(0).toUpperCase() + part1.slice(1);
    part2 = part2.charAt(0).toUpperCase() + part2.slice(1);
    
    let combined = part1 + part2;
    if (combined.length > 20) combined = combined.substring(0, 20);

    if (await checkUsernameAvailability(combined)) {
      return { "username": combined, "available": true, "method": "ComboMode" };
    } else {
      return { "available": false };
    }

  } else {
    let baseWord = "";
    const isSlang = Math.random() < 0.85;

    if (isSlang && slangListDefined) {
      const rawSlang = SLANG_LIST[Math.floor(Math.random() * SLANG_LIST.length)];
      baseWord = rawSlang.replace(/_/g, "");
    } else {
      baseWord = await getRandomWord("random");
    }
    
    if (await checkUsernameAvailability(baseWord)) {
         return { "username": baseWord, "available": true, "method": "CleanRandom" };
    }

    const methodChoice = Math.random();
    
    if (methodChoice < 0.50) {
      const subtleResult = applySmartSubtleReduction(baseWord);
      if (subtleResult && (await checkUsernameAvailability(subtleResult))) {
        return { "username": subtleResult, "available": true, "method": "SubtleReduction" };
      }
    } 
    
    const leetResult = await solveLeetspeak(baseWord);
    if (leetResult) {
      return { "username": leetResult, "available": true, "method": "Leetspeak" };
    }

    return { "available": false };
  }
}

// ============================================================================
// EXPRESS REQUEST HANDLERS
// ============================================================================

async function handleCoolRequest() {
  for (let i = 0; i < 4; i++) {
    const result = await generateCoolUsername();
    
    if (result.available && !ObscenityEngine.hasMatch(result.username)) {
       return result;
    }
  }

  return {
      "username": null,
      "available": false,
      "error": "Generation timed out."
  };
}

async function handleRandomWordRequest() {
  const w = await getRandomWord("random");
  const avail = await checkUsernameAvailability(w);
  return { "username": w, "available": avail };
}

async function handleSpecificCheck(username) {
  if (!username) return "TAKEN";
  return (await checkUsernameAvailability(username)) ? "AVAILABLE" : "TAKEN";
}

// ============================================================================
// EXPRESS ROUTES (Render Ready)
// ============================================================================

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Roblox Username Checker API' });
});

app.get('/api', async (req, res) => {
  try {
    if (req.query.cool === "true") {
      const result = await handleCoolRequest();
      return res.json(result);
    }
    if (req.query.word === "true") {
      const result = await handleRandomWordRequest();
      return res.json(result);
    }
    const result = await handleSpecificCheck(req.query.username);
    return res.type('text').send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
