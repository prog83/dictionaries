import express from 'express';

import healthRouter from './health.Router';
import docsRouter from './docs.Router';
import unitsRouter from './units.Router';

const router = express.Router();

router.use('/health', healthRouter);
router.use('/docs', docsRouter);
router.use('/units', unitsRouter);

export default router;
