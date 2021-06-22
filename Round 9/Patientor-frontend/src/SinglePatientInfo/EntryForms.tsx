import React from 'react';
import { Field, Form, Formik } from 'formik';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { Button, Grid, Modal, Segment } from 'semantic-ui-react';
import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';

export type HealthCheckFormValues = Omit<HealthCheckEntry, 'id'>;
export type OccupationalHealthcareFormValues = Omit<OccupationalHealthcareEntry, 'id'>;
export type HospitalFormValues = Omit<HospitalEntry, 'id'>;

interface HealthCheckProps {
  onSubmit: (values: HealthCheckFormValues) => void;
  onCancel: () => void;
}

interface OccupationalHealthcareProps {
  onSubmit: (values: OccupationalHealthcareFormValues) => void;
  onCancel: () => void;
}

interface HospitalProps {
  onSubmit: (values: HospitalFormValues) => void;
  onCancel: () => void;
}

interface HealthCheckModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HealthCheckFormValues) => void;
  error?: string;
}

interface OccupationalHealthcareModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OccupationalHealthcareFormValues) => void;
  error?: string;
}

interface HospitalModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalFormValues) => void;
  error?: string;
}

const isValidDate = (text: string | undefined): boolean => {
  if (text == '' || text == null) {
    return false;
  }
  // m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'
  const m: RegExpMatchArray | null = /(\d{4})-(\d{2})-(\d{2})/.exec(text);
  if (m === null || typeof m !== 'object') {
    return false;
  }
  // Year:
  if(!(m[1].length === 4) || !(Number(m[1])>1900) || !(Number(m[1])<2100)){
    return false;
  }
  // Month:
  if(!(m[2].length === 2) || !(Number(m[2])>=1) || !(Number(m[2])<=12)){
    return false;
  }
  // Day:
  if(!(m[3].length === 2) || !(Number(m[3])>=1) || !(Number(m[3])<=31)){
    return false;
  }
  return true;
};

export const HealthCheckForm = ({onSubmit, onCancel}: HealthCheckProps) => {
  const [{ diagnoses }] = useStateValue();
  return(
    <Formik 
      initialValues ={{
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: 0
      }}
      onSubmit = {onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const dateFormatError = 'The date is wrongly formated, it should be formated as YYYY-MM-DD';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!isValidDate(values.date)){
          errors.date = dateFormatError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.healthCheckRating !== 0 && !values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        } else if(values.healthCheckRating < 0 ||values.healthCheckRating > 3){
          errors.healthCheckRating = 'The value has to be between 0 and 3';
        }
        return errors;
      }}
      >
    {({isValid, dirty, setFieldValue, setFieldTouched}) => {
      return(
        <Form className ='form ui'>
          <Field 
            label ='Description'
            placeholder = 'Description'
            name = 'description'
            component = {TextField}/>
          <Field 
            label ='Date'
            placeholder = 'YYYY-MM-DD'
            name = 'date'
            component = {TextField}/>
          <Field 
            label ='Specialist'
            placeholder = 'Name of the specialist'
            name = 'specialist'
            component = {TextField}/>
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          <Field
            label='Health Check Rating'
            name='healthCheckRating'
            component={NumberField}
            min={0}
            max={3}
          />
          <Grid>
            <Grid.Column floated='left' width={5}>
              <Button 
                type='button'
                onClick={onCancel}
                color='red'
              >
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              <Button
                type='submit'
                floated='right'
                color='green'
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      );
    }}
    </Formik>
  );
};

export const HealthCheckFormModal = ({ modalOpen, onClose, onSubmit, error }: HealthCheckModalProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new health check entry to this patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
      <HealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const OccupationalHealthcareForm = ({onSubmit, onCancel}: OccupationalHealthcareProps) => {
  const [{ diagnoses }] = useStateValue();
  return(
    <Formik 
      initialValues ={{
        type: 'OccupationalHealthcare',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: ''
        }
      }}
      onSubmit = {onSubmit}
      validate={values => {
        
        const requiredError = 'Field is required';
        const dateFormatError = 'The date is wrongly formated or the dates are not possible. The date should be formated as YYYY-MM-DD';
        // eslint-disable-next-line @typescript-eslint/ban-types
        const errors: { [field: string]: string | object} = {};
        errors.sickLeave = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!isValidDate(values.date)){
          errors.date = dateFormatError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.sickLeave?.startDate && !isValidDate(values.sickLeave?.startDate)){
          errors.sickLeave = {startDate: dateFormatError};
        }
        if(values.sickLeave?.endDate && !isValidDate(values.sickLeave?.endDate)){
          errors.sickLeave = {endDate: dateFormatError};
        }
        if(Object.values(errors.sickLeave).every(x => x === null || x === '')) delete errors.sickLeave;
        return errors;
      }}
      >
    {({isValid, dirty, setFieldValue, setFieldTouched}) => {
      return(
        <Form className ='form ui'>
          <Field 
            label ='Description'
            placeholder = 'Description'
            name = 'description'
            component = {TextField}/>
          <Field 
            label ='Date'
            placeholder = 'YYYY-MM-DD'
            name = 'date'
            component = {TextField}/>
          <Field 
            label ='Specialist'
            placeholder = 'Name of the specialist'
            name = 'specialist'
            component = {TextField}/>
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}/>
          <Field 
            label ='Employer Name'
            placeholder = 'Name of the employer of the patient'
            name = 'employerName'
            component = {TextField}/>
          <h4>Sick leave:</h4>
          <Grid>
            <Grid.Column floated='left' width={8}>
              <Field
                label='Start date'
                placeholder = 'YYYY-MM-DD'
                name='sickLeave.startDate'
                component={TextField}
              />
           </Grid.Column>
            <Grid.Column floated='right' width={8}>
              <Field
                label='End date'
                placeholder = 'YYYY-MM-DD'
                name='sickLeave.endDate'
                component={TextField}
              />
           </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column floated='left' width={5}>
              <Button 
                type='button'
                onClick={onCancel}
                color='red'
              >
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              <Button
                type='submit'
                floated='right'
                color='green'
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      );
    }}
    </Formik>
  );
};

export const OccupationalHealthcareFormModal = ({ modalOpen, onClose, onSubmit, error }: OccupationalHealthcareModalProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new occupational healthcare entry to this patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
      <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const HospitalForm = ({onSubmit, onCancel}: HospitalProps) => {
  const [{ diagnoses }] = useStateValue();
  return(
    <Formik 
      initialValues ={{
        type: 'Hospital',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        discharge: {
          date: '',
          criteria: ''
        }
      }}
      onSubmit = {onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const dateFormatError = 'The date is wrongly formated, it should be formated as YYYY-MM-DD';
        // eslint-disable-next-line @typescript-eslint/ban-types
        const errors: { [field: string]: string|object } = {};
        errors.discharge = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!isValidDate(values.date)){
          errors.date = dateFormatError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.discharge.date) {
          errors.discharge = {date: requiredError};
        } else if(!isValidDate(values.discharge.date)){
          errors.discharge = {date: dateFormatError};
        }
        if (!values.discharge.criteria){
          errors.discharge  = {...errors.discharge, criteria: requiredError};
        } 
        if(Object.values(errors.discharge).every(x => x === null || x === '')) delete errors.discharge;
        return errors;
      }}
      >
    {({isValid, dirty, setFieldValue, setFieldTouched}) => {
      return(
        <Form className ='form ui'>
          <Field 
            label ='Description'
            placeholder = 'Description'
            name = 'description'
            component = {TextField}/>
          <Field 
            label ='Date'
            placeholder = 'YYYY-MM-DD'
            name = 'date'
            component = {TextField}/>
          <Field 
            label ='Specialist'
            placeholder = 'Name of the specialist'
            name = 'specialist'
            component = {TextField}/>
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          <h4>Discharge</h4>
          <Grid>
            <Grid.Column floated='left' width={8}>
              <Field 
                label ='Date'
                placeholder = 'Discharge date'
                name = 'discharge.date'
                component = {TextField}/>
            </Grid.Column>
            <Grid.Column floated='right' width={8}>
              <Field 
                label ='Criteria'
                placeholder = 'Discharge criteria'
                name = 'discharge.criteria'
                component = {TextField}/>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column floated='left' width={5}>
              <Button 
                type='button'
                onClick={onCancel}
                color='red'
              >
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              <Button
                type='submit'
                floated='right'
                color='green'
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      );
    }}
    </Formik>
  );
};

export const HospitalFormModal = ({ modalOpen, onClose, onSubmit, error }: HospitalModalProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new hospital entry to this patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color='red'>{`Error: ${error}`}</Segment>}
      <HospitalForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);