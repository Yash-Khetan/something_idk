import { Router } from 'express';
import { getOpportunities, getTrainingCenters, getNsqfCourses } from '../controllers/opportunityController';

const router = Router();

router.get('/', getOpportunities);
router.get('/training-centers', getTrainingCenters);
router.get('/nsqf-courses', getNsqfCourses);

export default router;
