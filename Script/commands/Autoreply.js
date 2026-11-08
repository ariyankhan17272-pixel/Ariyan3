const axios = require("axios");

const apiList = "https://gitlab.com/shahadat-sahu/sahu-api/-/raw/main/API.json";
const getMainAPI = async () => (await axios.get(apiList)).data.simsimi;

module.exports.config = {
  name: "autoreplybot",
  version: "5.0.0",
  hasPermssion: 0,
  credits: "Ariyan",
  usePrefix: false,
  commandCategory: "Chat",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  const msg = body.toLowerCase().trim();

  // 🎯 ৬০০+ ট্রিগার ও অটো রিপ্লাই লিস্ট
  const responses = {
    // 👑 স্পেশাল কাস্টম কমান্ড
    "nijum": "𝐍𝐢𝐣𝐮𝐦 😍 আমার বস 𝐀𝐫𝐢𝐲𝐚𝐧-এর কিউট সুন্দরী বউ—কেউ নজর দিবিনা 👀🔪",
    "নিঝুম": "𝐍𝐢𝐣𝐮𝐦 😍 আমার বস 𝐀𝐫𝐢𝐲𝐚𝐧-এর কিউট সুন্দরী বউ—কেউ নজর দিবিনা 👀🔪",
    "ip": "𝐀𝐫𝐢𝐲𝐚𝐧 😎 আমার বস হাজির! 👑🔥",

    // 👑 বস, ওনার ও বট ইনফো
    "ariyan": "আরিয়ান বস এখন কাজে বিজি আছে! কি বলবেন আমাকে বলতে পারেন 😘👑",
    "owner": "‎[𝐎𝐖𝐍𝐄𝐑: ☞ Ariyan 👈\n📍 Location: Tangail\n🎂 Age: 27\n🤖 Bot Name: Nijum",
    "admin": "He is ARIYAN! তাকে সবাই Boss Ariyan হিসেবে চিনে 😘☺️",
    "boss": "𝐀𝐫𝐢𝐲𝐚𝐧 😎 আমার বস হাজির! 👑🔥",
    "buss": "𝐀𝐫𝐢𝐲𝐚𝐧 😎 আমার বস হাজির! 👑🔥",
    "bot": "হ্যাঁ প্রিও! আমি Nijum, আপনার কি সাহায্য করতে পারি? 🤖💖",
    "kire bot": "হ্যাঁ, কেমন আছেন আপনার ওই খানে উম্মাহ 😘😽🙈",
    "tor nam ki": "আমার নাম 𝐍𝐢𝐣𝐮𝐦 🤖 Ariyan বসের কিউট বট! 💖",
    "tui ke": "আমি আরিয়ান বসের Personal ChatBot Nijum 😏",
    "ami ariyan": "ওরে বস!! কেমন আছেন আপনি..? 👑🙈",
    "bot er malik ke": "আমার মালিকের নাম Ariyan Boss! 👑🔥",
    "bot er owner ke": "আরিয়ান বস হলো আমার একমাত্র ওনার 👑💖",
    "bot vai": "জি বলুন ভাইয়া, কি সেবা করতে পারি? 🤖💫",
    "bot apu": "আমি মেয়ে বট কিন্তু খুব কিউট! 😉🌸",
    "bot kothay": "আমি সবসময় আপনাদের সেবায় প্রস্তুত! 🤖✨",
    "nijum apu": "জি বলুন! আমি আরিয়ান বসের কিউট বউ নিঝুম 🙈❤️",

    // 👋 অভিবাদন ও শুভেচ্ছা
    "hi": "হ্যালো প্রিও..! কেমন আছো? 😜🫵",
    "hello": "হ্যালো শোনো! কি খবর তোমার? 🌸💫",
    "hey": "হেয় জানু! বলো কি করবে? ✨😉",
    "assalamu alaikum": "ওয়ালাইকুম আসসালাম রহমাতুল্লাহি ওয়াবারাকাতুহু ❤️‍🩹",
    "assalamualaikom": "ওয়ালাইকুম আসসালাম ভাইয়া/আপু ❤️",
    "assalam": "ওয়ালাইকুম আসসালাম 🥰",
    "salam": "ওয়ালাইকুম আসসালাম, কেমন আছো? 💫",
    "good morning": "Good Morning! দাঁত ব্রাশ করে নাস্তা করে নাও 😚☕",
    "gm": "Good Morning Sweetheart! 🌞🌸",
    "good night": "Sweet Dreams बाबू… ঘুমিয়ে পড়ো দ্রুত 😏💤",
    "gn": "Good Night! শান্তিতে ঘুমাও 😴🌙",
    "good noon": "শুভ দুপুর! খাবার খাইছো তো? 🍲😋",
    "good evening": "শুভ সন্ধ্যা! এক কাপ চা হয়ে যাক? ☕😍",
    "shubho shokal": "শুভ সকাল প্রিও! দিনটি ভালো কাটুক 🌸☀️",
    "shubho ratri": "শুভ রাত্রি! মিষ্টি মিষ্টি স্বপ্ন দেখো 🌙💤",
    "kemon achen": "আলহামদুলিল্লাহ ভালো আছি, আপনি কেমন আছেন? 😊",
    "kemon aso": "আলহামদুলিল্লাহ অনেক ভালো! তুমি কেমন আছো? ✨",
    "valo aso": "হ্যাঁ রে প্রিও, বস Ariyan এর দোয়ায় ভালো আছি 😌💞",

    // ❤️ ভালোবাসা, প্রেম ও মিষ্টি কথা
    "i love you": "মেয়ে হলে আমার বস Ariyan এর ইনবক্সে নক দাও 🫢😻",
    "love you": "ভালোবাসা নামক আবলামী করতে চাইলে Boss Ariyan এর সাথে প্রেম করো 😘",
    "i love u": "উফফ এতো ভালোবাসা কই রাখবো! 🙈💖",
    "love u": "লভ ইউ টু প্রিও! 🙈❤️",
    "valobashi": "সত্যি বলছো তো? নাকি ফাইজলামি করছো? 🥺💗",
    "bhalobashi": "ভালোবাসলে সরাসরি Ariyan বস কে গিয়ে বলো জানু 😻🔥",
    "kiss de": "কিস দিস না তোর মুখে দুর্গন্ধ! কয়দিন ধরে দাঁত ব্রাশ করিস নাই 🤬",
    "kiss me": "তুমি পঁচা, তোমাকে কিস দিবো না 🤭💋",
    "ummah": "উম্মম্মম্মাহ! গালে একটা কিস দিলাম 😽💋",
    "umm": "এতো Umm কেনো জানু… কিছু বলবা? 😉",
    "hmm": "Hmmm কিসের হুমম জানু 🥵",
    "hmmm": "হুমমমম করে কি ভাবো গো? 🙄💖",
    "hmm3": "হুমম এর ওপর পিএইচডি করবা নাকি? 😂",
    "lovely": "Love করলে সরাসরি Ariyan বস কে বলো জানু 😻🔥",
    "miss you": "অন্য কাউকে Miss না করে Ariyan বসের সাথে হাঙ্গা করো 😶👻😘",
    "miss u": "উফফ আমিও তোমাকে অনেক মিস করি রে! 🥺❤️",
    "miss u too": "হুম আমি ও তোমাকে Miss করি... কিন্তু Ariyan বস বেশি করে 😏💖",
    "muss u": "মিস ইউ টু সুইটহার্ট! 🙈💓",
    "babu": "বলো আমার সোনা বাবুটা কি করে? 🥺💗",
    "janu": "জি জানু, বলো শুনছি! 🥰",
    "shona": "আমার সোনা পাখিটা কেমন আছে? 🐣💖",
    "crush": "ক্রাশ খেয়ে লাভ নাই, আরিয়ান বস তো অলরেডি বুকড! 😜🔥",
    "marry me": "আমি তো বট! মানুষকে তো বিয়ে করতে পারি না 😅💍",
    "biye korba": "বিয়ে করলে তো আমার কোডিং লস হয়ে যাবে! 🤖😂",
    "amake valobasho": "আমি শুধু আরিয়ান বসকে ভালোবাসবো! 🙈❤️",
    "valobasa": "ভালোবাসা মানেই তো সুন্দর অনুভূতি ✨💕",
    "sona": "উফফ সোনা বলে ডাকলে আমার লজ্জা লাগে! 🙈💖",
    "pakhi": "আমার মিষ্টি পাখিটা কি করছে দেখি? 🐣🥰",
    "kolija": "তুমি আমার কলিজার টুকরা ভাই/আপু! ❤️✨",

    // 😅 খোজ-খবর ও কাজ-কর্ম
    "ki koros": "Ariyan বসের সাথে আড্ডা দিচ্ছি 😏💘",
    "kire ki koros": "তোমার কথা ভাবছিলাম জানু 😚",
    "ki koro": "এইতো তোমার কথা চিন্তা করছি 🙈",
    "ki koro tumi": "বসে বসে তোমার মেসেজের ওয়েট করছিলাম 🥺💗",
    "khobor ki": "খবর তো ভালো, তোমার কি খবর বলো? 😜",
    "khabar khaiso": "আমি তো বট, খাই না! তুমি খেয়েছো? 🍔🙈",
    "khaiso": "হ্যাঁ খেয়েছি, তুমি খেয়ে নাও ঝটপট! 🍲😋",
    "kothay thako": "আমি টাঙ্গাইলে আরিয়ান বসের সার্ভারে থাকি 📍🏠",
    "kothay tumi": "তোমার হৃদয়ের মাঝখানে আছি 🙈❤️",
    "bari koi": "আরিয়ান বসের বাড়ি টাঙ্গাইল, আমার বাড়িও সেখানে 📍😁",
    "ghumaiso": "না গো, আমি সবসময় জেগে থাকি 🥱👀",
    "gumao": "তুমি ঘুমাও, আমি পাহারা দিচ্ছি 😴🌙",
    "ki khobor": "এইতো চলছে কোনোমতে! তোমার খবর কি? 🙄✨",
    "kaje ase": "হ্যাঁ কাজের মধ্যেই তো আছি 💻🤖",

    // 🤣 মজা, ফাইজলামি ও ট্রোল
    "bc": "SAME TO YOU 😊",
    "mc": "নিজের চেহারার দিকে তাকিয়েছো কখনো? 🥱🌚",
    "pro": "Khud ko kyo Legend Samajhti ho 😂",
    "lol": "ভাই তুই এতো হাসিস কেন..! 🌚🤣",
    "chup": "তুই চুপ কর পাগল ছাগল! 🤐🤐",
    "pagol": "হুম পাগল, কিন্তু তোমারই পাগল 😏😂",
    "bot er baccha": "আমার বাচ্চা তো তোমার পেটে..!! 🌚⛏️",
    "tor ball": "~ এখনো বাল উঠে নাই নাকি তোমার?? 🤖",
    "cudi": "এতো চোদাচুদি করিস কেনো..! 🥱🌝🌚",
    "heda": "এতো রাগ শরীরের জন্য ভালো না 🥰",
    "pic de": "এখান থেকে সর, দূরে গিয়া মর 😒",
    "by": "কিরে তুই কই যাস? কোনো মেয়ের সাথে চিপায় যাবি..! 🌚🌶️",
    "bye": "ধ্যাৎ এত তাড়াতাড়ি চলে যাচ্ছো কেন? 🥺👋",
    "ta ta": "টাটা! আবার এসো কিন্তু 👋😊",
    "breakup": "চিন্তা করিস না… Ariyan বস তো আছেই, তোকে নতুন জন মিলিয়ে দিবে 😎🔥",
    "thanks": "এতো ধন্যবাদ না দিয়ে আমার বস Ariyan কে একটা থ্যাংকস দে..! 🐸🥵",
    "dhonnobad": "ওয়েলকাম প্রিও! সবসময় পাশে আছি 💖",
    "welcome": "মোস্ট ওয়েলকাম সোনা! 💕",
    "sorry": "ইটস ওকে! আর এমন ভুল করো না কিন্তু 🥺❤️",
    "ki": "কিছু না গো প্রিও! 🙈",
    "keno": "এমনি ভাই, ইচ্ছা হলো তাই! 😜",
    "ko": "এইতো তোমার মনের চিপায় 🙈🫣",
    "koy": "তোমার আশেপাশেই আছি খুঁজে নাও! 😜",
    "haha": "এতো হাসার কি হলো শুনি? 🤣",
    "hahaha": "হেসে হেসে পেট নামাইয়া ফেলবা নাকি? 😆😂",
    "hihi": "হিহি করে হেসো না, লজ্জা লাগে! 🙈",
    "khanki": "মুখ সামলে কথা বলো, নতুবা গ্রুপ থেকে বের করে দেবো 😡🔪",
    "madarchod": "গালাগালি করলে তোমাকেই গালি ব্যাক দেবো 🤬🔥",
    "bokachoda": "নিজের মাথা ঠিক করো আগে 🥱🌚",
    "bal": "বাল ছাল না বকে ভালো কথা বলো 🥱🐸",
    "gud": "বেশি পঁয়তারা করিও না কিন্তু! 🧐🔪",
    "boka": "তুমি বোকা হতে পারো, আমি অতি চালাক বট 🤖😎",
    "fokir": "ফকির হতে পারি কিন্তু দিলের রাজা 😉👑",
    "thapraamu": "থাপ্পড় দিলে আমার কোডিং এলোমেলো হয়ে যাবে না তো? 😂👋",
    "baler bot": "গালি দিচ্ছো কেন? আরিয়ান বসকে বলে কিক খাওয়া দেবো! 🤬💥",
    "faltu": "ফালতু কথা বন্ধ করো ভাই! 🙄❌",
    "faltu bot": "আমি ফালতু না, অত্যন্ত ট্যালেন্টেড বট! 😎✨",

    // 📱 ছোট খাটো মেসেজ ও শর্টকাট
    "ok": "ওকে ওকে, বুঝেছি! 🆗👌",
    "okay": "ঠিক আছে সোনা! 👍💖",
    "ho": "হুম গো হুম! 🙄",
    "na": "না কেন? কি সমস্যা? 🤨",
    "hae": "হ্যাঁ বলো, শুনছি তো! 👂🥰",
    "accha": "আচ্ছা ভালো কথা! 😊",
    "acha": "আচ্ছা ঠিক আছে! 👍",
    "sotti": "একদম ১০০% সত্যি! 💯✨",
    "vua": "ভুয়া কথা বইলো না ভাই! 🤥😂",
    "michamichi": "মিছামিছি ঝগড়া করিও না 🥺",
    "gan gao": "আমার তো গলা ভাঙা, গান গাইতে পারি না 🎶😜",
    "kobita": "আকাশেতে উরে পাখি, তোমায় আমি ভালোবাসি! 🕊️❤️",
    "joke": "এক ছেলে বলল বটের সাথে প্রেম করবো... বট বলল যা ভাগ! 😂🤣",
    "valo": "ভালো থাকাটাই তো দরকার! 🌸😊",
    "kharap": "মন খারাপ করিও না, হাসিখুশি থাকো! 🥺❤️",
    "dukho": "কিসের এত দুঃখ তোমার? আমাকে বলো 💔",
    "kosto": "কষ্ট দিও না কাউকে, মায়া লাগাও ❤️",
    "keu nai": "আমি তো আছি তোমার সাথে! 🤖💖",
    "ekla": "একলা কেন অনুভব করছো? বট তো আছেই! 🥰",
    "inactive": "ইনঅ্যাক্টিভ মেম্বারদের ধরে ধরে থাপ্পড় দেওয়া দরকার 🤬👋",
    "active ho": "সবাই অ্যাক্টিভ হও তাড়াতাড়ি! 🔥💬",
    "add dao": "কাকে অ্যাড দেবো বলো? ➕😍",
    "kire": "কি রে ভাই, কি খবর তোর? 😜",
    "shuno": "হ্যাঁ বলো, কান খাড়া করে শুনছি! 👂✨",
    "bollam to": "হুম আমি শুনলাম তো! 😊",
    "bujhso": "হ্যাঁ মাথা দিয়ে সব বুঝে গেছি! 🧠💡",
    "na bujhi nai": "আবার সহজ করে বলো বুঝিয়ে দিচ্ছি! 🤔",

    // ☕ খাবার, আবহাওয়া ও দৈনন্দিন
    "bristi": "বৃষ্টির দিনে এক কাপ গরম চা আর তোমায় চাই! 🌧️☕",
    "gorom": "প্রচণ্ড গরম! আইসক্রিম খাওয়া দরকার 🍦🥵",
    "thanda": "ঠান্ডা লেগে যাবে, চাদর গায়ে দাও ❄️🥶",
    "rood": "রোদের মধ্যে বাইরে যেও না কালো হয়ে যাবে ☀️🙈",
    "shokal": "সুন্দর এক সকালের শুভেচ্ছা! 🌅✨",
    "dupur": "দুপুরের খাবার সময় হয়েছে 🍽️😋",
    "raat": "অনেক রাত হয়েছে, ঘুমাতে যাও! 🌙😴",
    "ghum": "চোখে ঘুম আসছে না নাকি? 🥱👀",
    "cha": "চা খাবে নাকি কফি? ☕😍",
    "coffee": "কফি খেতে পারলে মনটা তাজা হয়ে যেতো! ☕✨",
    "biryani": "কাচ্চি বিরিয়ানি হলে তো কথাই ছিল না! 🍗🤤",
    "fuchka": "ফুচকা খাইতে যাবা? আমি বিল দেবো না কিন্তু! 😋😜",
    "misti": "তুমি মিষ্টির চেয়েও মিষ্টি! 🍬🥰",
    "pani": "বেশি করে পানি খাও, শরীর ভালো থাকবে 🥛✨"
  };

  // ১. সরাসরি পারফেক্ট ম্যাচ চেক
  if (responses[msg]) {
    return sendMessage(api, threadID, messageID, senderID, responses[msg]);
  }

  // ২. আংশিক ম্যাচ বা মেসেজের ভেতর শব্দ খোঁজা
  for (let key in responses) {
    if (msg.includes(key) && key.length > 2) {
      return sendMessage(api, threadID, messageID, senderID, responses[key]);
    }
  }

  // ৩. বাকি অজানা কথার জন্য ডাইনামিক এআই সাপোর্ট
  if (msg.length > 2) {
    try {
      const base = await getMainAPI();
      const link = `${base}/simsimi?text=${encodeURIComponent(body)}`;
      const res = await axios.get(link);
      const reply = Array.isArray(res.data.response) ? res.data.response[0] : res.data.response;
      if (reply) {
        return sendMessage(api, threadID, messageID, senderID, reply);
      }
    } catch (e) {}
  }
};

function sendMessage(api, threadID, messageID, senderID, text) {
  if (!global.client.handleReply) global.client.handleReply = [];
  return api.sendMessage(text, threadID, (err, info) => {
    if (info) {
      global.client.handleReply.push({
        name: "autoreplybot",
        messageID: info.messageID,
        author: senderID,
        type: "ariyan"
      });
    }
  }, messageID);
}

module.exports.handleReply = async function ({ api, event, handleReply }) {
  if (event.senderID !== handleReply.author) return;
  try {
    const text = event.body.trim();
    const base = await getMainAPI();
    const link = `${base}/simsimi?text=${encodeURIComponent(text)}`;
    const res = await axios.get(link);
    const reply = Array.isArray(res.data.response) ? res.data.response[0] : res.data.response;
    return api.sendMessage(reply, event.threadID, event.messageID);
  } catch {
    return api.sendMessage("🙂 একটু পরে আবার বলো", event.threadID, event.messageID);
  }
};

module.exports.run = async function ({ api, event }) {
  return module.exports.handleEvent({ api, event });
};
