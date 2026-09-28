import { Request, Response, NextFunction } from 'express';
import { whatsAppService } from '../services/whatsappService';
import { whatsappSimulationSchema } from '../types';

export const verifyWebhook = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const mode = req.query['hub.mode'] as string;
    const token = req.query['hub.verify_token'] as string;
    const challenge = req.query['hub.challenge'] as string;

    const result = whatsAppService.verifyWebhook(mode, token, challenge);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(403).send('Forbidden: Invalid Verification Token');
    }
  } catch (error) {
    next(error);
  }
};

export const handleWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await whatsAppService.processIncomingWebhook(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const simulateInteraction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validatedData = whatsappSimulationSchema.parse(req.body);
    const result = await whatsAppService.handleWhatsAppInteraction({
      fromPhone: validatedData.fromPhone,
      messageType: validatedData.messageType,
      text: validatedData.text,
      audioUrl: validatedData.audioUrl,
      language: validatedData.language
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
