import { Router } from 'express';
import { createBeneficiary, getBeneficiaryById, getAllBeneficiaries } from '../controllers/beneficiaryController';

const router = Router();

router.post('/', createBeneficiary);
router.get('/', getAllBeneficiaries);
router.get('/:id', getBeneficiaryById);

export default router;
