import { Request, Response, NextFunction } from 'express';
import { beneficiaryService } from '../services/beneficiaryService';
import { createBeneficiarySchema } from '../types';

export const createBeneficiary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validatedData = createBeneficiarySchema.parse(req.body);
    const beneficiary = await beneficiaryService.createBeneficiary(validatedData);
    res.status(201).json(beneficiary);
  } catch (error) {
    next(error);
  }
};

export const getBeneficiaryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const beneficiary = await beneficiaryService.getBeneficiaryById(id);
    if (!beneficiary) {
      res.status(404).json({ error: 'Beneficiary not found' });
      return;
    }
    res.json(beneficiary);
  } catch (error) {
    next(error);
  }
};

export const getAllBeneficiaries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const beneficiariesList = await beneficiaryService.getAllBeneficiaries();
    res.json(beneficiariesList);
  } catch (error) {
    next(error);
  }
};
