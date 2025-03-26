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
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
});

const getChatResponse = async (req, res) => {
  const { patientName, age, symptoms, stepCount, heartRate, sleepHours } = req.body;

  if (!patientName || !age || !symptoms) {
    return res.status(400).json({ error: "Patient name, age, and symptoms are required" });
  }

  const query = `
    Patient Information:
    - Name: ${patientName}
    - Age: ${age}
    - Symptoms: ${symptoms}

    Health Data:
    - Step Count: ${stepCount || "Not provided"}
    - Heart Rate: ${heartRate || "Not provided"}
    - Sleep Hours: ${sleepHours || "Not provided"}

    Please provide possible prescriptions and health advice based on the given data. Do not give any bold letters anywhere not even in the subtopics, do capitalise them anyway. 
  `;

  // Initialize session messages if not present
  if (!req.session.messages) {
    req.session.messages = [
      {
        role: "system",
        content:
          "You are a health assistant bot. Provide detailed and accurate answers to health-related queries, including prescription recommendations based on symptoms and health metrics.",
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
