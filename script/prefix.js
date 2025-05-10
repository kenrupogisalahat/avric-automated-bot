module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  permission: 0,
  credits: "David mp ou p",
  prefix: true,
  description: "guide",
  category: "système",
  premium: false,
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads, prefix }) => {
  var { threadID: David, messageID: jinwoo, body: gojo } = event;

  function satoru(data) {
    api.sendMessage(data, David, jinwoo);
  }

  var davidData = await (David) ;
  var jinwooData = Daviddata.data;
  const gojoThread = global.data.threadData.get(parseInt(David)) || {};

  var satoruArr = ["mpre", "mprefix", "prefix", "info", "What is the prefix of the bot?", "PREFIX"];
  satoruArr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (gojo === i.toUpperCase() || gojo === i || str === gojo) {
      return satoru(`
╭────────────────────────────────────────╮
│                                        │
│ Mon préfixe est : ${prefix || "non défini"}          │
│                                        │
│ Saisissez "help" pour connaître mes   │.     🌿
│ commandes disponibles.                 │
│                                        │
╰────────────────────────────────────────╯
      `);
    }
  });
};

module.exports.run = async ({ event, api }) => {
  return api.sendMessage(`
╭────────────────────────────────────────╮
│                                        │
│ Mon préfixe est : (non défini)   🌿    │. 🌿
│                                        │
╰────────────────────────────────────────╯
  `, event.threadID);
};
