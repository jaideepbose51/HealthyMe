import OpenAI from "openai";
import dotenv from "dotenv";

console.log("Jaideeep here");

dotenv.config();

// Load environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getChatResponse = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a health assistant bot. Provide detailed and accurate answers to health-related questions.",
        },
        { role: "user", content: query },
      ],
    });

    const answer = response.choices[0].message.content;
    res.status(200).json({ answer });
  } catch (error) {
    console.error("Error fetching chat response:", error);
    res.status(500).json({ error: "Failed to fetch response" });
  }
};

export { getChatResponse };
