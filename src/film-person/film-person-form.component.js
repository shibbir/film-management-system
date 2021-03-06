import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import iziToast from "izitoast/dist/js/iziToast";
import { Divider, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import { TextInput, DropdownInput } from "../core/components/field-inputs.component";
import { createFilmPerson, updateFilmPerson, getFilmPerson, resetFilmPerson, getFilmPersons } from "./film-person.actions";

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

    const sex_options = [
        { key: 1, value: "Male", text: "Male" },
        { key: 2, value: "Female", text: "Female" }
    ];

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
                        dispatch(getFilmPersons());

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
                        dispatch(getFilmPersons());
                        actions.resetForm();

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

                    <DropdownInput attributes={{
                        value: formikProps.values.sex,
                        name: "sex",
                        label: "Sex",
                        options: sex_options,
                        onChange: (event, data) => {formikProps.setFieldValue(data.name, data.value)}
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
