import React from "react";
import { Container, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const BaseDetails = ({entry}: {entry: Entry}): JSX.Element => {
  const [{ diagnoses }] = useStateValue();
  if(Object.keys(diagnoses).length === 0){
    return(<div></div>);
  }
  const diagnosesList = entry.diagnosisCodes?.map( (dc, i) => <li key = {i}>{diagnoses[dc].code} {diagnoses[dc].name}</li>);
  return(
    <Container>
        <EntryDetails entry ={entry}/>
        <b>Treated by: {entry.specialist}</b>
        <ul>{diagnosesList}</ul>
    </Container>)
  ;
};

const HeartIcon: React.FC<{ rating: HealthCheckRating }> = ({rating}): JSX.Element => {
  switch(rating){
    case 0:
      return <Icon color = 'green' name ='heart' />;
    case 1:
      return <Icon color = 'yellow' name ='heart' />;
    case 2: 
    return <Icon color = 'orange' name ='heart' />;
    case 3:
      return <Icon color = 'red' name ='heart' />;
    default:
      <Icon name ='heart' />;
  }
  return(<Icon name ='heart' />);
};

const HealthCheck = ({entry}: {entry: HealthCheckEntry}): JSX.Element => {
  return(
    <div>
      <h3>{entry.date} <Icon name = 'doctor' /></h3>
      <p>{entry.description}</p>
      <HeartIcon rating = {entry.healthCheckRating}/>
    </div>
  );
};

const OccupationalHealthcare = ({entry}: {entry: OccupationalHealthcareEntry}): JSX.Element => {
  const sickLeave: string =  entry.sickLeave
  ? `On sick leave from ${entry.sickLeave?.startDate} untill  ${entry.sickLeave?.endDate}`
  : "";
  return(
    <div>
      <h3>{entry.date} <Icon name = 'warehouse' /> {entry.employerName}</h3>
      <p>{entry.description}</p>
      {sickLeave}
    </div>
  );
};

const Hospital = ({entry}: {entry: HospitalEntry}): JSX.Element => {
  
  return(
    <div>
      <h3>{entry.date} <Icon name = 'hospital' /></h3>
      <p>{entry.description}</p>
      <p>Discharged on {entry.discharge.date} with the criteria: {entry.discharge.criteria}</p>
    </div>
  );
};

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
  switch (entry.type){
    case "HealthCheck":
      return <HealthCheck entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry}/>;
    case "Hospital":
      return <Hospital entry={entry}/>;
    default:
      return assertNever(entry);
  }
};

const EntryComp = ({entry}: {entry: Entry}): JSX.Element => {
  if(entry){
    <div></div>;
  }
  return(
    <BaseDetails entry = {entry}/>
  );
};

export default EntryComp;