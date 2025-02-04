import express from 'express';
import { getChatResponse, sessionMiddleware } from '../controllers/chatbotController.js';

const router = express.Router();

router.use(sessionMiddleware);
router.post("/ask", getChatResponse);

export default router;