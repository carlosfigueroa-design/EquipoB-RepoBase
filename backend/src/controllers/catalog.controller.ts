import { Request, Response, NextFunction } from 'express';
import { JsonStoreService } from '../services/json-store.service';
import { CatalogService } from '../services/catalog.service';

const store = new JsonStoreService();
const catalogService = new CatalogService(store);

/** GET /catalog — Lista APIs publicadas (público) */
export async function listApis(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const apis = await catalogService.getPublicApis();
    res.status(200).json(apis);
  } catch (err) {
    next(err);
  }
}

/** GET /catalog/search?q= — Búsqueda en catálogo (público) */
export async function searchApis(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const q = (req.query.q as string) || '';
    const results = await catalogService.search(q);
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
}

/** GET /catalog/:id — Detalle público de una API */
export async function getDetail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const api = await catalogService.getPublicDetail(req.params.id as string);
    if (!api) {
      res.status(404).json({
        error: 'Not Found',
        message: 'API no encontrada',
        statusCode: 404,
      });
      return;
    }
    res.status(200).json(api);
  } catch (err) {
    next(err);
  }
}

/** GET /catalog/:id/spec — Spec OpenAPI completa (protegido JWT) */
export async function getSpec(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const spec = await catalogService.getSpec(req.params.id as string);
    if (!spec) {
      res.status(404).json({
        error: 'Not Found',
        message: 'Spec no encontrada',
        statusCode: 404,
      });
      return;
    }
    res.status(200).json(spec);
  } catch (err) {
    next(err);
  }
}
