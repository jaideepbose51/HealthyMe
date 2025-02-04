import OpenAI from "openai";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();

// Load environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize session middleware
const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
});

const getChatResponse = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  // Initialize session messages if not present
  if (!req.session.messages) {
    req.session.messages = [
      {
        role: "system",
        content:
          "You are a health assistant bot. Provide detailed and accurate answers to health-related questions.",
      }
    ];
  }

  // Add user query to session messages
  req.session.messages.push({ role: "user", content: query });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: req.session.messages,
    });

    const answer = response.choices[0].message.content;

    // Add bot response to session messages
    req.session.messages.push({ role: "assistant", content: answer });

    res.status(200).json({ answer });
  } catch (error) {
    console.error("Error fetching chat response:", error);
    res.status(500).json({ error: "Failed to fetch response" });
  }
};

export { getChatResponse, sessionMiddleware };