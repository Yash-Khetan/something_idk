import { Request, Response, NextFunction } from 'express';
import { conversationService } from '../services/conversationService';
import { conversationMessageSchema } from '../types';
import { SupportedLanguage } from '../i18n/translations';

export const getPrompt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const stepIndex = parseInt(req.query.step as string) || 0;
    const language = (req.query.language as SupportedLanguage) || 'English';
    const promptInfo = conversationService.getPromptForStep(stepIndex, language);
    res.json(promptInfo);
  } catch (error) {
    next(error);
  }
};

export const processMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validatedData = conversationMessageSchema.parse(req.body);
    const result = await conversationService.processMessage({
      beneficiaryId: validatedData.beneficiaryId,
      language: validatedData.language as SupportedLanguage,
      message: validatedData.message,
      currentState: validatedData.currentState
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
