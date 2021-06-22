import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setNewEntry, setPatientDetails, useStateValue } from "../state";
import axios from "axios";
import { Button, Container } from "semantic-ui-react";
import { Entry, Gender, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Icon } from "semantic-ui-react";
import EntryComp from "./Entry";
import { HealthCheckFormValues, HealthCheckFormModal, OccupationalHealthcareFormModal, HospitalFormModal, OccupationalHealthcareFormValues, HospitalFormValues } from "./EntryForms";

const SinglePatientInfo = () => {
  const [{ patientDetails }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const getPatient = async (id: string) => {
    try {
      const { data: patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`);
      dispatch(setPatientDetails(patient));
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
    }
  };

  useEffect(() => {
    if(patientDetails.id !== id){
      void getPatient(id);
    }
  }, [getPatient]);

  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case 'male':
        return('mars');
      case 'female':
        return('venus');
      case 'other':
        return('genderless');
      default:
        break;
    }
  };

  const [hcmodalOpen, setHCModalOpen] = React.useState<boolean>(false);
  const [hcerror, setHCError] = React.useState<string | undefined>();
  const openHCModal = (): void => setHCModalOpen(true);
  const closeHCModal = (): void => {
    setHCModalOpen(false);
    setHCError(undefined);
  };

  const [ohmodalOpen, setOHModalOpen] = React.useState<boolean>(false);
  const [oherror, setOHError] = React.useState<string | undefined>();
  const openOHModal = (): void => setOHModalOpen(true);
  const closeOHModal = (): void => {
    setOHModalOpen(false);
    setOHError(undefined);
  };

  const [hosmodalOpen, setHosModalOpen] = React.useState<boolean>(false);
  const [hoserror, setHosError] = React.useState<string | undefined>();
  const openHosModal = (): void => setHosModalOpen(true);
  const closeHosModal = (): void => {
    setHosModalOpen(false);
    setHosError(undefined);
  };

  const submitNewEntry = async (values: HealthCheckFormValues | OccupationalHealthcareFormValues | HospitalFormValues) => {
    try {
      console.log("Values from form:",values);
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log("Entry obj from backend: ", newEntry);
      dispatch(setNewEntry(newEntry));
      switch(newEntry.type){
        case 'HealthCheck':{
          closeHCModal();
          break;
        }
        case 'Hospital':{
          closeHosModal();
          break;
        }
        case 'OccupationalHealthcare':{
          closeOHModal();
          break;
        }
        default:
          break;
      }
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setHCError(e.response?.data?.error || 'Unknown error');
    }
  };

  const entries = patientDetails.entries.map( e => (
    <EntryComp key = {e.id} entry = {e}/>
  ));

  if(!patientDetails){
    return(null);
  }
  return(
    <Container>
      <h2>{patientDetails.name} <Icon name = {genderIcon(patientDetails.gender)}/></h2>
      <p>ssn: {patientDetails.ssn}</p>
      <p>Occupation: {patientDetails.occupation}</p>
      <p>Date of birth:  {patientDetails.dateOfBirth}</p>
      <HealthCheckFormModal
        modalOpen = {hcmodalOpen}
        onSubmit={submitNewEntry}
        onClose={closeHCModal}
        error={hcerror}/>
      <Button onClick={() => openHCModal()}>Health check</Button>
      <OccupationalHealthcareFormModal
        modalOpen = {ohmodalOpen}
        onSubmit={submitNewEntry}
        onClose={closeOHModal}
        error={oherror}/>
      <Button onClick={() => openOHModal()}>Occupational healthcare</Button>
      <HospitalFormModal
        modalOpen = {hosmodalOpen}
        onSubmit={submitNewEntry}
        onClose={closeHosModal}
        error={hoserror}/>
      <Button onClick={() => openHosModal()}>Hospital visit</Button>
      <h4>Entries</h4>
      {entries}
    </Container>
  );
};

export default SinglePatientInfo;