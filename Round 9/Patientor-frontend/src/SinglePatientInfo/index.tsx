import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setNewEntry, setPatientDetails, useStateValue } from "../state";
import axios from "axios";
import { Button, Container } from "semantic-ui-react";
import { Entry, Gender, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Icon } from "semantic-ui-react";
import EntryComp from "./Entry";
import EntryFormModal, { HealthCheckFormValues } from "./EntryForm";

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

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: HealthCheckFormValues) => {
    try {
      console.log(values);
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(setNewEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
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
      <h4>Entries</h4>
      {entries}
      <EntryFormModal
        modalOpen = {modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
        error={error}/>
      <Button onClick={() => openModal()}>Add new entry to this patient</Button>
    </Container>
  );
};

export default SinglePatientInfo;