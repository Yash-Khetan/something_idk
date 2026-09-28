import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ZodError } from 'zod';
import beneficiaryRoutes from './routes/beneficiaries';
import conversationRoutes from './routes/conversation';
import opportunityRoutes from './routes/opportunities';
import whatsappRoutes from './routes/whatsapp';

const app = express();

// Middleware
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'pm-ajay-backend',
    version: '2.0.0',
    nsqfIntegration: 'active',
    regionalLanguages: ['English', 'Hindi', 'Marathi']
  });
});

app.use('/api/beneficiaries', beneficiaryRoutes);
app.use('/api/conversation', conversationRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/whatsapp', whatsappRoutes);

// Centralized error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof ZodError) {
    res.status(400).json({ error: 'Validation Error', details: err.errors });
    return;
  }
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;

