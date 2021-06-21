import React from "react";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, NumberField, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Button, Grid, Modal, Segment } from "semantic-ui-react";
import { HealthCheckEntry } from "../types";

export type HealthCheckFormValues = Omit<HealthCheckEntry, 'id' |'type'>;

interface Props {
  onSubmit: (values: HealthCheckFormValues) => void;
  onCancel: () => void;
}

interface modalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HealthCheckFormValues) => void;
  error?: string;
}

/*export type TypeOption = {
  value: EntryType;
  label: string;
};

const typeOptions: TypeOption[] = [
  {value: EntryType.HealthCheck, label: "HealthCheck"}
] */

const EntryForm = ({onSubmit, onCancel}: Props) => {
  const [{ diagnoses }] = useStateValue();
  return(
    <Formik 
      initialValues ={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: 0
      }}
      onSubmit = {onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
      >
    {({isValid, dirty, setFieldValue, setFieldTouched}) => {
      return(
        <Form className ="form ui">
          <Field 
            label ='Description'
            placeholder = 'Description'
            name = 'description'
            component = {TextField}/>
          <Field 
            label ='Date'
            placeholder = 'Date'
            name = 'date'
            component = {TextField}/>
          <Field 
            label ='Specialist'
            placeholder = 'Specialist'
            name = 'specialist'
            component = {TextField}/>
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          <Field
            label="Health Check Rating"
            name="healthcheckrating"
            component={NumberField}
            min={0}
            max={3}
          />
          <Grid>
            <Grid.Column floated="left" width={5}>
              <Button 
                type="button"
                onClick={onCancel}
                color="red"
              >
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Button
                type="submit"
                floated="right"
                color="green"
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

const EntryFormModal = ({ modalOpen, onClose, onSubmit, error }: modalProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry to this patient</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <EntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default EntryFormModal;