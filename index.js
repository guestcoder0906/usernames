const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(express.json());

const ROBLOX_SECURITY_TOKEN = process.env.ROBLOX_SECURITY_TOKEN || "";

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

const BASE_BAD_WORDS = [
"2g1c", "2 girls 1 cup", "acrotomophilia", "alabama hot pocket", "alaskan pipeline", "anal", "anilingus", "anus", "apeshit", "arsehole", "ass", "asshole", "assmunch", "auto erotic", "autoerotic", "babeland", "baby batter", "baby juice", "ball gag", "ball gravy", "ball kicking", "ball licking", "ball sack", "ball sucking", "bangbros", "bareback", "barely legal", "barenaked", "bastard", "bastardo", "bastinado", "bbw", "bdsm", "beaner", "beaners", "beaver cleaver", "goon", "gooning", "gooners", "beaver lips", "bestiality", "big black", "big breasts", "big knockers", "big tits", "bimbos", "birdlock", "bitch", "bitches", "black cock", "blonde action", "breast", "breasts", "blonde on blonde action", "blowjob", "blow job", "blow your load", "blue waffle", "blumpkin", "bollocks", "bondage", "boner", "boob", "boobs", "booty call", "brown showers", "brunette action", "bukkake", "bulldyke", "bullet vibe", "bullshit", "bung hole", "bunghole", "busty", "butt", "buttcheeks", "butthole", "camel toe", "camgirl", "camslut", "camwhore", "carpet muncher", "carpetmuncher", "child predator", "chocolate rosebuds", "circlejerk", "cleveland steamer", "clit", "clitoris", "clover clamps", "clusterfuck", "cock", "cocks", "coprolagnia", "coprophilia", "cornhole", "coon", "coons", "crap", "crappy", "creampie", "cum", "cumming", "cunnilingus", "cunt", "darkie", "date rape", "daterape", "deep throat", "deepthroat", "dendrophilia", "dick", "dildo", "dingleberry", "dingleberries", "dirty pillows", "dirty sanchez", "doggie style", "doggiestyle", "doggy style", "doggystyle", "dog style", "dolcett", "domination", "dominatrix", "dommes", "donkey punch", "double dong", "double penetration", "dp action", "dry hump", "dvda", "eat my ass", "ecchi", "ejaculation", "erotic", "erotism", "escort", "eunuch", "faggot", "fecal", "felch", "fellatio", "feltch", "female squirting", "femdom", "figging", "fingerbang", "fingering", "fisting", "foot fetish", "footjob", "freaky", "frotting", "fuck", "fuck buttons", "fuckin", "fucking", "fucktards", "fudge packer", "fudgepacker", "futanari", "gang bang", "gay sex", "genitals", "giant cock", "girl on", "girl on top", "girls gone wild", "goatcx", "goatse", "god damn", "gokkun", "golden shower", "goodpoop", "goo girl", "goregasm", "grope", "group sex", "g-spot", "guro", "hand job", "handjob", "hard core", "hardcore", "hentai", "homoerotic", "honkey", "hooker", "hot carl", "hot chick", "how to kill", "how to murder", "huge fat", "humping", "incest", "intercourse", "jack off", "jail bait", "jailbait", "jerk off", "jigaboo", "jiggaboo", "jiggerboo", "jizz", "juggs", "kike", "kinbaku", "kinkster", "kinky", "knobbing", "leather restraint", "leather straight jacket", "lemon party", "lolita", "lovemaking", "make me come", "male squirting", "masturbate", "menage a trois", "milf", "missionary position", "motherfucker", "mound of venus", "mr hands", "muff diver", "muffdiving", "nambla", "nawashi", "negro", "neonazi", "nigga", "nigger", "nig nog", "nimphomania", "nipple", "nipples", "nsfw images", "nude", "nudity", "nympho", "nymphomania", "octopussy", "omorashi", "one cup two girls", "one guy one jar", "orgasm", "orgy", "paedophile", "paki", "panties", "panty", "pedobear", "pedophile", "pegging", "penis", "phone sex", "piece of shit", "pissing", "piss pig", "pisspig", "playboy", "pleasure chest", "pole smoker", "ponyplay", "poof", "poon", "poontang", "punany", "poop chute", "poopchute", "pregnant", "porn", "porno", "pornography", "prince albert piercing", "pthc", "pubes", "pussy", "queaf", "queef", "quim", "raghead", "raging boner", "rape", "raping", "rapist", "rectum", "reverse cowgirl", "rimjob", "rimming", "rosy palm", "rosy palm and her 5 sisters", "rusty trombone", "sadism", "santorum", "scat", "schlong", "scissoring", "semen", "sex", "sexo", "sexy", "shaved beaver", "shaved pussy", "shemale", "shibari", "shiksas", "shit", "shitblimp", "shitty", "shota", "shrimping", "skeet", "slanteye", "slut", "s&m", "smut", "snatch", "snowballing", "sodomize", "sodomy", "spic", "splooge", "splooge moose", "spooge", "spread legs", "spunk", "strap on", "strapon", "strappado", "strip club", "style doggy", "suck", "sucks", "suicide girls", "sultry women", "swastika", "swinger", "tainted love", "taste my", "tea bagging", "threesome", "throating", "tied up", "tight white", "tit", "tits", "titties", "titty", "tongue in a", "topless", "tosser", "towelhead", "tranny", "tribadism", "tub girl", "tubgirl", "tushy", "twat", "twink", "twinkie", "two girls one cup", "undressing", "upskirt", "urethra play", "urophilia", "vagina", "venus mound", "vibrator", "violet wand", "vorarephilia", "voyeur", "vulva", "wank", "wetback", "wet dream", "white power", "wrapping men", "wrinkled starfish", "xx", "xxx", "yaoi", "yellow showers", "yiffy", "zoophilia", "arse", "ballsack", "balls", "biatch", "bloody", "bollock", "bollok", "bugger", "bum", "buttplug", "crap", "damn", "dyke", "fag", "feck", "fellate", "felching", "f u c k", "flange", "Goddamn", "God damn", "hell", "homo", "jerk", "knobend", "knob end", "labia", "lmao", "lmfao", "muff", "omg", "piss", "poop", "prick", "pube", "queer", "scrotum", "s hit", "sh1t", "smegma", "turd", "whore", "4r5e", "50 yard cunt punt", "5h1t", "5hit", "a_s_s", "a2m", "a$$", "a55", "a$$hole", "a55hole", "adult", "aeolus", "ahole", "amateur", "anal impaler", "anal leakage", "analprobe", "ar5e", "areola", "areole", "arian", "arrse", "aryan", "ass fuck", "ass hole", "ass-fucker", "assbang", "assbanged", "assbangs", "asses", "assfuck", "assfucker", "assfukka", "assh0le", "asshat", "assho1e", "assholes", "assmaster", "assmucus", "asswhole", "asswipe", "asswipes", "azazel", "azz", "b!tch", "b00bs", "b17ch", "b1tch", "babe", "babes", "ballbag", "bang", "bang (one's) box", "banger", "barf", "bastards", "bawdy", "beardedclam", "beastial", "beastiality", "beatch", "beater", "beaver", "beef curtain", "beer", "beeyotch", "bellend", "beotch", "bestial", "bi+ch", "bigtits", "bimbo", "bitch tit", "bitched", "bitcher", "bitchers", "bitchin", "bitching", "bitchy", "blow", "blow me", "blow mud", "blowjobs", "blue waffle", "blumpkin", "bod", "bodily", "boink", "boiolas", "bone", "boned", "boners", "bong", "boobies", "booby", "booger", "bookie", "booobs", "boooobs", "booooobs", "booooooobs", "bootee", "bootie", "booty", "booze", "boozer", "boozy", "bosom", "bosomy", "bowel", "bowels", "bra", "brassiere", "breast", "breasts", "buceta", "bull shit", "bullshits", "bullshitted", "bullturds", "bung", "bunny fucker", "bust a load", "butt fuck", "butt fuck", "buttfuck", "buttfucker", "buttmuch", "c-0-c-k", "c-o-c-k", "c-u-n-t", "c.0.c.k", "c.o.c.k.", "c.u.n.t", "c0ck", "c0cksucker", "caca", "cahone", "cameltoe", "cawk", "cervix", "chinc", "chincs", "chink", "choade", "chode", "chodes", "chota bags", "cipa", "cl1t", "climax", "clit licker", "clitorus", "clits", "clitty", "clitty litter", "cnut", "cocain", "cocaine", "cock pocket", "cock snot", "cock sucker", "cock-sucker", "cockblock", "cockface", "cockhead", "cockholster", "cockknocker", "cockmunch", "cockmuncher", "cocksmoker", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "coital", "cok", "cokmuncher", "coksucka", "commie", "condom", "cop some wood", "corksucker", "cornhole", "corp whore", "cox", "crabs", "crack", "cracker", "crackwhore", "crappy", "cum chugger", "cum dumpster", "cum freak", "cum guzzler", "cumdump", "cummer", "cummin", "cums", "cumshot", "cumshots", "cumslut", "cumstain", "cunilingus", "cunillingus", "cunny", "cunt hair", "cunt-struck", "cuntbag", "cuntface", "cunthunter", "cuntlick", "cuntlick", "cuntlicker", "cuntlicker", "cuntlicking", "cunts", "cuntsicle", "cut rope", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d0ng", "d0uch3", "d0uche", "d1ck", "d1ld0", "d1ldo", "dago", "dagos", "dammit", "damned", "damnit", "dawgie-style", "dick hole", "dick shy", "dick-ish", "dickbag", "dickdipper", "dickface", "dickflipper", "dickhead", "dickheads", "dickish", "dickripper", "dicksipper", "dickweed", "dickwhipper", "dickzipper", "diddle", "dike", "dildos", "diligaf", "dillweed", "dimwit", "dingle", "dink", "dinks", "dipship", "dirsa", "dirty Sanchez", "dlck", "dog-fucker", "doggie-style", "doggin", "dogging", "doggy-style", "dong", "donkeyribber", "doofus", "doosh", "dopey", "douch3", "douche", "douchebag", "douchebags", "douchey", "drunk", "duche", "dumass", "dumbass", "dumbasses", "dummy", "dykes", "eat a dick", "eat hair pie", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejakulate", "enlargement", "erect", "erection", "essohbee", "extacy", "extasy", "f u c k e r", "f_u_c_k", "f-u-c-k", "f.u.c.k", "f4nny", "facial", "fack", "fagg", "fagged", "fagging", "faggit", "faggitt", "faggs", "fagot", "fagots", "fags", "faig", "faigt", "fanny", "fannybandit", "fannyflaps", "fannyfucker", "fanyy", "fart", "fartknocker", "fat", "fatass", "fcuk", "fcuker", "fcuking", "fecker", "felcher", "feltcher", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fist fuck", "fisted", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "fisty", "flog the log", "floozy", "foad", "fondle", "foobar", "fook", "fooker", "foreskin", "freex", "frigg", "frigga", "fubar", "fuck", "fuck hole", "fuck puppet", "fuck trophy", "fuck yo mama", "fuck-ass", "fuck-bitch", "fuck-tard", "fucka", "fuckass", "fucked", "fucker", "fuckers", "fuckface", "fuckhead", "fuckheads", "fuckings", "fuckingshitmotherfucker", "fuckme", "fuckmeat", "fucknugget", "fucknut", "fuckoff", "fucks", "fucktard", "fucktoy", "fuckup", "fuckwad", "fuckwhit", "fuckwit", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "fvck", "fxck", "gae", "gai", "gang-bang", "gangbang", "gangbang", "gangbanged", "gangbangs", "ganja", "gassy ass", "gay", "gaylord", "gays", "gaysex", "gey", "gfy", "ghay", "ghey", "gigolo", "glans", "god-dam", "god-damned", "godamn", "godamnit", "goddam", "goddammit", "goddamn", "goddamned", "goldenshower", "gonad", "gonads", "gook", "gooks", "gringo", "gspot", "gtfo", "guido", "h0m0", "h0mo", "ham flap", "hard on", "hardcoresex", "he11", "hebe", "heeb", "hemp", "heroin", "herp", "herpes", "herpy", "heshe", "hitler", "hiv", "hoar", "hoare", "hobag", "hoer", "hom0", "homey", "homoey", "honky", "hooch", "hookah", "hoor", "hootch", "hooter", "hooters", "hore", "horniest", "horny", "hotsex", "how to murdep", "hump", "humped", "hussy", "hymen", "inbred", "injun", "j3rk0ff", "jack-off", "jackass", "jackhole", "jackoff", "jap", "japs", "jerk-off", "jerk0ff", "jerked", "jerkoff", "jism", "jiz", "jizm", "jizzed", "junkie", "junky", "kawk", "kikes", "kill", "kinky Jesus", "kkk", "klan", "knob", "knobead", "knobed", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kooch", "kooches", "kootch", "kraut", "kum", "kummer", "kumming", "kums", "kunilingus", "kwif", "kys", "kyke", "l3i+ch", "l3itch", "lech", "LEN", "leper", "lesbians", "lesbo", "lesbos", "lez", "lezbian", "lezbians", "lezbo", "lezbos", "lezzie", "lezzies", "lezzy", "loin", "loins", "lube", "lust", "lusting", "lusty", "m-fucking", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "mafugly", "mams", "masochist", "massa", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbating", "masterbation", "masterbations", "masturbating", "masturbation", "maxi", "menses", "menstruate", "menstruation", "meth", "mo-fo", "mof0", "mofo", "molest", "moolie", "moron", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "mother fucker", "motherfuck", "motherfucka", "motherfucked", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "mtherfucker", "mthrfucker", "mthrfucking", "muff puff", "muffdiver", "murder", "mutha", "muthafecker", "muthafuckaz", "muthafucker", "muthafuckker", "muther", "mutherfucker", "mutherfucking", "muthrfucking", "n1gga", "n1gger", "nad", "nads", "naked", "napalm", "nappy", "nazi", "nazism", "need the dick", "nigg3r", "nigrifies", "nigri", "nigg4h", "niggah", "niggas", "niggaz", "niggers", "niggle", "niglet", "nimrod", "ninny", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "nooky", "numbnuts", "nut butter", "nutsack", "opiate", "opium", "oral", "orally", "organ", "orgasim", "orgasims", "orgasmic", "orgasms", "orgies", "ovary", "ovum", "ovums", "p.u.s.s.y.", "p0rn", "paddy", "pantie", "pastie", "pasty", "pawn", "pcp", "pecker", "pedo", "pedophilia", "pedophiliac", "pee", "peepee", "penetrate", "penetration", "penial", "penile", "penisfucker", "perversion", "peyote", "phalli", "phallic", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pillowbiter", "pimp", "pimpis", "pinko", "piss-off", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissoff", "pissoff", "pms", "polack", "pollock", "pornos", "pot", "potty", "pricks", "prig", "pron", "prostitute", "prude", "pubic", "pubis", "punkass", "punky", "puss", "pusse", "pussi", "pussies", "pussy fart", "pussy palace", "pussypounder", "pussys", "puto", "queaf", "queero", "queers", "quicky", "r-tard", "racy", "raped", "raper", "raunch", "rectal", "rectus", "reefer", "reetard", "reich", "retard", "retarded", "revue", "rimjaw", "ritard", "rtard", "rum", "rump", "rumprammer", "ruski", "s_h_i_t", "s-h-1-t", "s-h-i-t", "s-o-b", "s.h.i.t.", "s.o.b.", "s0b", "sadist", "sandbar", "sausage queen", "scag", "scantily", "schizo", "screw", "screwed", "screwing", "scroat", "scrog", "scrot", "scrote", "scrud", "scum", "seaman", "seamen", "seduce", "sexual", "sh!+", "sh!t", "shag", "shagger", "shaggin", "shagging", "shamedame", "shi+", "shit fucker", "shitdick", "shite", "shiteater", "shited", "shitey", "shitface", "shitfuck", "shitfull", "shithead", "shithole", "shithouse", "shiting", "shitings", "shits", "shitt", "shitted", "shitter", "shitters", "shitting", "shittings", "shiz", "sissy", "skag", "skank", "slave", "sleaze", "sleazy", "slope", "slut bucket", "slutdumper", "slutkiss", "sluts", "smutty", "sniper", "snuff", "sodom", "son-of-a-bitch", "souse", "soused", "spac", "sperm", "spick", "spik", "spiks", "steamy", "stfu", "stiffy", "stoned", "strip", "stroke", "stupid", "sucked", "sucking", "sumofabiatch", "t1t", "t1tt1e5", "t1tties", "tampon", "tard", "tawdry", "teabagging", "teat", "teets", "teez", "terd", "teste", "testee", "testes", "testical", "testicle", "testis", "thrust", "thug", "tinkle", "tit wank", "titfuck", "titi", "titt", "tittie5", "tittiefucker", "tittyfuck", "tittyfucker", "tittywank", "titwank", "toke", "toots", "tramp", "transsexual", "trashy", "tush", "tw4t", "twathead", "twats", "twatty", "twunt", "twunter", "ugly", "undies", "unwed", "urinal", "urine", "uterus", "uzi", "v14gra", "v1gra", "vag", "valium", "viagra", "virgin", "vixen", "vodka", "vomit", "vulgar", "w00se", "wad", "wang", "wanker", "wanky", "wazoo", "wedgie", "weed", "weenie", "weewee", "weiner", "weirdo", "wench", "wh0re", "wh0reface", "whitey", "whiz", "whoar", "whoralicious", "whorealicious", "whored", "whoreface", "whorehopper", "whorehouse", "whores", "whoring", "wigger", "willies", "willy", "womb", "woody", "wop", "x-rated", "xrated", "yeasty", "yobbo", "zoophile", "asshole*", "beastial*", "bestial*", "bitch*", "buttmunch", "cockmunch*", "cocksuck*", "cuntlick*", "donkeypunch*", "ejaculat*", "felch*", "fleshflute", "*fuck*", "gangbang*", "hardcoresex", "jack-off", "jerk-off", "niggers", "pricks", "pussys", "shitter*", "shitting*", "skank*", "twunt*", "wank*", "*whore*", "cocksuck", "cocksucked", "cocksucks", "cyberfucked", "cyberfucking", "ejaculates", "ejaculating", "fingerfuck", "fingerfucked", "fingerfucking", "fingerfucks", "fistfucked", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "fuckme", "gangbanged", "gangbangs", "jiz", "jizm", "mothafucked", "mothafucking", "pissin", "shitters", "shitty"
];

const dictCache = new Map();

async function checkIsProfane(text) {
  try {
    const encodedText = encodeURIComponent(text);
    const url = `https://www.purgomalum.com/service/json?text=${encodedText}`;
    const response = await axios.get(url);
    if (response.data.result && response.data.result.indexOf("*") !== -1) return true;
    return false;
  } catch (e) {
    return false;
  }
}

async function getRandomWord(mode) {
  try {
    const response = await axios.get("https://random-word-api.herokuapp.com/word?number=5");
    const words = response.data;
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

async function isDictionaryWord(word) {
  if (dictCache.has(word)) {
    return dictCache.get(word);
  }
  try {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await axios.get(url, { validateStatus: () => true });
    const isValid = response.status === 200;
    dictCache.set(word, isValid);
    return isValid;
  } catch (e) {
    console.log("Dictionary API Error: " + e);
    return false;
  }
}

function deLeetStringWithMap(str) {
  if (!str) return "";
  let processed = str.toLowerCase();
  const replacements = [];
  for (const realChar in LEET_MAP) {
    const symbols = LEET_MAP[realChar];
    for (let i = 0; i < symbols.length; i++) {
      replacements.push({ leet: symbols[i], real: realChar });
    }
  }
  replacements.sort((a, b) => b.leet.length - a.leet.length);
  for (let j = 0; j < replacements.length; j++) {
    const item = replacements[j];
    const esc = item.leet.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const re = new RegExp(esc, "g");
    processed = processed.replace(re, item.real);
  }
  return processed;
}

function generateRepeatedVariations(text) {
  if (!text) return [];
  const groups = [];
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (groups.length > 0 && groups[groups.length - 1][0] === char) {
      groups[groups.length - 1] += char;
    } else {
      groups.push(char);
    }
  }
  const optionsList = [];
  for (let g = 0; g < groups.length; g++) {
    const group = groups[g];
    const char = group[0];
    if (group.length === 1) {
      optionsList.push([char]);
    } else {
      optionsList.push([char, char + char]);
    }
  }
  return cartesianProduct(optionsList);
}

function cartesianProduct(arrays) {
  let result = [""];
  if (arrays.length > 15) return [arrays.map(a => a[0]).join("")];
  for (let i = 0; i < arrays.length; i++) {
    const currentOptions = arrays[i];
    const temp = [];
    if (result.length > 200) return result;
    for (let r = 0; r < result.length; r++) {
      for (let o = 0; o < currentOptions.length; o++) {
        temp.push(result[r] + currentOptions[o]);
      }
    }
    result = temp;
  }
  return result;
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function checkRobloxValidation(usernameToTest) {
  const apiUrl = "https://auth.roblox.com/v2/usernames/validate";
  const payload = {
    "username": usernameToTest,
    "birthday": "1999-01-01"
  };

  try {
    console.log("Querying Roblox Validation API for censorship...");
    const response = await axios.post(apiUrl, payload, {
      headers: { 'Content-Type': 'application/json' },
      validateStatus: () => true
    });
    const jsonResponse = response.data;

    if (jsonResponse.code) {
      const isSuccess = (jsonResponse.message === "Valid username.");
      if (!isSuccess) {
        console.log("FAIL: Roblox Validation API rejected it. Code: " + jsonResponse.code + ", Message: " + jsonResponse.message);
        return false;
      }
    }
    console.log("PASS: Roblox Validation API is clean.");
    return true;
  } catch (error) {
    console.error("CRITICAL EXCEPTION in Roblox Validation API fetch: " + error);
    return false;
  }
}

function applySmartSubtleReduction(word) {
  if (!word || word.length < 4) return null;
  
  const reductions = [];
  const lowerWord = word.toLowerCase();
  
  const doubleLetterPattern = /(.)\1+/g;
  const reducedDouble = lowerWord.replace(doubleLetterPattern, '$1');
  if (reducedDouble !== lowerWord && reducedDouble.length >= 3) {
    reductions.push(reducedDouble);
  }
  
  const vowelRemovals = [];
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  for (let i = 1; i < lowerWord.length - 1; i++) {
    if (vowels.includes(lowerWord[i])) {
      const reduced = lowerWord.slice(0, i) + lowerWord.slice(i + 1);
      if (reduced.length >= 3 && reduced.length <= 20) {
        vowelRemovals.push(reduced);
      }
    }
  }
  reductions.push(...vowelRemovals.slice(0, 3));
  
  if (lowerWord.length > 6) {
    const truncated = lowerWord.substring(0, Math.max(4, Math.floor(lowerWord.length * 0.7)));
    if (truncated.length >= 3) {
      reductions.push(truncated);
    }
  }
  
  const suffixes = ['er', 'ly', 'ing', 'ed', 'ness', 'tion', 'sion', 'ment', 'able', 'ible'];
  for (const suffix of suffixes) {
    if (lowerWord.endsWith(suffix) && lowerWord.length > suffix.length + 2) {
      const stemmed = lowerWord.slice(0, -suffix.length);
      if (stemmed.length >= 3) {
        reductions.push(stemmed);
        break;
      }
    }
  }
  
  const uniqueReductions = [...new Set(reductions)];
  
  for (const reduction of uniqueReductions) {
    if (reduction.length >= 3 && reduction.length <= 20) {
      return reduction;
    }
  }
  
  return null;
}

async function stripSafeDictionaryWords(str) {
  const chars = str.split("");
  const length = chars.length;
  for (let i = 0; i < length; i++) {
    for (let len = 12; len >= 3; len--) {
      if (i + len > length) continue;
      const substring = str.substring(i, i + len);
      if (substring.indexOf(" ") !== -1) continue;
      if (await isDictionaryWord(substring)) {
        if (BASE_BAD_WORDS.indexOf(substring) !== -1) {
          continue;
        }
        for (let k = 0; k < len; k++) {
          chars[i + k] = " ";
        }
        i += len - 1;
        break;
      }
    }
  }
  return chars.join("");
}

async function isProfaneDeepScan(text) {
  if (!text) return false;
  const lowerText = text.toLowerCase();
  const rootsToCheck = [lowerText.replace(/[\s_\-\.]/g, "")];
  if (/[\s_\-\.]/.test(lowerText)) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    for (let v = 0; v < vowels.length; v++) {
      rootsToCheck.push(lowerText.replace(/[\s_\-\.]/g, vowels[v]));
    }
  }
  const cleanBase = rootsToCheck[0];
  const deLeeted = deLeetStringWithMap(cleanBase);
  if (deLeeted !== cleanBase) {
    rootsToCheck.push(deLeeted);
  }
  let allCandidates = [];
  for (let i = 0; i < rootsToCheck.length; i++) {
    const root = rootsToCheck[i];
    if (i === 0) {
      allCandidates = allCandidates.concat(generateRepeatedVariations(root));
    } else {
      allCandidates.push(root);
    }
  }
  allCandidates = [...new Set(allCandidates)];
  console.log("Deep Scan checking " + allCandidates.length + " candidates");
  for (let c = 0; c < allCandidates.length; c++) {
    const variant = allCandidates[c];
    if (BASE_BAD_WORDS.indexOf(variant) !== -1) {
      console.log("FAIL: Found '" + variant + "' in ban list.");
      return true;
    }
    const eaten = await stripSafeDictionaryWords(variant);
    if (eaten.trim().length === 0) continue;
    for (let b = 0; b < BASE_BAD_WORDS.length; b++) {
      if (eaten.indexOf(BASE_BAD_WORDS[b]) !== -1) {
        console.log("FAIL: Detected '" + BASE_BAD_WORDS[b] + "' inside '" + variant + "'");
        return true;
      }
    }
    const variantSkeleton = variant.replace(/[aeiou]/g, "");
    if (variantSkeleton.length >= 2) {
      for (let k = 0; k < BASE_BAD_WORDS.length; k++) {
        const rootBad = BASE_BAD_WORDS[k];
        const badSkeleton = rootBad.replace(/[aeiou]/g, "");
        if (badSkeleton.length >= 2 && variantSkeleton === badSkeleton) {
          console.log("FAIL: Skeleton match (" + variantSkeleton + ")");
          return true;
        }
      }
    }
  }
  return false;
}

async function isComposedOfSafeWords(username) {
  const roots = [username];
  const deLeeted = deLeetStringWithMap(username);
  if (deLeeted !== username) {
    roots.push(deLeeted);
  }
  for (let i = 0; i < roots.length; i++) {
    const root = roots[i];
    if (!/^[a-zA-Z]+$/.test(root)) {
      continue;
    }
    let badWordFound = "";
    async function decompose(remainingString) {
      if (remainingString.length === 0) {
        return true;
      }
      for (let len = remainingString.length; len >= 3; len--) {
        const currentWord = remainingString.substring(0, len);
        if (await isDictionaryWord(currentWord)) {
          if (BASE_BAD_WORDS.indexOf(currentWord) !== -1) {
            badWordFound = currentWord;
            return true;
          }
          const restOfString = remainingString.substring(len);
          if (await decompose(restOfString)) {
            return true;
          }
        }
      }
      return false;
    }
    const isFullyDecomposed = await decompose(root);
    if (isFullyDecomposed) {
      return {
        isSafe: true,
        hasBadWord: (badWordFound.length > 0),
        badWord: badWordFound
      };
    }
  }
  return {
    isSafe: false,
    hasBadWord: false,
    badWord: ""
  };
}

async function checkUsernameAvailability(usernameToTest) {
  console.log("--- Checking Availability for: " + usernameToTest + " ---");
  if (!/^[a-zA-Z0-9_]+$/.test(usernameToTest)) {
    console.log("FAIL: Regex validation failed (Invalid characters).");
    return false;
  }
  const underscores = (usernameToTest.match(/_/g) || []).length;
  if (underscores > 1) {
    console.log("FAIL: Too many underscores.");
    return false;
  }
  if (usernameToTest.length < 3 || usernameToTest.length > 20) {
    console.log("FAIL: Length must be 3-20 characters.");
    return false;
  }
  let shouldRunDeepScan = true;
  const lowerUser = usernameToTest.toLowerCase();
  const safetyCheckResult = await isComposedOfSafeWords(lowerUser);
  if (safetyCheckResult.isSafe) {
    if (safetyCheckResult.hasBadWord) {
      console.log("FAIL: Composed of real words, but component '" + safetyCheckResult.badWord + "' is on the ban list.");
      return false;
    } else {
      console.log("SKIP: Username is composed entirely of safe dictionary words. Skipping deep scan.");
      shouldRunDeepScan = false;
    }
  }
  if (shouldRunDeepScan) {
    if (await isProfaneDeepScan(usernameToTest)) {
      console.log("FAIL: Profanity detected in deep scan.");
      return false;
    }
  }
  const apiUrl = "https://users.roblox.com/v1/usernames/users";
  const payload = { "usernames": [usernameToTest], "excludeBannedUsers": false };
  try {
    console.log("Querying Roblox API (check if taken)...");
    const response = await axios.post(apiUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': ROBLOX_SECURITY_TOKEN
      },
      validateStatus: () => true
    });
    if (response.status !== 200) {
      console.error("ROBLOX API ERROR: " + response.status);
      return false;
    }
    const jsonResponse = response.data;
    const isRobloxAvailable = (jsonResponse.data && jsonResponse.data.length === 0);
    if (!isRobloxAvailable) {
      console.log("FAIL: Username taken on Roblox.");
      return false;
    }
    console.log("Roblox says available. Checking Purgomalum...");
    const isClean = !(await checkIsProfane(usernameToTest));
    if (!isClean) console.log("FAIL: Purgomalum flagged it.");
    else console.log("SUCCESS: Username is available!");
    return isClean;
  } catch (error) {
    console.error("CRITICAL EXCEPTION in Roblox API fetch: " + error);
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
  const maxLevel = Math.min(indices.length, 5);
  for (let level = 1; level <= maxLevel; level++) {
    for (let attempt = 0; attempt < 5; attempt++) {
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

async function generateCoolUsername() {
  const isComboMode = Math.random() < 0.30;
  const slangListDefined = SLANG_LIST && SLANG_LIST.length > 0;
  if (isComboMode) {
    const comboType = Math.random();
    let part1 = "";
    let part2 = "";
    if (comboType < 0.33) {
      const allowLong = Math.random() < 0.20;
      part1 = await getRandomWord(allowLong ? "medium" : "short");
      part2 = await getRandomWord(allowLong ? "medium" : "short");
    } else if (comboType < 0.66) {
      const rawSlang = slangListDefined ? SLANG_LIST[Math.floor(Math.random() * SLANG_LIST.length)] : await getRandomWord("short");
      part1 = rawSlang.replace(/_/g, "");
      part2 = await getRandomWord("short");
    } else {
      part1 = await getRandomWord("short");
      const rawSlang = slangListDefined ? SLANG_LIST[Math.floor(Math.random() * SLANG_LIST.length)] : await getRandomWord("short");
      part2 = rawSlang.replace(/_/g, "");
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
      if (subtleResult) {
        if (await checkUsernameAvailability(subtleResult)) {
          return { "username": subtleResult, "available": true, "method": "SubtleReduction" };
        }
      }
    }
    
    const leetResult = await solveLeetspeak(baseWord);
    if (leetResult) {
      return { "username": leetResult, "available": true, "method": "Leetspeak" };
    }
    return { "available": false };
  }
}

async function handleCoolRequest() {
  for (let i = 0; i < 4; i++) {
    const result = await generateCoolUsername();
    if (result.available && !(await isProfaneDeepScan(result.username))) {
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

app.get('/', async (req, res) => {
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
