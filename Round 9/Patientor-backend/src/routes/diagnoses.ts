import express from 'express';

import { getDiagnoses } from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getDiagnoses());
});

export default router;