import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import iziToast from "izitoast/dist/js/iziToast";
import { Divider, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import { TextInput } from "../core/components/field-inputs.component";
import { createFilmPerson, updateFilmPerson, getFilmPerson, resetFilmPerson } from "./film-person.client.actions";

function FilmPersonForm({ id } = props) {
    const dispatch = useDispatch();

    useEffect(() => {
        if(id) {
            dispatch(getFilmPerson(id));
        } else {
            dispatch(resetFilmPerson());
        }
    }, [id]);

    const film_person = useSelector(state => state.filmPersonReducer.film_person);

    return (
        <Formik
            initialValues={{
                name: film_person ? film_person.name : "",
                date_of_birth: film_person ? film_person.date_of_birth : "",
                sex: film_person ? film_person.sex : ""
            }}
            displayName="FilmPersonForm"
            enableReinitialize={true}
            onSubmit={(values, actions) => {
                if(id) {
                    dispatch(updateFilmPerson(id, values)).then(function() {
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
                    dispatch(createFilmPerson(values)).then(function() {
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

                    <TextInput attributes={{
                        type: "date",
                        name: "date_of_birth",
                        label: "Date of Birth"
                    }}/>

                    <TextInput attributes={{
                        type: "text",
                        name: "sex",
                        label: "Sex"
                    }}/>

                    <Divider hidden/>
                    <Button type="submit" positive disabled={formikProps.isSubmitting}>Save changes</Button>
                    <Button type="reset" disabled={formikProps.isSubmitting}>Reset</Button>
                </Form>
            )}
        </Formik>
    );
}

export default FilmPersonForm;
