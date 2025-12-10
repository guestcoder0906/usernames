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

const SLANG_LIST = [
  "labubu", "popmart", "hirono", "crybaby", "dimoo", "skullpanda", "zimomo", "kpopdemonhunters", "demon_hunter",
  "tungtungsahur", "sahur", "bukber", "takjil", "lebaran", "thr", "bjir", "wkwk", "anjay", "bocil", "epep", "cilukba",
  "kats_eye", "bk_foot_lettuce", "number_15",
  "sonny_angel", "smiski", "owala", "stanley_cup", "coquette", "bows", "downtown_girl", "star_boy",
  "luh_calm_fit", "tuff", "motion", "standing_on_business", "crash_out", "crashing_out", "hawk_tuah", "spit_on_that_thang",
  "winter_arc", "lock_in", "locked_in", "typeshit", "type_shit", "fein", "not_like_us", "euphoria", "meet_the_grahams",
  "matcha_latte", "oat_milk", "cold_brew", "sriracha", "baja_blast", "grimace_shake", "pink_sauce", "prime_drink",
  "lunchly", "feastables", "mrbeast_bar", "takis", "hot_cheetos", "buldak", "samyang", "carbonara", "tanghulu",
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
  "jett", "reyna", "sage", "omen", "phoenix", "raze", "sova", "cypher", "brimstone", "viper", "killjoy", "skye", "yoru",
  "astra", "kayo", "chamber", "neon", "fade", "harbor", "gekko", "deadlock", "iso", "clove", "radiant", "immortal",
  "ascendant", "diamond", "platinum", "gold", "silver", "bronze", "iron", "tenz", "faker", "shroud", "tarik", "aceu",
  "cottagecore", "goblincore", "fairycore", "weirdcore", "dreamcore", "traumacore", "glitchcore", "webcore", "oldweb",
  "frutiger_aero", "y2k", "cyberpunk", "steampunk", "dieselpunk", "solarpunk", "vaporwave", "synthwave", "retrowave",
  "dark_academia", "light_academia", "balletcore", "barbiecore", "bimbocore", "normcore", "gorpcore", "blokecore",
  "doggo", "pupper", "woofer", "floof", "good_boy", "zoomies", "sploot", "blep", "mlem", "beans", "toe_beans",
  "catto", "kitten", "void_cat", "orange_cat", "one_brain_cell", "loaf", "liquid_cat", "if_i_fits", "i_sits",
  "capybara", "ok_i_pull_up", "coconut_doggy", "frogge", "phrog", "wednesday", "my_dudes", "axolotl", "minecraft_axolotl",
  "uwu", "owo", "uwu_girl", "gamer_girl", "egirl", "eboy", "pick_me_boy", "soft_boy", "golden_retriever", "black_cat"
];

const BASE_BAD_WORDS = [
  "2g1c", "acrotomophilia", "anal", "anilingus", "anus", "apeshit", "arsehole", "ass", "asshole", "assmunch",
  "babeland", "ballgag", "ballsack", "bastard", "bdsm", "beaner", "bestiality", "bitch", "blowjob", "blumpkin",
  "bollocks", "bondage", "boner", "boob", "boobs", "bukkake", "bulldyke", "bullshit", "bunghole", "butt",
  "butthole", "cameltoe", "camgirl", "camslut", "circlejerk", "clit", "clitoris", "clusterfuck", "cock", "cocks",
  "coon", "coons", "crap", "crappy", "creampie", "cum", "cumming", "cunnilingus", "cunt", "darkie", "daterape",
  "deepthroat", "dick", "dildo", "doggiestyle", "doggystyle", "domination", "dominatrix", "donkeypunch", "dp",
  "dryhump", "dvda", "ejaculation", "erotic", "escort", "faggot", "fecal", "felch", "fellatio", "femdom",
  "fingerbang", "fingering", "fisting", "footjob", "frotting", "fuck", "fuckin", "fucking", "fucktards",
  "fudgepacker", "futanari", "gangbang", "gaysex", "genitals", "goatse", "goddamn", "grope", "handjob",
  "hardcore", "hentai", "hooker", "horny", "humping", "incest", "intercourse", "jailbait", "jerkoff", "jigaboo",
  "jiggaboo", "kike", "kinky", "kkk", "klan", "lapdance", "lesbian", "lolita", "masturbate", "masturbating",
  "masturbation", "milf", "molestation", "molest", "motherfucker", "muff", "negro", "neonazi", "nigga",
  "nigger", "nipple", "nipples", "nsfwporn", "nude", "nudity", "nympho", "orgasm", "orgy", "paedophile",
  "panties", "pedophile", "pedobear", "pegging", "penis", "pimp", "piss", "pissing", "playboy", "poop",
  "pooping", "porn", "porno", "pornography", "prostitute", "pthc", "pube", "pubes", "pubic", "pussy",
  "queef", "rape", "raping", "rapist", "rectum", "retard", "rimjob", "rimming", "sadism", "scat", "schlong",
  "scissoring", "semen", "sex", "sexo", "sexy", "shemale", "shit", "shitty", "shota", "slut", "slutty",
  "smegma", "sodomy", "spic", "spunk", "strapon", "strappado", "stripper", "suck", "swastika", "taint",
  "testicle", "threesome", "throating", "tit", "tits", "titties", "titty", "topless", "tranny", "tribbing",
  "turd", "twat", "undressing", "upskirt", "urethra", "vagina", "viagra", "vibrator", "voyeur", "vulva",
  "wank", "wanking", "wetback", "whore", "whorehouse", "xxx"
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
