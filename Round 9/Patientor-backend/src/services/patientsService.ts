/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {v1 as uuid} from 'uuid';

import patients from '../../data/patients';


import { Patient, NewPatient, NewEntry, Entry } from '../types';

export const getPatients = (): Patient[] => {
  return patients;
};

export const getPatientsOmitSSN = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({id, name, dateOfBirth, gender, occupation, entries})
  );
};

export const addPatient = (newPatient: NewPatient): Patient => {
  const patientWithId = {
    id: uuid(),
    ...newPatient
  };
  patients.push(patientWithId);
  return patientWithId;
};

export const getPatientById = (id: string): Patient | undefined => {
  return patients.find( p => p.id === id);
};

export const addEntry = (newEntry: NewEntry, id: string): Entry => {
  const entryWithId = {
    id: uuid(),
    ...newEntry
  };
  patients.find( p => p.id === id)?.entries.push(entryWithId);
  return entryWithId;
};