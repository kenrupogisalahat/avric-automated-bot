const axios = require('axios');

module.exports.config = {
		name: 'ai',
		version: '1.0.0',
		role: 0,
		hasPrefix: false,
		description: "An AI command powered by OpenAI",
		usages: "",
		credits: 'Developer',
		cooldown: 5,
};

module.exports.run = async function({ api, event, args }) {
		if (!args[0]) {
				api.sendMessage("DAVBOT 🌿 \n -----------------------------\n salut🌝 frère comment ça va⭐ j'espère que ça va 🌟vas y poser ta question 🥹", event.threadID);
				return;
		}

		const question = args.join(" ");

		const apiUrl = `C'est Celui-là 
https://metoushela-openai-api.vercel.app/api/text/{prompt}`;

		try {
				const response = await axios.get(apiUrl);
				api.sendMessage(response.data.reply, event.threadID);
		} catch (error) {
				console.error("Error fetching response from OpenAI API:", error);
				api.sendMessage("An error occurred while processing your request. Please try again later.", event.threadID);
		}
};
