import React from "react";
import { Form, Formik } from "formik";
import iziToast from "izitoast/dist/js/iziToast";
import { Divider, Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";

import { TextInput } from "../core/components/field-inputs.component";
import { createUser } from "./film-rating.actions";

function UsernameForm() {
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                username: ""
            }}
            displayName="UsernameForm"
            enableReinitialize={true}
            onSubmit={(values, actions) => {
                dispatch(createUser(values)).then(function() {
                    actions.resetForm();
                }).catch(function(err) {
                    iziToast["error"]({
                        timeout: 3000,
                        title: err.response.status,
                        message: err.response.data,
                        position: "topRight"
                    });
                });

                actions.setSubmitting(false);
            }}
        >
            {formikProps => (
                <Form onSubmit={formikProps.handleSubmit} className="ui form">
                    <TextInput attributes={{
                        type: "text",
                        name: "username",
                        label: "Username",
                        required: true
                    }}/>

                    <Divider hidden/>
                    <Button type="submit" positive disabled={formikProps.isSubmitting}>Enter</Button>
                </Form>
            )}
        </Formik>
    );
}

export default UsernameForm;
