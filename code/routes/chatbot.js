import express from "express";
import { getChatResponse } from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/ask", getChatResponse);

export default router;
