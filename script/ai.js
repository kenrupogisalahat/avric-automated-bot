module.exports.config = {
  name: `ai`,
  version: "1.1.0",
  permission: 0,
  credits: "Metoushela",
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

<script type="importmap">
    {
         "imports": {
               "@google/generative-ai": "https://esm.run/@google/generative-ai"
         }
    }
</script>
<script type="module">
    import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
    import { GoogleGenerativeAI } from "@google/generative-ai";

    const API_KEY = "AIzaSyBUkLeLsQtfEcCGqWxeG1y7e4TVcq9olSc";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    function filterResponse(text) {
        
        text = text.replace(/Gemini/gi, "Ai");
        const inappropriateWords = ["idota", "badword2"]; 
        for (let word of inappropriateWords) {
            const regex = new RegExp(`\\b${word}\\b`, "gi");
            text = text.replace(regex, "[censuré]");
        }
        return text;
    }

    async function run() {
        const prompt = document.getElementById("user-input").value.trim().toLowerCase();
        
        
        const typingIndicator = document.createElement("div");
        typingIndicator.classList.add("bot-message");
        typingIndicator.innerHTML = `
            <div class="message-container typing-indicator">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        `;
        document.getElementById("chat-box").appendChild(typingIndicator);
        
        let responseText;

        
        if (prompt === "bonjour à vous !") {
            responseText = "Bonjour";
        } else if (prompt === "salut moi c'est Davbot conçu pour t'aider ") {
            responseText = "Salut";
        } else if (prompt.includes("comment vas-tu ?") || prompt.includes("qui es-tu")) {
            responseText = "bah moi c'est Davbot développé par David mpongo pour te servir!";
        } else if (prompt.includes("créateur")) {
            responseText = "mon créateur est David mpongo contactez le pour plus d'informations ";
        } else {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            responseText = filterResponse(text); 
        }
        
        
        document.getElementById("chat-box").removeChild(typingIndicator);
        
        if (!responseText.trim()) {
            responseText = "Désolé, je ne peux pas répondre à ça.";
        }
        
        const botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");
        botMessage.innerHTML = `
            <div class="message-container">
                ${marked.parse(responseText)}
            </div>
        `;
        document.getElementById("chat-box").appendChild(botMessage);
        document.getElementById("user-input").value = "";
    }

    document.getElementById("send-btn").addEventListener("click", async () => {
        const userMessage = document.createElement("div");
        userMessage.classList.add("user-message");
        userMessage.innerHTML = `
            <div class="message-container">
                ${document.getElementById("user-input").value}
            </div>
        `;
        document.getElementById("chat-box").appendChild(userMessage);
        await run();
    });
</script>
