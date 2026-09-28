import { Request, Response, NextFunction } from 'express';
import { opportunityService } from '../services/opportunityService';
import { opportunityFilterSchema } from '../types';

export const getOpportunities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const filters = opportunityFilterSchema.parse({
      state: req.query.state as string,
      district: req.query.district as string,
      sector: req.query.sector as string,
      type: req.query.type as any,
      search: req.query.search as string
    });
    const results = await opportunityService.getOpportunities(filters);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

export const getTrainingCenters = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { state, district, courseQpCode } = req.query;
    const results = await opportunityService.getTrainingCenters({
      state: state as string,
      district: district as string,
      courseQpCode: courseQpCode as string
    });
    res.json(results);
  } catch (error) {
    next(error);
  }
};

export const getNsqfCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const results = await opportunityService.getAllNsqfCourses();
    res.json(results);
  } catch (error) {
    next(error);
  }
};
