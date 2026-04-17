import express from 'express';
import cors from 'cors';
import { CORS_ORIGIN, PORT } from './config/app.config';
import { correlationIdMiddleware } from './middleware/correlation-id.middleware';
import { errorHandlerMiddleware } from './middleware/error-handler.middleware';
import { registerRoutes } from './routes/v1';

const app = express();

// --- Middleware ---
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(correlationIdMiddleware);

// --- Health check ---
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// --- Routes (public + protected) ---
registerRoutes(app);

// --- Error handler (must be last) ---
app.use(errorHandlerMiddleware);

export { app };

// Start server only when executed directly (not imported for tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`SIOP Backend running on http://localhost:${PORT}`);
  });
}
