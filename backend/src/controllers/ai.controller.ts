import { Response, NextFunction } from 'express';
import { JsonStoreService } from '../services/json-store.service';
import { AIAssistantService } from '../services/ai-assistant.service';
import { AuthenticatedRequest } from '../types';

const store = new JsonStoreService();
const aiService = new AIAssistantService(store);

/** POST /ai/assistant — Consulta al asistente IA */
export async function queryAssistant(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { message } = req.body;
    const result = await aiService.query(message);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
