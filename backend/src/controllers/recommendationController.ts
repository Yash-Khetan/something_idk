import { Request, Response, NextFunction } from 'express';
import { recommendationService } from '../services/recommendationService';

export const getBeneficiaryRecommendations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await recommendationService.getRecommendationsByBeneficiaryId(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const regenerateBeneficiaryRecommendations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await recommendationService.generateRecommendationsForBeneficiary(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
