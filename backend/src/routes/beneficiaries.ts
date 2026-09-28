import { Router } from 'express';
import { createBeneficiary, getBeneficiaryById, getAllBeneficiaries } from '../controllers/beneficiaryController';
import { getBeneficiaryRecommendations, regenerateBeneficiaryRecommendations } from '../controllers/recommendationController';

const router = Router();

router.post('/', createBeneficiary);
router.get('/', getAllBeneficiaries);
router.get('/:id', getBeneficiaryById);
router.get('/:id/recommendations', getBeneficiaryRecommendations);
router.post('/:id/recommendations/regenerate', regenerateBeneficiaryRecommendations);

export default router;
