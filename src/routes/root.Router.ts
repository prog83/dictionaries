import express from 'express';

import healthRouter from './health.Router';
import unitsRouter from './units.Router';

const router = express.Router();

router.use('/health', healthRouter);
router.use('/units', unitsRouter);

export default router;
