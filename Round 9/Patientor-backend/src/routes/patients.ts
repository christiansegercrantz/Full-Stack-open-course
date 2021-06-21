
import express from 'express';

import { getPatientsOmitSSN, addPatient, getPatientById, addEntry } from '../services/patientsService';
import { NewPatient, Patient } from '../types';
import { parseString, toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getPatientsOmitSSN());
});

router.post('/', (req, res) => {
  const newPatient: NewPatient = toNewPatient(req.body);
  const addedPatient: Patient = addPatient(newPatient);
  res.json(addedPatient);
});

router.get('/:id', (req, res) => {
  const patient = getPatientById(req.params.id);
  if(patient){
    res.json(patient);
  }
  else{
    res.status(404);
  }
});

router.post('/:id/entries', (req, res) => {
  try{
    const newEntry = toNewEntry(req.body);
    const id = parseString(req.params.id);
    const addedEntry = addEntry(newEntry, id);
    res.json(addedEntry);
  }catch(e){
    switch (e.name) {
      case (SyntaxError):
        console.log(e);
        res.status(400);
        break;
      default:
        console.log(e);
        res.status(400);
    }
  }
});

export default router;