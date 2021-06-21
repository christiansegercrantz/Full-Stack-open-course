import diagnoses from '../../data/diagnoses';

import { Diagnosis } from '../types';

export const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};