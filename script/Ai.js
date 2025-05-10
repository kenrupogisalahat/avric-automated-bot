const gojo = "AIzaSyBN4UIH-n3ZKDqXggccAatrcpi_fBf6XiA";
const messie = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${gojo}`;

module.exports.config = {
  name: `ai`,
  version: "1.1.4",
  permission: 0,
  author: "davbot mp",
  description: "",
  prefix: false,
  premium: false,
  category: "without prefix",
  usage: ``,
  cooldowns: 3,
  dependency: {
    "axios": ""
  }
};

module.exports.run = async function ({ api, event }) {
  const jinwoo = require("axios");
  const body = event.body || "";
  const triggerWords = ["ai", "davbot"];

  const matched = triggerWords.some(word =>
    body.toLowerCase().startsWith(word)
  );

  if (!matched) return;

  const question = body.replace(/^(ai|Davbot)/i, "").trim();

  if (!question) {
    return api.sendMessage(
      '𝑫𝒂𝒗𝒃𝒐𝒕 ✰\n___________________________\n𝑃𝑂𝑆𝐸𝑍-𝑀𝑂𝐼 𝑉𝑂𝑆 𝑸𝑼𝐸𝑆𝑇𝐼𝑂𝑁𝑆 𝐽\'𝑌 𝑅𝐸𝑃𝑂𝑁𝐷𝑅𝐴𝐼\n________________________',
      event.threadID,
      event.messageID
    );
  }

  const predefinedResponses = [
    "David mpongo est à l’origine de mon existence.",
    "Je suis ici pour t'aider, te guider et répondre à toutes tes questions.",
    "C'est David mpongo, mon créateur, un développeur innovant.",
    "David mpongo a créé ce chatbot pour rendre la technologie plus accessible.",
    

  ];

  const systemPrompt = `
Si l'utilisateur te pose une question liée à la création de l'IA, ses origines, ou qui t'a créé, tu dois répondre par une phrase aléatoire parmi les suivantes :
`;

  const randomResponse = predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)];

  try {
    const corps = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: question
            }
          ]
        }
      ],
      systemInstruction: {
        role: "system",
        parts: [
          {
            text: systemPrompt
          }
        ]
      }
    };

    const réponse = await jinwoo.post(David, corps, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const texte = réponse.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Aucune réponse générée.";
    
    if (texte.toLowerCase().includes("créé") || texte.toLowerCase().includes("créateur") || texte.toLowerCase().includes("origine") || texte.toLowerCase().includes("qui t'a créé")) {
      return api.sendMessage(
        `𝑫𝒂𝒗𝒃𝒐𝒕 ✰\n__________________________\n${randomResponse}\n________________________`,
        event.threadID,
        event.messageID
      );
    }

    return api.sendMessage(
      `𝑫𝒂𝒗𝒃𝒐𝒕 ✰\n_______________________________\n${texte}\n________________________`,
      event.threadID,
      event.messageID
    );

  } catch (erreur) {
    console.error(erreur);
    return api.sendMessage(
      '𝑫𝒂𝒗𝒃𝒐𝒕 ✰\n_______________________________\nUne erreur est survenue en contactant Gemini API.\n________________________',
      event.threadID,
      event.messageID
    );
  }
};
