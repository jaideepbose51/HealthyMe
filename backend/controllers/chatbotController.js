import OpenAI from "openai";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Session middleware
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

const getChatResponse = async (req, res) => {
  const { patientName, age, symptoms, stepCount, heartRate, sleepHours } = req.body;

  if (!patientName || !age || !symptoms) {
    return res.status(400).json({
      error: "Patient name, age, and symptoms are required",
    });
  }

  const prompt = `
You are a professional health assistant AI.

Patient Details:
Name: ${patientName}
Age: ${age}
Symptoms: ${Array.isArray(symptoms) ? symptoms.join(", ") : symptoms}

Health Metrics:
- Step Count: ${stepCount || "Not provided"}
- Heart Rate: ${heartRate || "Not provided"}
- Sleep Hours: ${sleepHours || "Not provided"}

Instructions:
1. Provide possible causes (not diagnosis).
2. Suggest general medicines (OTC only, no prescriptions).
3. Give lifestyle advice.
4. Mention when to see a doctor.
5. Keep response structured and easy to read.
6. Do NOT use bold formatting.
`;

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini", // cheaper + enough for your use case
      input: prompt,
    });

    const answer = response.output[0].content[0].text;

    res.status(200).json({ answer });

  } catch (error) {
    console.error("Error:", error);

    // Better error handling
    if (error.code === "insufficient_quota") {
      return res.status(429).json({
        error: "API quota exceeded. Please check billing.",
      });
    }

    res.status(500).json({
      error: "Failed to fetch response",
    });
  }
};

export { getChatResponse, sessionMiddleware };