import React from 'react';
import { Formik, Form, Field } from 'formik'
import { format } from 'date-fns';


const TodoForm = (props) => {
    const initialValues = {
        body: '',
        deadLine: format(new Date(), 'yyyy-MM-dd')

    }

    const onSubmit = (values, actions) => {
        props.sendData(values);
        actions.resetForm();
      }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(formikProps) => (
                <Form>
                    <Field name="body" placeholder="Type task text..." />
                    <Field name="deadLine" type="date"/>
                    <button type='submit'>Add task</button>
                </Form>
            )}
        </Formik>
    );
}

export default TodoForm;
