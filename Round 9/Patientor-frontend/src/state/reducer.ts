import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";


export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "PATIENT_DETAILS";
      payload: Patient;
  }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
  }
;

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
  type: "SET_PATIENT_LIST",
  payload: patientListFromApi };
};

export const setPatientDetails = (patient: Patient): Action => {
    return { 
      type: "PATIENT_DETAILS",
      payload: patient } ;
};

export const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisListFromApi} ;
};

export const setNewEntry = (newEntryFromApi: Entry): Action => {
  return(
    { type: "ADD_ENTRY",
     payload: newEntryFromApi }
  );
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "PATIENT_DETAILS":
      return{
        ...state,
        patientDetails: action.payload
      };
    case "SET_DIAGNOSIS_LIST":
      return{
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          )
        }
      };
    case 'ADD_ENTRY':
      return{
        ...state,
        patientDetails: {
          ...state.patientDetails,
          entries: [...state.patientDetails.entries, action.payload]},
        patients: {
          ...state.patients,
          [state.patientDetails.id]: {
            ...state.patientDetails,
            entries: [...state.patientDetails.entries, action.payload]}
        }
      };
    default:
      return state;
  }
};
