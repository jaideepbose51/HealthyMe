import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// import connectDB from './config/db.js';
import chatbotRoutes from './routes/chatbot.js';

// dotenv.config();

// Connect to the database
// connectDB();

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/chatbot', chatbotRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});