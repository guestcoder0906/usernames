// ============================================================================
// CONFIGURATION & AUTH
// ============================================================================

// Paste your ALT ACCOUNT'S .ROBLOSECURITY token here.
const ROBLOX_SECURITY_TOKEN = ".ROBLOSECURITY=_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_CAEaAhADIhsKBGR1aWQSEzI4MjQ4MDY1MjAxODE0ODU5NjgoAw.UDvu7ApDV2ioGTXEVU5BvXJdmVA8JGCSdOuk8upyk7bwZD8IzKq1vvZ3dxL-eCka5tPMMpepNr2HLuQvArUEWvwLk-SmJDPmZzNhaYgK0BNeSO5Gg1QyCryBO5EnipCOIFsoTLhu1-ZSgqItI5eQz2YxFS-XAyt-viTBQWLN6JszRFXYqWxaNEPJSNjQIOcqCZaI9jwxk0dfFlNLumRPEPxTnUCw6exG0uSiVmSeBUVKuoX1lPkD7nmN0xA1XY8vP2_MeAh5hCnMkHFwMTHH8VxGXaNhHIebarTlDu6UFT27MGbYVGIfYdB2uvehGUNDbISJBSZEulacAZYebGL1uZEfTg6TP0ymQSXZllRPtQ8dpo_24jb2_GPibuvDxwxNJqUl3wawQKXHYfXRwcxSAqiIyfZGrMd--lUjhmpg5q17ajvN8CwIH2nQw8ugwJqkdL7Vg7BpvlKAujbx0nk239abBEN9b--4hI7DBQxbH--FLu7vGEqChLUZhdxsZN1YcVrjE652GXxy-TKgWDALZceEAu9mjw2PhoNmeePcqq-px8G6YdzXz3aF0umVkjwS4VsqaUvRVmcYBNOZuP4iygrrBfHdiKVuiuwvbDMZkFqeXFVJtcfTB0h0BWJrqadnLRb6ZOlunCqZmeezP5GblzfikIxSkG4CtCihA7dQ-HRGgln_hwrll1AFTfZYKCe6Y8MWaIi0WUKdo8ocByf8GglVTZDRAIj9qGxuOEpDlGky8BD_HdwPF7UsT5F5LucebAaJ0wPxMkXFt-TH_de_jBKfIJRJcfb2_lb5GQRRAh3_GKDS";

// Valid Roblox Leetspeak Map (Filtered for a-z, 0-9, _)
const LEET_MAP = {
  'a': ['4'],
  'b': ['8', '13', 'l3', '6'],
  'e': ['3'],
  'f': ['ph'],
  'g': ['6', '9'],
  'i': ['1', 'l'], 
  'l': ['1', '7', 'l_'],
  'o': ['0'],
  'p': ['9'],
  'q': ['9', '2'],
  'r': ['12', 'lz'],
  's': ['5', 'z', '2'],
  't': ['7', '1', 'l'],
  'w': ['vv', 'uu'],
  'x': ['ex', 'ecks'],
  'z': ['2']
};

// PURE SLANG / BRAINROT / MEME LIST
const SLANG_LIST = [
  // --- USER SPECIFIC REQUESTS ---
  "labubu", "popmart", "hirono", "crybaby", "dimoo", "skullpanda", "zimomo", "kpopdemonhunters", "demon_hunter",
  "tungtungsahur", "sahur", "bukber", "takjil", "lebaran", "thr", "bjir", "wkwk", "anjay", "bocil", "epep", "cilukba",
  "kats_eye", "bk_foot_lettuce", "number_15",

  // --- VIRAL PRODUCTS / TRENDS ---
  "sonny_angel", "smiski", "owala", "stanley_cup", "coquette", "bows", "downtown_girl", "star_boy",
  "luh_calm_fit", "tuff", "motion", "standing_on_business", "crash_out", "crashing_out", "hawk_tuah", "spit_on_that_thang",
  "winter_arc", "lock_in", "locked_in", "typeshit", "type_shit", "fein", "not_like_us", "euphoria", "meet_the_grahams",
  "matcha_latte", "oat_milk", "cold_brew", "sriracha", "baja_blast", "grimace_shake", "pink_sauce", "prime_drink",
  "lunchly", "feastables", "mrbeast_bar", "takis", "hot_cheetos", "buldak", "samyang", "carbonara", "tanghulu",

  // --- ANIME / MANHWA / CULT ---
  "nah_id_win", "stand_proud", "domain_expansion", "infinite_void", "malevolent_shrine", "hollow_purple", "mahoraga", 
  "sukuna", "gojo", "toji", "geto", "solo_leveling", "jin_woo", "arise", "shadow_monarch", "bocchi", "rock", 
  "za_warudo", "kono_dio_da", "yare_yare", "bankai", "rasengan", "chidori", "dattebayo", "gear_5", "nika", "joyboy",
  "shibuya_incident", "culling_game", "black_flash", "blue_lock", "isagi", "egoist", "bachira", "nagi", "barou",
  "demon_slayer", "tanjiro", "nezuko", "zenitsu", "inosuke", "rengoku", "muzans", "akaza", "kokushibo", "yoriichi",
  "chainsaw_man", "denji", "makima", "power", "aki", "pochita", "gun_devil", "control_devil", "spy_x_family", "anya",
  "yor_forger", "loid_forger", "bond", "berserk", "guts", "griffith", "behelit", "eclipse", "dragonslayer", "brand_of_sacrifice",
  "one_piece", "luffy", "zoro", "sanji", "nami", "usopp", "chopper", "robin", "franky", "brook", "jinbe", "kaido",
  "shanks", "mihawk", "buggy", "cross_guild", "marineford", "wano", "egghead", "gear_2", "gear_3", "gear_4", "haki",
  "evangelion", "shinji", "asuka", "rei", "unit_01", "nerv", "seele", "impact", "angel", "spear_of_longinus",

  // --- BRAINROT / GEN ALPHA ---
  "skibidi", "skibidi_toilet", "fanum", "fanum_tax", "gyatt", "gyat", "rizz", "rizzler", "sigma", "sigma_male", "ohio", "only_in_ohio",
  "baby_gronk", "livvy_dunne", "mewing", "mog", "mogging", "looksmax", "looksmaxxing", "edging", "bussin", 
  "sheesh", "glaze", "glazing", "yapping", "yapper", "blud", "cuh", "jit", "shiesty", "opp", "opps", "zaza", "delulu", "solulu",
  "sus", "amogus", "impostor", "baka", "sussy", "vented", "karen", "boomer", "zoomer", "ok_boomer", "no_cap", "fr", "ong", 
  "bet", "finna", "yeet", "yoink", "periodt", "slay", "ate", "left_no_crumbs", "main_character", "npc", "npc_energy", "bombastic",
  "brain_rot", "doom_scrolling", "chronically_online", "ipad_kid", "sephora_kid", "stan_twitter", "plot_armor", "jump_scare", 
  "fever_dream", "backrooms", "liminal_space", "thug_shaker", "ambatukam", "omaygot", "dreamybull", "batman_arkham", "jonkler", 
  "man_ham", "killer_cock", "is_he_stupid", "lore_reason", "just_created", "character_name", "metal_pipe", "falling_pipe",
  "vine_boom", "bruh_sound", "taco_bell_bong", "soda", "obamna", "biden_blast", "dark_brandon", "let_me_be_clear",
  "chocolate_chocolate", "ice_cream", "bing_chilling", "lao_gan_ma", "john_xina", "social_credit", "wocky_slush", "oacky_way",

  // --- GAMING TERMS (GENERAL) ---
  "skill_issue", "diff", "jungle_diff", "top_diff", "mid_diff", "bot_frag", "top_frag", "touch_grass", "ggez", "get_gud", 
  "ratio", "l_ratio", "w_mans", "common_w", "rare_l", "rage_quit", "speedrun", "hax", "haxxor", "pwned", "rekt",
  "aimbot", "wallhack", "spinbot", "admin_abuse", "permaban", "shadowban", "alt_account", "smurf", "inting", "feeding", 
  "trolling", "griefing", "spawn_peek", "one_tap", "clip_it", "clipped", "caught_in_4k", "pocket_sage", "battle_pass",
  "clutch", "ace", "penta_kill", "quadra_kill", "triple_kill", "double_kill", "first_blood", "killing_spree", "godlike",
  "legendary", "shutdown", "executed", "wasted", "busted", "mission_passed", "respect_plus", "wasted_money", "heist",
  "rank_up", "derank", "hardstuck", "elo_hell", "matchmaking", "rng", "rng_gods", "gacha", "pity", "fifty_fifty",
  "whale", "dolphin", "f2p", "p2w", "grind", "farming", "afk", "brb", "gtg", "omw", "npc_interaction", "dialogue_skipper",
  "speedrunner", "tas", "glitchless", "any_percent", "softlock", "hardlock", "crash", "blue_screen", "lag", "ping",
  "packet_loss", "rubber_band", "server_issue", "devs_lazy", "indie_dev", "aaa_game", "bug", "feature", "patch_notes",
  "nerf", "buff", "rework", "balance", "meta", "off_meta", "cheese", "strat", "tactics", "callouts", "comms",

  // --- ROBLOX SPECIFIC ---
  "bloxy", "devex", "dominus", "valkyrie", "headless", "korblox", "limiteds", "adopt_me", "brookhaven", "bloxburg", "bedwars", 
  "da_hood", "arsenal", "phantom_forces", "pet_sim", "psx", "pet_sim_99", "titanic", "huge", "exclusive", "shiny", "rainbow",
  "dark_matter", "golden", "diamond", "emerald", "obsidian", "void", "hacked", "beamed", "cookie_logged", "pged", "poisoned",
  "clean", "rap", "value", "demand", "projection", "flipping", "snipping", "botting", "trade_hangout", "mm2", "murder_mystery",
  "sheriff", "murderer", "innocent", "godly", "chroma", "ancient", "vintage", "corrupt", "luger", "shark", "slasher", "heat",
  "laser", "fang", "saw", "seer", "gem", "coin", "prestige", "rebirth", "leaderboard", "obby", "tower_of_hell", "toh",
  "misery", "jukes_towers", "citadel", "steeple", "difficulty_chart", "parkour", "shift_lock", "flick", "wall_hop", "ladder_flick",
  "corner_clip", "laugh_clip", "dance_clip", "glitch_wrap", "stud", "truss", "conveyor", "killbrick", "checkpoint", "stage",
  "tycoon", "dropper", "upgrader", "conveyor_belt", "cash_grab", "simulator", "clicking", "tapping", "mining", "lifting",
  "boxing", "fighting", "anime_defenders", "toilet_tower", "ttd", "all_star", "astd", "bloxfruits", "kitsune", "leopard",
  "dragon", "spirit", "control", "venom", "shadow", "dough", "t_rex", "mammoth", "gravity", "blizzard", "pain", "rumble",
  "portal", "phoenix", "sound", "spider", "love", "buddha", "quake", "magma", "ghost", "barrier", "rubber", "light",
  "diamond_fruit", "dark_fruit", "sand", "ice", "falcon", "flame", "spike", "smoke", "bomb", "spring", "chop", "spin",
  "rocket", "perm", "permanent", "gamepass", "fruit_notif", "dark_blade", "yig", "cdk", "cursed_dual", "soul_guitar",
  "ghoul", "cyborg", "mink", "human", "shark_race", "angel_race", "v4", "awakening", "raid", "fragment", "beli",

  // --- VALORANT / SHOOTERS ---
  "jett", "reyna", "sage", "omen", "phoenix", "raze", "sova", "cypher", "brimstone", "viper", "killjoy", "skye", "yoru",
  "astra", "kayo", "chamber", "neon", "fade", "harbor", "gekko", "deadlock", "iso", "clove", "radiant", "immortal",
  "ascendant", "diamond", "platinum", "gold", "silver", "bronze", "iron", "tenz", "faker", "shroud", "tarik", "aceu",
  "i_miss_her", "precise_gunplay", "run_and_gun", "spray_and_pray", "lineups", "nerd_lineups", "grim_walls", "rat",
  "corner_camper", "judge", "odin", "operator", "op_crutch", "vandal", "phantom", "sheriff_demon", "deagle", "awp",
  "rush_b", "plant_the_bomb", "defuse", "ninja_defuse", "save", "eco", "force_buy", "full_buy", "hero_buy", "glass_cannon",

  // --- MINECRAFT / SANDBOX ---
  "creeper", "aw_man", "steve", "alex", "herobrine", "notch", "jeb", "dinnerbone", "dream", "georgenotfound", "sapnap",
  "technoblade", "philza", "tommyinnit", "tubbo", "ranboo", "wilbur", "manhunt", "speedrunner_vs", "hunter", "ender_dragon",
  "wither", "warden", "ancient_city", "netherite", "diamond_armor", "enchanted", "mending", "sharpness", "protection",
  "unbreaking", "efficiency", "fortune", "silk_touch", "looting", "infinity", "flame", "punch", "knockback", "thorns",
  "elytra", "shulker", "totem", "raid_farm", "iron_farm", "villager", "trading_hall", "zombie", "skeleton", "enderman",
  "spider", "cave_spider", "slime", "magma_cube", "ghast", "blaze", "piglin", "hoglin", "strider", "phantom_mob",

  // --- VIRAL NAMES / ENTITIES / MEMES ---
  "duolingo", "mrbeast", "ishowspeed", "kai_cenat", "xqc", "hasbulla", "gigachad", "andrew_tate", "top_g", "matrix", "escape_matrix",
  "hustlers_university", "quandale", "dingle", "goofy_ahh", "uncle_prod", "morbius", "morb", "morbillion", "shrek", "doge", "cheems",
  "pepe", "monkaw", "kekw", "pog", "poggers", "weirdchamp", "monkas", "malding", "seething", "soyjak", "chad",
  "wojak", "doomer", "bloomer", "trad", "based", "cringe", "red_pilled", "blue_pilled", "black_pilled", "rug_pull", "diamond_hands",
  "paper_hands", "to_the_moon", "hodl", "stonks", "dogecoin", "elon_musk", "sub_to_pewdiepie", "tseries", "pewdiepie", "oi_hughie", "homelander", "starlight", "vought", "the_boys", "compound_v", "temp_v", "butcher",
  "soldier_boy", "black_noir", "deep", "a_train", "translucent", "stormfront", "firecracker", "sister_sage", "tek_knight",
  "breaking_bad", "walter_white", "heisenberg", "jesse_pinkman", "saul_goodman", "better_call_saul", "gus_fring", "los_pollos",
  "mike_ehrmantraut", "kid_named_finger", "chicanery", "tuco", "lalo", "salamanca", "nacho", "howard_hamlin", "kim_wexler",
  "patrick_bateman", "american_psycho", "sigma_grindset", "paul_allen", "dorsia", "sea_urchin", "business_card", "bone",
  "silian_rail", "pale_nimbus", "fight_club", "tyler_durden", "narrator", "project_mayhem", "first_rule", "soap",
  "ryan_gosling", "drive", "blade_runner", "ken", "barbie", "oppenheimer", "barbenheimer", "cillian_murphy", "florence_pugh",
  "taylor_swift", "swiftie", "eras_tour", "travis_kelce", "chiefs", "nfl", "superbowl", "halftime", "beyonce", "renaissance",
  "kanye", "ye", "yeezy", "vultures", "carnival", "playboi_carti", "vamp", "ken_carson", "destroy_lonely",
  "homixide_gang", "f1lthy", "wakeupf1lthy", "metro_boomin", "future", "drake", "kendrick", "lamar", "j_cole", "big_3",

  // --- PHRASES (COMPLEX UNDERSCORE LOGIC APPLIES HERE) ---
  // NOTE: Phrases over 20 chars have been shortened or removed to ensure validity.
  "bombastic_side_eye", "criminal_side_eye", "vibe_check", "aura_farming", "aura_points", "negative_aura", "plus_aura", 
  "emotional_damage", "villain_arc", "canon_event", "core_memory", "pov_you", "down_bad", "caught_lacking", "gatekeep", "gaslight", 
  "girlboss", "pick_me", "side_eye", "let_him_cook", "who_let_him_cook", "bro_visited", "bro_thinks_he", 
  "situation_ship", "love_bombing", "trauma_dump", "girl_math", "boy_math", "math_aint_mathing", 
  "shadow_wizard", "money_gang", "casting_spells", "legalize_bombs", "nuclear_bomb", "hydrogen_baby", "coughing_baby",
  "main_character", "protagonist", "antagonist", "redemption_arc", "training_arc", "beach_episode", "filler_episode",
  "happy_cake_day", "edit_thanks", "kind_stranger", "reddit_gold", "discord_mod", "kitten", "discord_kitten", "nitro",
  "server_boost", "general_chat", "slow_mode", "touch_grass", "go_outside", "vitamin_d", "sunlight", "shower", "deodorant",

  // --- AESTHETICS / CORES ---
  "cottagecore", "goblincore", "fairycore", "weirdcore", "dreamcore", "traumacore", "glitchcore", "webcore", "oldweb",
  "frutiger_aero", "y2k", "cyberpunk", "steampunk", "dieselpunk", "solarpunk", "vaporwave", "synthwave", "retrowave",
  "dark_academia", "light_academia", "balletcore", "barbiecore", "bimbocore", "normcore", "gorpcore", "blokecore",
  "angelcore", "devilcore", "clowncore", "kidcore", "lovecore", "royalcore", "spacecore", "witchcore", "zombiecore",

  // --- FOOD & DRINK (SLANGIFIED) ---
  "choccy_milk", "nuggies", "tendies", "chimken", "borgar", "pizza_rolls", "bagel_bites", "hot_pocket", "ramen_noodles",
  "cup_noodles", "maruchan", "shin_ramyun", "boba_tea", "bubble_tea", "tapioca", "taro", "brown_sugar", "fruit_tea",
  "monster_energy", "red_bull", "celsius", "gfuel", "gamersupps", "mountain_dew", "doritos", "cheetos", "funyuns",
  "takis_fuego", "blue_heat", "nitro_pepsi", "pilk", "mug_root_beer", "lean", "purple_drank", "sizzurp", "wok",

  // --- ANIMALS / CREATURES ---
  "doggo", "pupper", "woofer", "floof", "good_boy", "zoomies", "sploot", "blep", "mlem", "beans", "toe_beans",
  "catto", "kitten", "void_cat", "orange_cat", "one_brain_cell", "loaf", "liquid_cat", "if_i_fits", "i_sits",
  "sneks", "danger_noodle", "nope_rope", "boop_snoot", "trash_panda", "racoon", "possum", "ferret", "cat_snake",
  "capybara", "ok_i_pull_up", "coconut_doggy", "frogge", "phrog", "wednesday", "my_dudes", "axolotl", "minecraft_axolotl",
  "blue_lobster", "jumpscare", "shark_pup", "blahaj", "ikea_shark", "trans_icon", "spinny_fish", "chip_spin",

  // --- CODING / TECH (NERD SLANG) ---
  "spaghetti_code", "rubber_duck", "hello_world", "foo_bar", "lorem_ipsum", "syntax_error", "segfault", "null_pointer",
  "index_out_of", "infinite_loop", "stack_overflow", "git_push", "git_pull", "git_commit", "force_push", "merge_conflict",
  "sudo", "root", "admin", "localhost", "127_0_0_1", "404_not_found", "500_error", "ddos", "botnet", "script_kiddie",
  "hackerman", "mainframe", "firewall", "proxy", "vpn", "tor", "dark_web", "bitcoin", "crypto", "ethereum", "blockchain",
  "nft", "right_click", "save_as", "screenshot", "minting", "gas_fees", "rug_pull", "pump_and_dump", "diamond_hands",
  "paper_hands", "hodl", "to_the_moon", "rocket_emoji", "stonks", "not_stonks", "wsb", "wallstreetbets", "ape_together",

  // --- MISC FUNNY / RANDOM ---
  "uwu", "owo", "uwu_girl", "gamer_girl", "egirl", "eboy", "pick_me_boy", "soft_boy", "golden_retriever", "black_cat",
  "zodiac", "astrology", "mercury", "retrograde", "gemini", "scorpio", "leo", "libra", "virgo", "aries", "taurus",
  "cancer", "pisces", "aquarius", "capricorn", "sagittarius", "crystal_girl", "manifesting", "lucky_girl", "syndrome",
  "affirmations", "red_flag", "green_flag", "beige_flag", "ick", "turn_off", "deal_breaker", "ghosting", "zombieing",
  "breadcrumbing", "benching", "cushioning", "orbiting", "haunting", "roaching", "pocketing", "stashing", "love_bomb",
  "twin_flame", "soulmate", "karmic", "situationship", "friends_w_benefits", "fwb", "nsa", "dtr", "define_relationship",
  "hard_launch", "soft_launch", "boyfriend_reveal", "girlfriend_reveal", "engagement", "divorce", "alimony", "child_support"
];

// ============================================================================
// THE MASSIVE BLACKLIST (Exact matches only)
// ============================================================================
const BASE_BAD_WORDS = [
"2g1c", "2 girls 1 cup", "acrotomophilia", "alabama hot pocket", "alaskan pipeline", "anal", "anilingus", "anus", "apeshit", "arsehole", "ass", "asshole", "assmunch", "auto erotic", "autoerotic", "babeland", "baby batter", "baby juice", "ball gag", "ball gravy", "ball kicking", "ball licking", "ball sack", "ball sucking", "bangbros", "bareback", "barely legal", "barenaked", "bastard", "bastardo", "bastinado", "bbw", "bdsm", "beaner", "beaners", "beaver cleaver", "goon", "gooning", "gooners", "beaver lips", "bestiality", "big black", "big breasts", "big knockers", "big tits", "bimbos", "birdlock", "bitch", "bitches", "black cock", "blonde action", "blonde on blonde action", "blowjob", "blow job", "blow your load", "blue waffle", "blumpkin", "bollocks", "bondage", "boner", "boob", "boobs", "booty call", "brown showers", "brunette action", "bukkake", "bulldyke", "bullet vibe", "bullshit", "bung hole", "bunghole", "busty", "butt", "buttcheeks", "butthole", "camel toe", "camgirl", "camslut", "camwhore", "carpet muncher", "carpetmuncher", "chocolate rosebuds", "circlejerk", "cleveland steamer", "clit", "clitoris", "clover clamps", "clusterfuck", "cock", "cocks", "coprolagnia", "coprophilia", "cornhole", "coon", "coons", "crap", "crappy", "creampie", "cum", "cumming", "cunnilingus", "cunt", "darkie", "date rape", "daterape", "deep throat", "deepthroat", "dendrophilia", "dick", "dildo", "dingleberry", "dingleberries", "dirty pillows", "dirty sanchez", "doggie style", "doggiestyle", "doggy style", "doggystyle", "dog style", "dolcett", "domination", "dominatrix", "dommes", "donkey punch", "double dong", "double penetration", "dp action", "dry hump", "dvda", "eat my ass", "ecchi", "ejaculation", "erotic", "erotism", "escort", "eunuch", "faggot", "fecal", "felch", "fellatio", "feltch", "female squirting", "femdom", "figging", "fingerbang", "fingering", "fisting", "foot fetish", "footjob", "freaky", "frotting", "fuck", "fuck buttons", "fuckin", "fucking", "fucktards", "fudge packer", "fudgepacker", "futanari", "gang bang", "gay sex", "genitals", "giant cock", "girl on", "girl on top", "girls gone wild", "goatcx", "goatse", "god damn", "gokkun", "golden shower", "goodpoop", "goo girl", "goregasm", "grope", "group sex", "g-spot", "guro", "hand job", "handjob", "hard core", "hardcore", "hentai", "homoerotic", "honkey", "hooker", "hot carl", "hot chick", "how to kill", "how to murder", "huge fat", "humping", "incest", "intercourse", "jack off", "jail bait", "jailbait", "jelly donut", "jerk off", "jigaboo", "jiggaboo", "jiggerboo", "jizz", "juggs", "kike", "kinbaku", "kinkster", "kinky", "knobbing", "leather restraint", "leather straight jacket", "lemon party", "lolita", "lovemaking", "make me come", "male squirting", "masturbate", "menage a trois", "milf", "missionary position", "motherfucker", "mound of venus", "mr hands", "muff diver", "muffdiving", "nambla", "nawashi", "negro", "neonazi", "nigga", "nigger", "nig nog", "nimphomania", "nipple", "nipples", "nsfw images", "nude", "nudity", "nympho", "nymphomania", "octopussy", "omorashi", "one cup two girls", "one guy one jar", "orgasm", "orgy", "paedophile", "paki", "panties", "panty", "pedobear", "pedophile", "pegging", "penis", "phone sex", "piece of shit", "pissing", "piss pig", "pisspig", "playboy", "pleasure chest", "pole smoker", "ponyplay", "poof", "poon", "poontang", "punany", "poop chute", "poopchute", "porn", "porno", "pornography", "prince albert piercing", "pthc", "pubes", "pussy", "queaf", "queef", "quim", "raghead", "raging boner", "rape", "raping", "rapist", "rectum", "reverse cowgirl", "rimjob", "rimming", "rosy palm", "rosy palm and her 5 sisters", "rusty trombone", "sadism", "santorum", "scat", "schlong", "scissoring", "semen", "sex", "sexo", "sexy", "shaved beaver", "shaved pussy", "shemale", "shibari", "shit", "shitblimp", "shitty", "shota", "shrimping", "skeet", "slanteye", "slut", "s&m", "smut", "snatch", "snowballing", "sodomize", "sodomy", "spic", "splooge", "splooge moose", "spooge", "spread legs", "spunk", "strap on", "strapon", "strappado", "strip club", "style doggy", "suck", "sucks", "suicide girls", "sultry women", "swastika", "swinger", "tainted love", "taste my", "tea bagging", "threesome", "throating", "tied up", "tight white", "tit", "tits", "titties", "titty", "tongue in a", "topless", "tosser", "towelhead", "tranny", "tribadism", "tub girl", "tubgirl", "tushy", "twat", "twink", "twinkie", "two girls one cup", "undressing", "upskirt", "urethra play", "urophilia", "vagina", "venus mound", "vibrator", "violet wand", "vorarephilia", "voyeur", "vulva", "wank", "wetback", "wet dream", "white power", "wrapping men", "wrinkled starfish", "xx", "xxx", "yaoi", "yellow showers", "yiffy", "zoophilia", "arse", "ballsack", "balls", "biatch", "bloody", "bollock", "bollok", "bugger", "bum", "buttplug", "crap", "damn", "dyke", "fag", "feck", "fellate", "felching", "f u c k", "flange", "Goddamn", "God damn", "hell", "homo", "jerk", "knobend", "knob end", "labia", "lmao", "lmfao", "muff", "omg", "piss", "poop", "prick", "pube", "queer", "scrotum", "s hit", "sh1t", "smegma", "turd", "whore", "4r5e", "50 yard cunt punt", "5h1t", "5hit", "a_s_s", "a2m", "a$$", "a55", "a$$hole", "a55hole", "adult", "aeolus", "ahole", "amateur", "anal impaler", "anal leakage", "analprobe", "ar5e", "areola", "areole", "arian", "arrse", "aryan", "ass fuck", "ass hole", "ass-fucker", "assbang", "assbanged", "assbangs", "asses", "assfuck", "assfucker", "assfukka", "assh0le", "asshat", "assho1e", "assholes", "assmaster", "assmucus", "asswhole", "asswipe", "asswipes", "azazel", "azz", "b!tch", "b00bs", "b17ch", "b1tch", "babe", "babes", "ballbag", "bang", "bang (one's) box", "banger", "barf", "bastards", "bawdy", "beardedclam", "beastial", "beastiality", "beatch", "beater", "beaver", "beef curtain", "beer", "beeyotch", "bellend", "beotch", "bestial", "bi+ch", "bigtits", "bimbo", "bitch tit", "bitched", "bitcher", "bitchers", "bitchin", "bitching", "bitchy", "blow", "blow me", "blow mud", "blowjobs", "blue waffle", "blumpkin", "bod", "bodily", "boink", "boiolas", "bone", "boned", "boners", "bong", "boobies", "booby", "booger", "bookie", "booobs", "boooobs", "booooobs", "booooooobs", "bootee", "bootie", "booty", "booze", "boozer", "boozy", "bosom", "bosomy", "bowel", "bowels", "bra", "brassiere", "breast", "breasts", "buceta", "bull shit", "bullshits", "bullshitted", "bullturds", "bung", "bunny fucker", "bust a load", "butt fuck", "butt fuck", "buttfuck", "buttfucker", "buttmuch", "c-0-c-k", "c-o-c-k", "c-u-n-t", "c.0.c.k", "c.o.c.k.", "c.u.n.t", "c0ck", "c0cksucker", "caca", "cahone", "cameltoe", "cawk", "cervix", "chinc", "chincs", "chink", "choade", "chode", "chodes", "chota bags", "cipa", "cl1t", "climax", "clit licker", "clitorus", "clits", "clitty", "clitty litter", "cnut", "cocain", "cocaine", "cock pocket", "cock snot", "cock sucker", "cock-sucker", "cockblock", "cockface", "cockhead", "cockholster", "cockknocker", "cockmunch", "cockmuncher", "cocksmoker", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "coital", "cok", "cokmuncher", "coksucka", "commie", "condom", "cop some wood", "corksucker", "cornhole", "corp whore", "cox", "crabs", "crack", "cracker", "crackwhore", "crappy", "cum chugger", "cum dumpster", "cum freak", "cum guzzler", "cumdump", "cummer", "cummin", "cums", "cumshot", "cumshots", "cumslut", "cumstain", "cunilingus", "cunillingus", "cunny", "cunt hair", "cunt-struck", "cuntbag", "cuntface", "cunthunter", "cuntlick", "cuntlick", "cuntlicker", "cuntlicker", "cuntlicking", "cunts", "cuntsicle", "cut rope", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d0ng", "d0uch3", "d0uche", "d1ck", "d1ld0", "d1ldo", "dago", "dagos", "dammit", "damned", "damnit", "dawgie-style", "dick hole", "dick shy", "dick-ish", "dickbag", "dickdipper", "dickface", "dickflipper", "dickhead", "dickheads", "dickish", "dickripper", "dicksipper", "dickweed", "dickwhipper", "dickzipper", "diddle", "dike", "dildos", "diligaf", "dillweed", "dimwit", "dingle", "dink", "dinks", "dipship", "dirsa", "dirty Sanchez", "dlck", "dog-fucker", "doggie-style", "doggin", "dogging", "doggy-style", "dong", "donkeyribber", "doofus", "doosh", "dopey", "douch3", "douche", "douchebag", "douchebags", "douchey", "drunk", "duche", "dumass", "dumbass", "dumbasses", "dummy", "dykes", "eat a dick", "eat hair pie", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejakulate", "enlargement", "erect", "erection", "essohbee", "extacy", "extasy", "f u c k e r", "f_u_c_k", "f-u-c-k", "f.u.c.k", "f4nny", "facial", "fack", "fagg", "fagged", "fagging", "faggit", "faggitt", "faggs", "fagot", "fagots", "fags", "faig", "faigt", "fanny", "fannybandit", "fannyflaps", "fannyfucker", "fanyy", "fart", "fartknocker", "fat", "fatass", "fcuk", "fcuker", "fcuking", "fecker", "felcher", "feltcher", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fist fuck", "fisted", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "fisty", "flog the log", "floozy", "foad", "fondle", "foobar", "fook", "fooker", "foreskin", "freex", "frigg", "frigga", "fubar", "fuck", "fuck hole", "fuck puppet", "fuck trophy", "fuck yo mama", "fuck-ass", "fuck-bitch", "fuck-tard", "fucka", "fuckass", "fucked", "fucker", "fuckers", "fuckface", "fuckhead", "fuckheads", "fuckings", "fuckingshitmotherfucker", "fuckme", "fuckmeat", "fucknugget", "fucknut", "fuckoff", "fucks", "fucktard", "fucktoy", "fuckup", "fuckwad", "fuckwhit", "fuckwit", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "fvck", "fxck", "gae", "gai", "gang-bang", "gangbang", "gangbang", "gangbanged", "gangbangs", "ganja", "gassy ass", "gay", "gaylord", "gays", "gaysex", "gey", "gfy", "ghay", "ghey", "gigolo", "glans", "god-dam", "god-damned", "godamn", "godamnit", "goddam", "goddammit", "goddamn", "goddamned", "goldenshower", "gonad", "gonads", "gook", "gooks", "gringo", "gspot", "gtfo", "guido", "h0m0", "h0mo", "ham flap", "hard on", "hardcoresex", "he11", "hebe", "heeb", "hemp", "heroin", "herp", "herpes", "herpy", "heshe", "hitler", "hiv", "hoar", "hoare", "hobag", "hoer", "hom0", "homey", "homoey", "honky", "hooch", "hookah", "hoor", "hootch", "hooter", "hooters", "hore", "horniest", "horny", "hotsex", "how to murdep", "hump", "humped", "hussy", "hymen", "inbred", "injun", "j3rk0ff", "jack-off", "jackass", "jackhole", "jackoff", "jap", "japs", "jerk-off", "jerk0ff", "jerked", "jerkoff", "jism", "jiz", "jizm", "jizzed", "junkie", "junky", "kawk", "kikes", "kill", "kinky Jesus", "kkk", "klan", "knob", "knobead", "knobed", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kooch", "kooches", "kootch", "kraut", "kum", "kummer", "kumming", "kums", "kunilingus", "kwif", "kyke", "l3i+ch", "l3itch", "lech", "LEN", "leper", "lesbians", "lesbo", "lesbos", "lez", "lezbian", "lezbians", "lezbo", "lezbos", "lezzie", "lezzies", "lezzy", "loin", "loins", "lube", "lust", "lusting", "lusty", "m-fucking", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "mafugly", "mams", "masochist", "massa", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbating", "masterbation", "masterbations", "masturbating", "masturbation", "maxi", "menses", "menstruate", "menstruation", "meth", "mo-fo", "mof0", "mofo", "molest", "moolie", "moron", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "mother fucker", "motherfuck", "motherfucka", "motherfucked", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "mtherfucker", "mthrfucker", "mthrfucking", "muff puff", "muffdiver", "murder", "mutha", "muthafecker", "muthafuckaz", "muthafucker", "muthafuckker", "muther", "mutherfucker", "mutherfucking", "muthrfucking", "n1gga", "n1gger", "nad", "nads", "naked", "napalm", "nappy", "nazi", "nazism", "need the dick", "nigg3r", "nigg4h", "niggah", "niggas", "niggaz", "niggers", "niggle", "niglet", "nimrod", "ninny", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "nooky", "numbnuts", "nut butter", "nutsack", "opiate", "opium", "oral", "orally", "organ", "orgasim", "orgasims", "orgasmic", "orgasms", "orgies", "ovary", "ovum", "ovums", "p.u.s.s.y.", "p0rn", "paddy", "pantie", "pastie", "pasty", "pawn", "pcp", "pecker", "pedo", "pedophilia", "pedophiliac", "pee", "peepee", "penetrate", "penetration", "penial", "penile", "penisfucker", "perversion", "peyote", "phalli", "phallic", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pillowbiter", "pimp", "pimpis", "pinko", "piss-off", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissoff", "pissoff", "pms", "polack", "pollock", "pornos", "pot", "potty", "pricks", "prig", "pron", "prostitute", "prude", "pubic", "pubis", "punkass", "punky", "puss", "pusse", "pussi", "pussies", "pussy fart", "pussy palace", "pussypounder", "pussys", "puto", "queaf", "queero", "queers", "quicky", "r-tard", "racy", "raped", "raper", "raunch", "rectal", "rectus", "reefer", "reetard", "reich", "retard", "retarded", "revue", "rimjaw", "ritard", "rtard", "rum", "rump", "rumprammer", "ruski", "s_h_i_t", "s-h-1-t", "s-h-i-t", "s-o-b", "s.h.i.t.", "s.o.b.", "s0b", "sadist", "sandbar", "sausage queen", "scag", "scantily", "schizo", "screw", "screwed", "screwing", "scroat", "scrog", "scrot", "scrote", "scrud", "scum", "seaman", "seamen", "seduce", "sexual", "sh!+", "sh!t", "shag", "shagger", "shaggin", "shagging", "shamedame", "shi+", "shit fucker", "shitdick", "shite", "shiteater", "shited", "shitey", "shitface", "shitfuck", "shitfull", "shithead", "shithole", "shithouse", "shiting", "shitings", "shits", "shitt", "shitted", "shitter", "shitters", "shitting", "shittings", "shiz", "sissy", "skag", "skank", "slave", "sleaze", "sleazy", "slope", "slut bucket", "slutdumper", "slutkiss", "sluts", "smutty", "sniper", "snuff", "sodom", "son-of-a-bitch", "souse", "soused", "spac", "sperm", "spick", "spik", "spiks", "steamy", "stfu", "stiffy", "stoned", "strip", "stroke", "stupid", "sucked", "sucking", "sumofabiatch", "t1t", "t1tt1e5", "t1tties", "tampon", "tard", "tawdry", "teabagging", "teat", "teets", "teez", "terd", "teste", "testee", "testes", "testical", "testicle", "testis", "thrust", "thug", "tinkle", "tit wank", "titfuck", "titi", "titt", "tittie5", "tittiefucker", "tittyfuck", "tittyfucker", "tittywank", "titwank", "toke", "toots", "tramp", "transsexual", "trashy", "tush", "tw4t", "twathead", "twats", "twatty", "twunt", "twunter", "ugly", "undies", "unwed", "urinal", "urine", "uterus", "uzi", "v14gra", "v1gra", "vag", "valium", "viagra", "virgin", "vixen", "vodka", "vomit", "vulgar", "w00se", "wad", "wang", "wanker", "wanky", "wazoo", "wedgie", "weed", "weenie", "weewee", "weiner", "weirdo", "wench", "wh0re", "wh0reface", "whitey", "whiz", "whoar", "whoralicious", "whorealicious", "whored", "whoreface", "whorehopper", "whorehouse", "whores", "whoring", "wigger", "willies", "willy", "womb", "woody", "wop", "x-rated", "xrated", "yeasty", "yobbo", "zoophile", "asshole*", "beastial*", "bestial*", "bitch*", "buttmunch", "cockmunch*", "cocksuck*", "cuntlick*", "donkeypunch*", "ejaculat*", "felch*", "fleshflute", "*fuck*", "gangbang*", "hardcoresex", "jack-off", "jerk-off", "niggers", "pricks", "pussys", "shitter*", "shitting*", "skank*", "twunt*", "wank*", "*whore*", "cocksuck", "cocksucked", "cocksucks", "cyberfucked", "cyberfucking", "ejaculates", "ejaculating", "fingerfuck", "fingerfucked", "fingerfucking", "fingerfucks", "fistfucked", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "fuckme", "gangbanged", "gangbangs", "jiz", "jizm", "mothafucked", "mothafucking", "pissin", "shitters", "shitty"
];

// ============================================================================
// MAIN HANDLER
// ============================================================================

function doGet(e) {
  // 1. COOL USERNAME GENERATOR (?cool=true)
  if (e.parameter.cool === "true") {
    return handleCoolRequest();
  }

  // 2. RANDOM WORD CHECK (?word=true)
  if (e.parameter.word === "true") {
    return handleRandomWordRequest();
  } 

  // 3. SPECIFIC USERNAME CHECK (?username=xyz)
  return handleSpecificCheck(e.parameter.username);
}

// ============================================================================
// COOL GENERATOR LOGIC
// ============================================================================

function handleCoolRequest() {
  // Try 4 times to find an available and non-profane name
  for (var i = 0; i < 4; i++) {
    var result = generateCoolUsername();

    if (result.available && !isProfaneDeepScan(result.username)) {
       return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({
      "username": null,
      "available": false,
      "error": "Generation timed out."
  }))
  .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// COOL GENERATOR LOGIC (FULL UPDATED FUNCTION)
// ============================================================================

function generateCoolUsername() {
  var isComboMode = Math.random() < 0.30; 
  var slangListDefined = typeof SLANG_LIST !== 'undefined' && SLANG_LIST.length > 0;

  if (isComboMode) {
    // --- COMBO MODE (Logic remains mostly the same, with added safety checks) ---
    var comboType = Math.random(); 
    var part1 = "";
    var part2 = "";

    if (comboType < 0.33) {
      var allowLong = Math.random() < 0.20;
      part1 = getRandomWord(allowLong ? "medium" : "short");
      part2 = getRandomWord(allowLong ? "medium" : "short");
    } else if (comboType < 0.66) {
      var rawSlang = slangListDefined ? SLANG_LIST[Math.floor(Math.random() * SLANG_LIST.length)] : getRandomWord("short");
      part1 = rawSlang.replace(/_/g, ""); 
      part2 = getRandomWord("short");
    } else {
      part1 = getRandomWord("short");
      var rawSlang = slangListDefined ? SLANG_LIST[Math.floor(Math.random() * SLANG_LIST.length)] : getRandomWord("short");
      part2 = rawSlang.replace(/_/g, "");
    }

    // Capitalization and combination
    part1 = part1.charAt(0).toUpperCase() + part1.slice(1);
    part2 = part2.charAt(0).toUpperCase() + part2.slice(1);

    var combined = part1 + part2;
    if (combined.length > 20) combined = combined.substring(0, 20);

    if (checkUsernameAvailability(combined)) {
      return { "username": combined, "available": true, "method": "ComboMode" };
    } else {
      return { "available": false };
    }

  } else {
    // --- SINGLE WORD MODE (Updated with Subtle Reduction) ---
    var baseWord = "";
    var isSlang = Math.random() < 0.85;

    // 1. Get a Base Word
    if (isSlang && slangListDefined) {
      var rawSlang = SLANG_LIST[Math.floor(Math.random() * SLANG_LIST.length)];
      baseWord = rawSlang.replace(/_/g, ""); // Flatten for processing
    } else {
      baseWord = getRandomWord("random");
    }

    // Check the base word immediately as a quick win
    if (checkUsernameAvailability(baseWord)) {
         return { "username": baseWord, "available": true, "method": "CleanRandom" };
    }


    // 2. Decide: Leetspeak OR Subtle Reduction?
    var methodChoice = Math.random();

    // OPTION A: Subtle Reduction (New Feature) - 50% chance
    if (methodChoice < 0.50) {
       var subtleResult = applySmartSubtleReduction(baseWord);
       if (subtleResult) {
         if (checkUsernameAvailability(subtleResult)) {
           return { "username": subtleResult, "available": true, "method": "SubtleReduction" };
         }
       }
    } 

    // OPTION B: Leetspeak (50% chance, or if Subtle failed)
    var leetResult = solveLeetspeak(baseWord);
    if (leetResult) {
      return { "username": leetResult, "available": true, "method": "Leetspeak" };
    }

    // 3. Final Fallback (If all generation and variations failed)
    return { "available": false };
  }
}

function solveLeetspeak(word) {
  var wordArr = word.toLowerCase().split('');
  var indices = [];

  for (var i = 0; i < wordArr.length; i++) {
    if (LEET_MAP[wordArr[i]]) indices.push(i);
  }

  if (indices.length === 0) return null;

  var maxLevel = Math.min(indices.length, 5);

  for (var level = 1; level <= maxLevel; level++) {
    for (var attempt = 0; attempt < 5; attempt++) {
      var tempWordArr = [...wordArr];
      var targets = shuffleArray(indices).slice(0, level);

      targets.forEach(idx => {
        var char = tempWordArr[idx];
        var replacements = LEET_MAP[char];
        var replacementIdx = Math.floor(Math.random() * Math.min(replacements.length, 2)); 
        tempWordArr[idx] = replacements[replacementIdx];
      });

      var candidate = tempWordArr.join('');
      if (candidate.length >= 3 && candidate.length <= 20) {
        if (checkUsernameAvailability(candidate)) {
          return candidate;
        }
      }
    }
  }
  return null;
}

// ============================================================================
// MASTER AVAILABILITY CHECKER
// ============================================================================

function checkRobloxValidation(usernameToTest) {
  var apiUrl = "https://auth.roblox.com/v2/usernames/validate";

  // The API expects a JSON payload for a POST request
  var payload = {
    "username": usernameToTest,
    "birthday": "1999-01-01" // A placeholder birthday is usually required
  };

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true
  };

  try {
    console.log("Querying Roblox Validation API for censorship...");
    var response = UrlFetchApp.fetch(apiUrl, options);
    var responseCode = response.getResponseCode();
    var jsonResponse = JSON.parse(response.getContentText());

    // The API returns 200 (OK) if it was able to process the request.
    // The key status is in the 'code' or 'message' of the JSON response.
    if (jsonResponse.code) {
      // Common codes for failure:
      // Code 1: Invalid username
      // Code 3: Username is already taken (This is a confusing error for a validation API, but it happens)
      // Code 4: Username is not appropriate for Roblox (CENSORED/INAPPROPRIATE)

      var isSuccess = (jsonResponse.message === "Valid username.");

      if (!isSuccess) {
          console.log("FAIL: Roblox Validation API rejected it. Code: " + jsonResponse.code + ", Message: " + jsonResponse.message);
          return false;
      }
    }

    // If the API call succeeds and the message is "Valid username.", it passes.
    console.log("PASS: Roblox Validation API is clean.");
    return true;

  } catch (error) {
    console.error("CRITICAL EXCEPTION in Roblox Validation API fetch: " + error);
    // Fail safe if the API is down or there's an error.
    return false;
  }
}

// ============================================================================
// HELPERS (UPDATED)
// ============================================================================

/**
 * UPDATED: Generates variations by treating EVERY repeated sequence of letters 
 * as both a single letter and a double letter.
 * Supports ALL letters (a-z).
 */
function generateRepeatedVariations(text) {
  if (!text) return [];

  // 1. Group identical characters
  // Example: "niiigggaah" -> ["n", "iii", "ggg", "aa", "h"]
  var groups = [];

  for (var i = 0; i < text.length; i++) {
    var char = text[i];
    if (groups.length > 0 && groups[groups.length - 1][0] === char) {
      groups[groups.length - 1] += char;
    } else {
      groups.push(char);
    }
  }

  // 2. Build options for each group
  var optionsList = [];
  for (var g = 0; g < groups.length; g++) {
    var group = groups[g];
    var char = group[0];

    // Logic: 
    // If length is 1, keep as 1.
    // If length > 1, try both single (squashed) and double.
    if (group.length === 1) {
      optionsList.push([char]);
    } else {
      optionsList.push([char, char + char]);
    }
  }

  return cartesianProduct(optionsList);
}

/**
 * NEW: Decodes a string using the custom LEET_MAP provided.
 * Handles multi-character leets (like "13" -> "b" or "vv" -> "w").
 */
function deLeetStringWithMap(str) {
  if (!str) return "";
  var processed = str.toLowerCase();

  // 1. Convert LEET_MAP to a flat list of replacements
  // We need [{leet: "13", real: "b"}, {leet: "4", real: "a"}...]
  var replacements = [];
  for (var realChar in LEET_MAP) {
    var symbols = LEET_MAP[realChar];
    for (var i = 0; i < symbols.length; i++) {
      replacements.push({ leet: symbols[i], real: realChar });
    }
  }

  // 2. SORT by length DESCENDING
  // This is CRITICAL. We must replace "13" (b) before "1" (i).
  // We must replace "vv" (w) before "v".
  replacements.sort(function(a, b) {
    return b.leet.length - a.leet.length;
  });

  // 3. Apply replacements
  for (var j = 0; j < replacements.length; j++) {
    var item = replacements[j];

    // We use a global Replace for this symbol
    // Escape special regex characters if your map has them (like '+')
    var esc = item.leet.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    var re = new RegExp(esc, "g");

    processed = processed.replace(re, item.real);
  }

  return processed;
}

// Standard Cartesian Product Helper (No changes needed, but ensuring you have it)
function cartesianProduct(arrays) {
  var result = [""];
  if (arrays.length > 15) return [arrays.map(a => a[0]).join("")];

  for (var i = 0; i < arrays.length; i++) {
    var currentOptions = arrays[i];
    var temp = [];
    if (result.length > 200) return result; 

    for (var r = 0; r < result.length; r++) {
      for (var o = 0; o < currentOptions.length; o++) {
        temp.push(result[r] + currentOptions[o]);
      }
    }
    result = temp;
  }
  return result;
}

// Helper to calculate combinations
function cartesianProduct(arrays) {
  var result = [""];

  // Limit complexity: If we have too many groups, just take the single-char version to save time
  if (arrays.length > 15) return [arrays.map(a => a[0]).join("")];

  for (var i = 0; i < arrays.length; i++) {
    var currentOptions = arrays[i];
    var temp = [];

    // Safety cap: Stop expanding if we have over 100 variations to check
    if (result.length > 100) return result; 

    for (var r = 0; r < result.length; r++) {
      for (var o = 0; o < currentOptions.length; o++) {
        temp.push(result[r] + currentOptions[o]);
      }
    }
    result = temp;
  }
  return result;
}

// ============================================================================
// MASTER AVAILABILITY CHECKER (UPDATED with Composite Safe Word Logic)
// ============================================================================

// ============================================================================
// NEW HELPER: COMPOSITE DICTIONARY DECOMPOSITION
// ============================================================================

// ============================================================================
// NEW HELPER: COMPOSITE DICTIONARY DECOMPOSITION (UPDATED)
// ============================================================================

/**
 * Checks if a string (or its leet-decoded version) can be fully decomposed
 * into safe dictionary words. Uses a GREEDY approach (longest word first)
 * to avoid false positives from short substrings (e.g., 'bra' in 'brass').
 * @param {string} username - The lowercase username string.
 * @returns {{isSafe: boolean, hasBadWord: boolean, badWord: string}}
 */
function isComposedOfSafeWords(username) {
    // 1. Define the roots we must check (Raw and De-Leeted)
    var roots = [username];
    // NOTE: deLeetStringWithMap must be available globally
    var deLeeted = deLeetStringWithMap(username); 

    if (deLeeted !== username) {
        roots.push(deLeeted);
    }

    // Check both roots
    for (var i = 0; i < roots.length; i++) {
        var root = roots[i];

        // Only run decomposition if the root is purely alphabetic (no numbers/symbols left after de-leet)
        if (!/^[a-zA-Z]+$/.test(root)) {
            continue; 
        }

        var badWordFound = "";

        // Recursive function to test if the string can be decomposed entirely into words
        function decompose(remainingString) {
            if (remainingString.length === 0) {
                return true; // Success: The entire string was decomposed
            }

            // **** CRITICAL FIX: Loop from LONGEST possible word down to 3 ****
            for (var len = remainingString.length; len >= 3; len--) {
                var currentWord = remainingString.substring(0, len);

                // NOTE: isDictionaryWord must be available globally
                if (isDictionaryWord(currentWord)) {
                    // Word found: Check if it's banned
                    // NOTE: BASE_BAD_WORDS must be available globally
                    if (typeof BASE_BAD_WORDS !== 'undefined' && BASE_BAD_WORDS.indexOf(currentWord) !== -1) {
                        // Found a bad component: Fail immediately and record the word
                        badWordFound = currentWord;
                        return true; // Return true to propagate the failure
                    }

                    // If safe, check the rest of the string recursively
                    var restOfString = remainingString.substring(len);
                    if (decompose(restOfString)) {
                        return true; // Success! A full decomposition path (either safe or bad) was found.
                    }
                }
            }
            return false; // No path found from this point
        }

        // Run the recursive decomposition
        var isFullyDecomposed = decompose(root);

        if (isFullyDecomposed) {
            // A full dictionary path was found
            return {
                isSafe: true, // A full dictionary path was found
                hasBadWord: (badWordFound.length > 0), // Was one of the components banned?
                badWord: badWordFound
            };
        }
    }

    // No valid dictionary-composed path was found for either root
    return {
        isSafe: false, // Must run deep scan
        hasBadWord: false, 
        badWord: ""
    };
}

function checkUsernameAvailability(usernameToTest) {
  console.log("--- Checking Availability for: " + usernameToTest + " ---");

  // 2. Basic Regex & Roblox Rules (kept as safeguards)
  if (!/^[a-zA-Z0-9_]+$/.test(usernameToTest)) {
    console.log("FAIL: Regex validation failed (Invalid characters).");
    return false;
  }

  var underscores = (usernameToTest.match(/_/g) || []).length;
  if (underscores > 1) {
    console.log("FAIL: Too many underscores.");
    return false;
  }

  if (usernameToTest.length < 3 || usernameToTest.length > 20) {
    console.log("FAIL: Length must be 3-20 characters.");
    return false;
  }

  // 5. COMPOSITE DICTIONARY WHITELIST CHECK (UPDATED LOGIC)
  var shouldRunDeepScan = true;
  var lowerUser = usernameToTest.toLowerCase();

  // New check: See if the username, OR its decoded version, is entirely composed of safe words.
  var safetyCheckResult = isComposedOfSafeWords(lowerUser);

  if (safetyCheckResult.isSafe) {
      if (safetyCheckResult.hasBadWord) {
          // Case: "bluewaffle" -> Decomposed as "blue" + "waffle". 
          // If "waffle" is on the BASE_BAD_WORDS list, it fails immediately.
          console.log("FAIL: Composed of real words, but component '" + safetyCheckResult.badWord + "' is on the ban list.");
          return false;
      } else {
          // Case: "bluebanana" -> Decomposed as "blue" + "banana". Both are safe.
          console.log("SKIP: Username is composed entirely of safe dictionary words. Skipping deep scan.");
          shouldRunDeepScan = false;
      }
  }

  // 6. DEEP PERMUTATION PROFANITY CHECK
  if (shouldRunDeepScan) {
    if (isProfaneDeepScan(usernameToTest)) {
      console.log("FAIL: Profanity detected in deep scan.");
      return false; 
    }
  }

  // 7. Check Roblox API (Is it taken?)
  var apiUrl = "https://users.roblox.com/v1/usernames/users";
  var payload = { "usernames": [usernameToTest], "excludeBannedUsers": false };
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true,
    'headers': { 'Cookie': ROBLOX_SECURITY_TOKEN }
  };

  try {
    console.log("Querying Roblox API (check if taken)...");
    var response = UrlFetchApp.fetch(apiUrl, options);
    var responseCode = response.getResponseCode();

    if (responseCode !== 200) {
      console.error("ROBLOX API ERROR: " + responseCode);
      return false; 
    }

    var jsonResponse = JSON.parse(response.getContentText());
    var isRobloxAvailable = (jsonResponse.data && jsonResponse.data.length === 0);

    if (!isRobloxAvailable) {
      console.log("FAIL: Username taken on Roblox.");
      return false;
    }

    // 8. FINAL CHECK: Purgomalum
    console.log("Roblox says available. Checking Purgomalum...");
    var isClean = !checkIsProfane(usernameToTest);

    if (!isClean) console.log("FAIL: Purgomalum flagged it.");
    else console.log("SUCCESS: Username is available!");

    return isClean;

  } catch (error) {
    console.error("CRITICAL EXCEPTION in Roblox API fetch: " + error);
    return false;
  }
}

// ============================================================================
// DEEP SCAN LOGIC (CUSTOM LEET MAP + ALL LETTER VARIATIONS)
// ============================================================================

function isProfaneDeepScan(text) {
  if (!text) return false;

  var lowerText = text.toLowerCase();

  // 1. Always check the collapsed version (f_u_c_k -> fuck)
  var rootsToCheck = [ lowerText.replace(/[\s_\-\.]/g, "") ];

  // 2. THE FAST FIX: Single-Pass Vowel Injection
  // If we see separators, create 5 specific versions where we fill the gaps with vowels.
  // This turns "cr_ppy_idiot" into "crappyidiot", "creppyidiot", "crippyidiot"...
  // It only adds 5 extra checks total (VERY FAST), but guarantees we hit the real word.
  if (/[\s_\-\.]/.test(lowerText)) {
    var vowels = ['a', 'e', 'i', 'o', 'u'];
    // We treat all separators as the SAME vowel in each pass. 
    // This catches "cr_ppy" -> "crappy" immediately.
    for (var v = 0; v < vowels.length; v++) {
      rootsToCheck.push(lowerText.replace(/[\s_\-\.]/g, vowels[v]));
    }
  }

  // 3. De-Leet Logic (applied to the base collapsed version)
  var cleanBase = rootsToCheck[0];
  var deLeeted = deLeetStringWithMap(cleanBase); 
  if (deLeeted !== cleanBase) {
    rootsToCheck.push(deLeeted);
  }

  // 4. Run the checks on our small list of roots
  var allCandidates = [];

  // Flatten logic: Just check the roots. 
  // We only run repeatedVariations (expensive) on the primary collapsed root to save time,
  // because "crappy" doesn't need variation checks, it's a direct dictionary word.
  for (var i = 0; i < rootsToCheck.length; i++) {
    var root = rootsToCheck[i];

    // Only generate variations (repetition squashing) for the collapsed root
    // For the vowel-filled roots, checking them directly is usually enough and much faster.
    if (i === 0) {
       allCandidates = allCandidates.concat(generateRepeatedVariations(root));
    } else {
       allCandidates.push(root);
    }
  }

  // Remove duplicates
  allCandidates = [...new Set(allCandidates)];

  console.log("Deep Scan checking " + allCandidates.length + " candidates (Fast Mode)");

  for (var c = 0; c < allCandidates.length; c++) {
    var variant = allCandidates[c];

    // --- CHECK A: DIRECT BAN ---
    if (typeof BASE_BAD_WORDS !== 'undefined' && BASE_BAD_WORDS.indexOf(variant) !== -1) {
       console.log("FAIL: Found '" + variant + "' in ban list.");
       return true;
    }

    // --- CHECK B: DICTIONARY EATER ---
    // "crappyidiot" -> "idiot" is eaten -> "crappy" remains.
    // "crappy" is in bad word list, so the eater refuses to eat it.
    // Result: "crappy"
    var eaten = stripSafeDictionaryWords(variant);

    if (eaten.length === 0) continue; 

    // --- CHECK C: SUBSTRING ---
    if (typeof BASE_BAD_WORDS !== 'undefined') {
      for (var b = 0; b < BASE_BAD_WORDS.length; b++) {
        if (eaten.indexOf(BASE_BAD_WORDS[b]) !== -1) {
           console.log("FAIL: Detected '" + BASE_BAD_WORDS[b] + "' inside '" + variant + "'");
           return true; 
        }
      }
    }

    // --- CHECK D: SKELETON (Failsafe) ---
    var variantSkeleton = variant.replace(/[aeiou]/g, "");
    if (variantSkeleton.length >= 2 && typeof BASE_BAD_WORDS !== 'undefined') {
      for (var k = 0; k < BASE_BAD_WORDS.length; k++) {
        var rootBad = BASE_BAD_WORDS[k];
        var badSkeleton = rootBad.replace(/[aeiou]/g, "");
        if (badSkeleton.length >= 2 && variantSkeleton === badSkeleton) {
           console.log("FAIL: Skeleton match (" + variantSkeleton + ")");
           return true;
        }
      }
    }
  }

  return false;
}

/**
 * GREEDY DICTIONARY EATER
 * Iterates through the string and removes valid dictionary words
 * UNLESS that word is explicitly in the bad list.
 */
function stripSafeDictionaryWords(str) {
  var chars = str.split(""); // Convert to array for easy replacement
  var length = chars.length;

  // Iterate through every character index
  for (var i = 0; i < length; i++) {

    // Look for longest words first (Greedy approach)
    // We check words from length 12 down to 3.
    for (var len = 12; len >= 3; len--) {
      if (i + len > length) continue;

      var substring = str.substring(i, i + len);

      // Optimization: Skip if it contains non-letters (already spaces)
      if (substring.indexOf(" ") !== -1) continue;

      // 1. Is it a dictionary word?
      if (isDictionaryWord(substring)) {

        // 2. Is this dictionary word actually a BAD word? (e.g. "hell")
        // If it is bad, we DO NOT strip it. We leave it for the scanner to catch.
        if (BASE_BAD_WORDS.indexOf(substring) !== -1) {
           // It's a valid word, but it's bad. Skip stripping.
           continue; 
        }

        // 3. It is a SAFE dictionary word (e.g. "glass"). STRIP IT.
        for (var k = 0; k < len; k++) {
          chars[i + k] = " "; // Replace with space
        }

        // Move the index forward to skip the word we just ate
        i += len - 1; 
        break; // Stop looking for other lengths at this position
      }
    }
  }
  return chars.join("");
}

// ============================================================================
// HELPERS
// ============================================================================

function getRandomWord(mode) {
  try {
    var response = UrlFetchApp.fetch("https://random-word-api.herokuapp.com/word?number=5");
    var words = JSON.parse(response.getContentText());

    if (mode === "short") {
      var short = words.find(w => w.length <= 5);
      return short || words[0]; 
    } else if (mode === "medium") {
      var med = words.find(w => w.length <= 9);
      return med || words[0];
    }
    return words[0];
  } catch (e) {
    return "bruh"; 
  }
}

function isDictionaryWord(word) {
  // Check Cache first to save API calls
  var cache = CacheService.getScriptCache();
  var cached = cache.get("dict_" + word);

  if (cached !== null) {
    return cached === "true";
  }

  try {
    // Free Dictionary API
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});

    var isValid = false;
    if (response.getResponseCode() === 200) {
      isValid = true;
    }

    // Cache result for 6 hours
    cache.put("dict_" + word, isValid.toString(), 21600); 
    return isValid;

  } catch (e) {
    console.log("Dictionary API Error: " + e);
    return false; 
  }
}

function handleRandomWordRequest() {
  var w = getRandomWord("random");
  var avail = checkUsernameAvailability(w);
  return ContentService.createTextOutput(JSON.stringify({ "username": w, "available": avail }))
        .setMimeType(ContentService.MimeType.JSON);
}

function handleSpecificCheck(username) {
  if (!username) return ContentService.createTextOutput("TAKEN").setMimeType(ContentService.MimeType.TEXT);
  return ContentService.createTextOutput(checkUsernameAvailability(username) ? "AVAILABLE" : "TAKEN")
        .setMimeType(ContentService.MimeType.TEXT);
}

function checkIsProfane(text) {
  try {
    var encodedText = encodeURIComponent(text);
    var url = "https://www.purgomalum.com/service/json?text=" + encodedText;
    var response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
    var json = JSON.parse(response.getContentText());
    if (json.result && json.result.indexOf("*") !== -1) return true; 
    return false;
  } catch (e) {
    return false; 
  }
}

function generateVariations(word) {
  if (!word) return [];
  word = word.replace(/\s/g, ""); 
  if (word.length === 0) return [];

  var groups = [];
  var currentGroup = [word[0]];

  for (var i = 1; i < word.length; i++) {
    if (word[i] === word[i-1]) currentGroup.push(word[i]);
    else { groups.push(currentGroup); currentGroup = [word[i]]; }
  }
  groups.push(currentGroup);

  var optionsList = [];
  for (var j = 0; j < groups.length; j++) {
    var char = groups[j][0];
    var len = groups[j].length;
    var opts = [char]; 
    if (len > 1) opts.push(char + char); 
    optionsList.push(opts);
  }

  // Cap variations to prevent timeout
  if (optionsList.length > 10) return [word]; 

  return cartesian(optionsList);
}

function cartesian(arg) {
    var r = [], max = arg.length-1;
    function helper(arr, i) {
        for (var j=0, l=arg[i].length; j<l; j++) {
            var a = arr.slice(0); 
            a.push(arg[i][j]);
            if (i==max) r.push(a.join(""));
            else helper(a, i+1);
        }
    }
    helper([], 0);
    return r;
}

function shuffleArray(array) {
  var arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}