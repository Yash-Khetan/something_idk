import { Router } from 'express';
import { getPrompt, processMessage } from '../controllers/conversationController';

const router = Router();

router.get('/prompt', getPrompt);
router.post('/message', processMessage);

export default router;
