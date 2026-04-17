import { Response, NextFunction } from 'express';
import { JsonStoreService } from '../services/json-store.service';
import { SandboxService } from '../services/sandbox.service';
import { AuthenticatedRequest, SandboxRequest } from '../types';

const store = new JsonStoreService();
const sandboxService = new SandboxService(store);

/** POST /sandbox/execute — Ejecutar petición sandbox mock */
export async function executeSandbox(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const request = req.body as SandboxRequest;
    const userId = req.user!.userId;
    const result = await sandboxService.execute(request, userId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** GET /sandbox/history — Historial de peticiones del usuario */
export function getHistory(
  req: AuthenticatedRequest,
  res: Response
): void {
  const userId = req.user!.userId;
  const history = sandboxService.getHistory(userId);
  res.status(200).json(history);
}
