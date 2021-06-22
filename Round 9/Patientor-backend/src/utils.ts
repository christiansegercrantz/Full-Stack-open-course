import { NewPatient, Gender, PrePatientFields, NewEntry, HealthCheckRating, EntryType } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

/*
const isType = (type: any): type is EntryType => {
  return Object.values(EntryType).includes(type);
};*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};


export const parseString = (string: unknown): string => {
  if (!string || !isString(string)) {
    throw new Error('Incorrect or missing string format ' + string);
  }
  return string;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing social security number format');
  }
  return ssn;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date format');
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender:' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation format');
  }
  return occupation;
};

/*const parseType = (type: unknown): EntryType => {
  if (!type || !isType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};*/

/*const parseDiagnosisCodes = (diagnosisCodes: unknown[]): string[] => {
  if(!diagnosisCodes || !diagnosisCodes.every( dc => isString(dc))){
    throw new Error('Incorrect or missing type: ' + diagnosisCodes);
  }
  return diagnosisCodes;
};*/

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if((healthCheckRating !== 0 && !healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Innect format or input of health check rating:' + healthCheckRating);
  }
  return healthCheckRating;
};

export const toNewPatient = ({name, ssn, dateOfBirth, gender, occupation}: PrePatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name),
    ssn: parseSSN(ssn),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries : []
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (obj: any): NewEntry => {
  switch (obj.type) {
    case EntryType.Hospital: {
      const newEntry: NewEntry = {
        type: EntryType.Hospital,
        description: parseString(obj.description),
        date: parseDate(obj.date),
        specialist: parseString(obj.specialist),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        diagnosisCodes: obj.diagnosisCodes,
        discharge: { 
          date : parseDate(obj.discharge.date),
          criteria: parseString(obj.discharge.criteria)
        }};
      return newEntry;}
    case EntryType.HealthCheck:{
      const newEntry: NewEntry = {
        type: EntryType.HealthCheck,
        description: parseString(obj.description),
        date: parseDate(obj.date),
        specialist: parseString(obj.specialist),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        diagnosisCodes: obj.diagnosisCodes,
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
      };
      return newEntry;}
    case EntryType.OccupationalHealthcare:{
      const newEntry: NewEntry = {
        type: EntryType.OccupationalHealthcare,
        description: parseString(obj.description),
        date: parseDate(obj.date),
        specialist: parseString(obj.specialist),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        diagnosisCodes: obj.diagnosisCodes,
        employerName: parseString(obj.employerName),
        sickLeave: {
          startDate: parseDate(obj.sickLeave.startDate),
          endDate:  parseDate(obj.sickLeave.endDate),
        }
      };
      return newEntry;}
    default:
      throw new Error('Incorrect or missing type format ' + obj.type);
  }
};