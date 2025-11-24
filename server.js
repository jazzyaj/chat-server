import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages) {
      return res.status(400).json({ error: "messages is required" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // or another chat-capable model
      messages,             // [{ role: "user" | "assistant" | "system", content: "..." }]
    });

    const reply = completion.choices[0]?.message?.content ?? "";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat request failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
