require('dotenv').config();
const axios = require('axios');

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.OPENAI_API_KEY;

async function getChatResponse(prompt) {
    try {
        const response = await axios.post(
            API_URL,
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 100,
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error calling ChatGPT API:", error.response ? error.response.data : error.message);
    }
}

(async () => {
    const response = await getChatResponse("What is ChatGPT?");
    console.log("ChatGPT Response:", response);
})();