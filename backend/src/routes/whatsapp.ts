import { Router } from 'express';
import { verifyWebhook, handleWebhook, simulateInteraction } from '../controllers/whatsappController';

const router = Router();

router.get('/webhook', verifyWebhook);
router.post('/webhook', handleWebhook);
router.post('/simulate', simulateInteraction);

export default router;
