import { Request, Response, NextFunction } from 'express';
import { JsonStoreService } from '../services/json-store.service';
import { AnalyticsService } from '../services/analytics.service';

const store = new JsonStoreService();
const analyticsService = new AnalyticsService(store);

/** GET /analytics/dashboard — Dashboard completo de analítica */
export async function getDashboard(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dashboard = await analyticsService.getDashboard();
    res.status(200).json(dashboard);
  } catch (err) {
    next(err);
  }
}

/** POST /analytics/events — Registrar evento de analítica */
export async function trackEvent(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { type, page, userId, device, metadata } = req.body;

    if (!type || !page || !device) {
      res.status(400).json({ error: 'Campos requeridos: type, page, device' });
      return;
    }

    const event = await analyticsService.trackEvent({
      type,
      page,
      userId,
      device,
      metadata,
    });

    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
}
