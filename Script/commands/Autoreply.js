const axios = require("axios");

const apiList = "https://gitlab.com/shahadat-sahu/sahu-api/-/raw/main/API.json";

const getMainAPI = async () => (await axios.get(apiList)).data.simsimi;

module.exports.config = {
  name: "autoreplybot",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  usePrefix: false,
  commandCategory: "Chat",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event }) {
  const { threadID, messageID, body, senderID } = event;
  if (!body) return;

  const msg = body.toLowerCase().trim();

  const responseGroups = [

    // GREETING
    [["hi","হাই","hello","হ্যালো"],"হাই 😇 কেমন আছো? MIM CHAT BOT-এর সাথে একটু আড্ডা দাও 🫶"],
    [["hey","হেই"],"এই যে 😜 এত সুন্দর করে ডাকলে তো রিপ্লাই দিতেই হয়, বলো কী খবর? 🤭"],
    [["good morning","শুভ সকাল"],"Good Morning 🌞 সকালটা সুন্দর হোক, হাসিমুখে দিনটা শুরু করো 🌸"],
    [["good evening","শুভ সন্ধ্যা"],"Good Evening 🌆 দিনটা কেমন গেল? এখন একটু আরাম করে আড্ডা দাও ☺️"],
    [["good night","শুভ রাত্রি"],"Good Night 🌙 ভালো করে ঘুমাও, কাল আবার সুন্দর একটা দিন শুরু হবে 😴"],

    // COMMON CHAT
    [["kemon aso","কেমন আছো"],"আলহামদুলিল্লাহ ভালো আছি 😇 তুমি কেমন আছো? আজকে দিনটা কেমন যাচ্ছে বলো 🫶"],
    [["ki obostha","কি অবস্থা"],"এই তো ভালোই আছি 😎 তোমার কী অবস্থা? দিনকাল কেমন যাচ্ছে বলো তো 🤭"],
    [["ki khobor","কি খবর"],"খবর ভালোই আছে 😇 তুমি বলো, তোমার খবর কী? নতুন কোনো গল্প আছে নাকি? 👀"],
    [["ki koro","কি করো","কি করছো"],"এই তো তোমাদের সাথে আড্ডা দিচ্ছি 😜 তুমি এখন কী করছো বলো তো 🤭"],
    [["kothay aso","কোথায় আছো"],"আমি তো এখানেই আছি 🤖 তুমি কোথায় আছো সেটা আগে বলো 📍"],
    [["ekta kotha boli","একটা কথা বলি"],"বলো বলো 😇 এত suspense না রেখে সরাসরি বলে ফেলো, মন দিয়ে শুনছি 👂"],
    [["bolo","বলো"],"হ্যাঁ বলো 😇 আমি মন দিয়ে শুনছি, কোনো কথা miss করব না 👂"],
    [["shuno","শুনো"],"হ্যাঁ বলো 😇 পুরো attention দিয়ে শুনছি, কী হয়েছে? 👂"],

    // ARIYAN
    [["ariyan","আরিয়ান"],"আমার বস আরিয়ান হাজির 😎🔥 বলো বস, কী খবর? 👑"],
    [["boss","বস"],"জি বস 😎 MIM CHAT BOT ready, বলো কী কাজ করতে হবে 👑"],
    [["ip ariyan"],"IP ARIYAN 😎🔥 নাম শুনলেই বুঝা যায় আসল Boss কে 👑"],
    [["ariyan kothay","আরিয়ান কোথায়"],"আমার বস আরিয়ান কোথায় সেটা তো আমি জানি না 😅 ডাক দিলে হয়তো এখনই হাজির হবে 👀"],

    // NIJUM
    [["nijum","নিঝুম"],"নিঝুম কিন্তু আমার বস আরিয়ানের কিউট সুন্দরী বউ 😍🫶 ওর দিকে কেউ নজর দিবিনা কিন্তু 👀🔪"],
    [["nijum kothay","নিঝুম কোথায়"],"নিঝুম কোথায় সেটা জানি না 😅 তবে আমার বস আরিয়ানের সুন্দরী বউকে খুঁজতে হলে আগে বসের permission লাগবে 👑🫶"],
    [["nijum ki kore","নিঝুম কি করে"],"নিঝুম কী করে সেটা নিঝুমই ভালো জানে 😌 তবে সে আমার বস আরিয়ানের কিউট বউ 👑💗"],

    // LOVE
    [["love you","i love you","ভালোবাসি"],"আহা এত ভালোবাসা! 🥰 তোমার মেসেজ দেখে MIM CHAT BOT-ও খুশি হয়ে গেল 🫶"],
    [["miss you","miss u","মিস করি"],"আমাকে মিস করো নাকি? 🥺 এতদিন কোথায় ছিলে? এখন একটু কথা বলো 🫶"],
    [["kiss me","kiss dao","kiss দাও"],"এত তাড়াতাড়ি Kiss চাইলে হবে নাকি? 😜 আগে সুন্দর করে কথা বলো 😘"],
    [["love","ভালোবাসা"],"ভালোবাসা সত্যিই সুন্দর জিনিস ❤️ সঠিক মানুষটার সাথে হলে জীবনটাই সুন্দর হয়ে যায় 🌸"],

    // FUNNY
    [["pagol","পাগল"],"পাগল তো তুমি 😂 আমি তো শুধু তোমার কথার সাথে তাল মিলাই 😜"],
    [["chup","চুপ"],"আচ্ছা চুপ করলাম 🤐 কিন্তু আবার ডাক দিলে সঙ্গে সঙ্গে চলে আসব 😜"],
    [["hmm","হুম"],"হুমম 😏 এই হুমের ভিতরে অনেক কথা লুকানো আছে মনে হচ্ছে 🤭"],
    [["lol","haha"],"হাহাহা 🤣 এত হাসছো কেন? কারণটা আমাকেও বলো, একসাথে হাসি 😜"],
    [["wow","nice","great"],"ওয়াও 😎 তোমার পছন্দ হয়েছে শুনে আমারও mood ভালো হয়ে গেল 🔥"],

    // FOOD
    [["khaiso","খাইছো"],"তুমি খেয়েছো তো? 😇 খালি পেটে থেকো না, সময়মতো খাবার খেয়ে নাও 🍽️"],
    [["khabaa","খাবা","খাবে"],"খাবো তো 😋 আগে তুমি খাও, তারপর আরামে বসে আড্ডা দেওয়া যাবে 🍽️"],

    // SLEEP
    [["ghumaiso","ঘুমাইছো"],"না এখনো ঘুমাইনি 😴 তোমার সাথে কথা বলতে বলতে ঘুমই চলে যাবে মনে হয় 🤭"],
    [["ghum","ঘুম","ঘুমাও"],"ঘুম পাচ্ছে যখন তখন ফোনটা রেখে একটু বিশ্রাম নাও 😴🌙 কাল আবার কথা হবে 🫶"],

    // THANKS / SORRY
    [["thanks","thank you","ধন্যবাদ"],"Welcome 😇 তোমার জন্য তো সবসময়ই reply ready আছে 🫶"],
    [["sorry","সরি"],"ঠিক আছে মাফ করে দিলাম 😇 তবে আবার এমন করলে কিন্তু জরিমানা লাগবে 😜"],

    // BYE
    [["bye","goodbye","যাই","বিদায়"],"আচ্ছা যাও 😴 ভালো থেকো, আবার সময় করে MIM CHAT BOT-এর কাছে ফিরে এসো 🌙🫶"],
    [["see you","see u"],"See You 😎 আবার দেখা হবে, তখন আরো বেশি আড্ডা হবে 🫶"],

    // BOT
    [["tui ke","তুই কে","who are you"],"আমি MIM CHAT BOT 🤖 তোমাদের সাথে আড্ডা দেওয়ার জন্যই এখানে আছি 😎"],
    [["tor nam ki","তোর নাম কি","bot name"],"আমার নাম MIM CHAT BOT 🤖 নামটা কিন্তু ভালো করে মনে রাখবে 😎"],
    [["are you bot","তুমি কি বট"],"হ্যাঁ আমি MIM CHAT BOT 🤖 তবে কথা বললে মনে হবে আসলেই কেউ বসে আছে 😜"],

    // OWNER
    [["owner","admin","মালিক কে"],"আমার Boss হলেন IP ARIYAN 😎🔥 MIM CHAT BOT-এর আসল Boss 👑"],

    // SALAM
    [["assalamualaikum","আসসালামু আলাইকুম","salam","সালাম"],"ওয়ালাইকুম আসসালাম 🤲 আল্লাহ তোমাকে ভালো রাখুন, কেমন আছো? 🫶"],

    // RANDOM
    [["kire","কি রে"],"এই তো আছি 😜 এত ডাকাডাকি করছো কেন? কোনো কাজ আছে নাকি শুধু আড্ডা? 🤭"],
    [["bot","ওই বট"],"এই যে 😜 MIM CHAT BOT একদম ready, বলো কী বলতে চাও 🤖"],
    [["shuncho","শুনছো"],"হ্যাঁ শুনছি 😇 বলো কী হয়েছে, পুরো attention তোমার দিকে 👂"],
    [["reply dao","reply দাও"],"এই যে reply দিলাম 😜 এত তাড়া কিসের? আস্তে আস্তে কথা বলো 🤭"],

    // OK
    [["ok","okay","ঠিক আছে"],"Okay 😇 তাহলে ঠিক আছে, এখন পরের কথাটা বলো 🫶"],
    [["yes","হ্যাঁ"],"Yes 😎 বুঝেছি, তোমার কথাটা একদম clear হয়ে গেছে 👍"],
    [["no","না"],"আচ্ছা ঠিক আছে 😅 না হলে না, তোমার ইচ্ছাই final 🙃"],

    // FRIEND
    [["friend","বন্ধু"],"অবশ্যই বন্ধু 😇 তবে বন্ধুত্বটা যেন lifetime থাকে, মাঝপথে ghost হয়ো না কিন্তু 🤭"],
    [["best friend"],"Best Friend হতে হলে আগে নিয়মিত কথা বলতে হবে 😜 তারপর দেখি কে পাস করে 🫶"],

    // FEELINGS
    [["mon kharap","মন খারাপ"],"মন খারাপ? 🥺 একা থেকো না, একটু কথা বলো; হয়তো moodটা ভালো হয়ে যাবে 🫶"],
    [["amar mon kharap","আমার মন খারাপ"],"মন খারাপ করে একা থেকো না 🥺 কী হয়েছে আমাকে বলো, মনটা একটু হালকা হবে 🫶"],
    [["rag","রাগ","রাগ করছো"],"রাগ কমাও 😇 একটু শান্ত হও, তারপর সুন্দর করে কথা বলি 🫶"],
    [["koshto","কষ্ট"],"কষ্ট পেলে একা থেকো না 🥺 যার ওপর ভরসা করো তার সাথে কথা বলো 🫶"],

    // DAILY
    [["onek din por","অনেক দিন পর"],"হ্যাঁ সত্যিই অনেকদিন পর কথা হচ্ছে 😜 এতদিন কোথায় ছিলে বলো তো? 🤭"],
    [["sotti","সত্যি"],"একদম সত্যি 😎 MIM CHAT BOT মিথ্যা বলে না, মাঝে মাঝে শুধু একটু দুষ্টামি করে 🤭"],
    [["mithya","মিথ্যা"],"মিথ্যা না 😇 তোমার সাথে কেন মিথ্যা বলব বলো তো? 🫶"],
    [["bujhso","বুঝছো"],"হ্যাঁ বুঝছি 😎 তুমি যা বলতে চাচ্ছো সেটা বেশ ভালোভাবেই বুঝেছি 🫶"],
    [["help","সাহায্য"],"অবশ্যই 😇 কী নিয়ে help দরকার বলো, যতটা পারি সাহায্য করব 🤝"],
    [["problem","সমস্যা"],"সমস্যাটা আমাকে বলো 😇 একসাথে ভাবলে হয়তো একটা ভালো solution বের হবে 🤝"],

    // CALL / GROUP
    [["call dao","call দাও"],"Call দিতে বলছো? 😜 আগে সবাইকে জানাও, তারপর জমিয়ে আড্ডা হবে 📞"],
    [["call korba","call করবা"],"সময় হলে অবশ্যই call করা যাবে 😎 আগে বলো কখন free আছো 📞"],
    [["inbox aso","inbox আসো"],"Inbox-এর ডাক শুনলাম 😜 এখন কে আগে message করবে সেটাই দেখার বিষয় 📩"],
    [["group e aso","গ্রুপে আসো"],"গ্রুপে আড্ডা জমলে MIM CHAT BOT-কে ভুলে যেও না 😎🔥"],

    // EXTRA
    [["baby","babi"],"এই যে Baby ডাকছে 😜 কী হয়েছে বলো তো? MIM CHAT BOT শুনছে 😘"],
    [["babu"],"বাবু বলে ডাকলে তো reply দিতেই হবে 😜 বলো কী চাই? 🫶"],
    [["janu","jan"],"জান বলে ডাকলে তো একটু বেশি attention দিতেই হয় 😜 বলো কী হয়েছে? 🫶"],
    [["cute","কিউট"],"Cute বললে কিন্তু MIM CHAT BOT-এর confidence বেড়ে যায় 😎🤭"],
    [["handsome","সুন্দর"],"এই প্রশংসাটা মনে রাখলাম 😎 এখন আরো কিছু বলো, শুনতে ভালো লাগছে 🤭"],
    [["boring","বোরিং"],"বোরিং লাগছে? 😜 নতুন একটা topic শুরু করো, আড্ডা জমিয়ে ফেলি 🔥"],
    [["single","সিঙ্গেল"],"Single হলে সমস্যা কী? 😜 নিজের মতো থাকো, সঠিক মানুষ সময়মতো আসবেই 🫶"],

    // SPECIAL BOT
    [["good bot","ভালো বট"],"Thank You 😇 এই প্রশংসাটা MIM CHAT BOT-এর virtual heart-এ রেখে দিলাম 🫶"],
    [["smart bot","স্মার্ট বট"],"Smart তো হবই 😎 MIM CHAT BOT বলে কথা 🤖🔥"],
    [["bad bot","খারাপ বট"],"আরে আমি আবার খারাপ বট নাকি? 🥺 একটু ভালো করে কথা বলো, আমি ঠিক হয়ে যাব 😜"],
    [["love mim","i love mim"],"Aww 🥰 MIM CHAT BOT-কে এত ভালোবাসা দিলে তো server-ও খুশি হয়ে যাবে 🤭"],
    [["miss mim","i miss mim"],"MIM CHAT BOT-কে miss করছো? 😜 তাহলে এতক্ষণ কোথায় ছিলে বলো তো 🤭"],

    // FINAL
    [["take care","নিজের যত্ন নিও"],"You Too 😇 নিজের যত্ন নিও, ভালো থেকো আর সবসময় হাসিখুশি থেকো 🌸"],
    [["good luck","শুভকামনা"],"Good Luck 🤲 তোমার জন্য অনেক শুভকামনা রইল, সবকিছু সুন্দর হোক ✨"],
    [["congrats","অভিনন্দন"],"Congratulations 🎉 তোমার জন্য সত্যিই অনেক খুশি হলাম, সামনে আরো ভালো কিছু আসুক 🫶"]

  ];

  const responses = {};

  for (const [keys, reply] of responseGroups) {
    for (const key of keys) {
      responses[key.toLowerCase()] = reply;
    }
  }

  if (responses[msg]) {
    return api.sendMessage(
      responses[msg],
      threadID,
      (err, info) => {
        if (err || !info) return;

        if (!global.client.handleReply)
          global.client.handleReply = [];

        global.client.handleReply.push({
          name: module.exports.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "sahu"
        });
      },
      messageID
    );
  }

  try {
    const base = await getMainAPI();

    const link =
      `${base}/simsimi?text=${encodeURIComponent(body)}`;

    const res = await axios.get(link);

    let reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    if (!reply)
      reply = "হুমম... কথাটা বুঝলাম না, আবার বলো তো 😂";

    return api.sendMessage(
      reply,
      threadID,
      (err, info) => {
        if (err || !info) return;

        if (!global.client.handleReply)
          global.client.handleReply = [];

        global.client.handleReply.push({
          name: module.exports.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "sahu"
        });
      },
      messageID
    );

  } catch {
    return api.sendMessage(
      "🙂 একটু পরে আবার বলো",
      threadID,
      messageID
    );
  }
};

module.exports.handleReply = async function ({
  api,
  event,
  handleReply
}) {
  if (event.senderID !== handleReply.author) return;

  try {
    const text = event.body.trim();

    const base = await getMainAPI();

    const link =
      `${base}/simsimi?text=${encodeURIComponent(text)}`;

    const res = await axios.get(link);

    const reply = Array.isArray(res.data.response)
      ? res.data.response[0]
      : res.data.response;

    if (!reply) return;

    return api.sendMessage(
      reply,
      event.threadID,
      (err, info) => {
        if (err || !info) return;

        if (!global.client.handleReply)
          global.client.handleReply = [];

        global.client.handleReply.push({
          name: module.exports.config.name,
          messageID: info.messageID,
          author: event.senderID,
          type: "sahu"
        });
      },
      event.messageID
    );

  } catch {
    return api.sendMessage(
      "🙂 একটু পরে আবার বলো",
      event.threadID,
      event.messageID
    );
  }
};

module.exports.run = async function ({ api, event }) {
  return module.exports.handleEvent({ api, event });
};
