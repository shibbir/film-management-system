import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import iziToast from "izitoast/dist/js/iziToast";
import { Divider, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import { TextInput, DropdownInput } from "../core/components/field-inputs.component";
import { createSubject, updateSubject, getSubject, resetSubject } from "./film-person.client.actions";

function SubjectForm({ id } = props) {
    const dispatch = useDispatch();

    useEffect(() => {
        if(id) {
            dispatch(getSubject(id));
        } else {
            dispatch(resetSubject());
        }
    }, [id]);

    const subject = useSelector(state => state.subjectReducer.subject);

    return (
        <Formik
            initialValues={{
                name: subject ? subject.name : "",
                teacher_id: subject ? subject.teacher_id : ""
            }}
            displayName="SubjectForm"
            enableReinitialize={true}
            onSubmit={(values, actions) => {
                if(id) {
                    dispatch(updateSubject(id, values)).then(function() {
                        iziToast["success"]({
                            timeout: 3000,
                            message: "Your changes are saved.",
                            position: "topRight"
                        });
                    }).catch(function(err) {
                        iziToast["error"]({
                            timeout: 3000,
                            title: err.response.status,
                            message: err.response.data,
                            position: "topRight"
                        });
                    });
                } else {
                    dispatch(createSubject(values)).then(function() {
                        iziToast["success"]({
                            timeout: 3000,
                            message: "Your changes are saved.",
                            position: "topRight"
                        });
                        actions.resetForm();
                    }).catch(function(err) {
                        iziToast["error"]({
                            timeout: 3000,
                            title: err.response.status,
                            message: err.response.data,
                            position: "topRight"
                        });
                    });
                }

                actions.setSubmitting(false);
            }}
        >
            {formikProps => (
                <Form onSubmit={formikProps.handleSubmit} className="ui form">
                    <TextInput attributes={{
                        type: "text",
                        name: "name",
                        label: "Name",
                        required: true
                    }}/>

                    {/* <DropdownInput attributes={{
                        value: formikProps.values.teacher_id,
                        name: "teacher_id",
                        placeholder: "Assign Teacher",
                        label: "Teacher",
                        options: teacher_options,
                        required: true,
                        onChange: (event, data) => {formikProps.setFieldValue(data.name, data.value)}
                    }}/> */}

                    <Divider hidden/>
                    <Button type="submit" positive disabled={formikProps.isSubmitting}>Save changes</Button>
                    <Button type="reset" disabled={formikProps.isSubmitting}>Reset</Button>
                </Form>
            )}
        </Formik>
    );
}

export default SubjectForm;
