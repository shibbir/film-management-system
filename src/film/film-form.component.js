import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import iziToast from "izitoast/dist/js/iziToast";
import { Divider, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import { TextInput } from "../core/components/field-inputs.component";
import { createFilm, updateFilm, getFilm, resetFilm } from "./film.actions";

function FilmForm({ id } = props) {
    const dispatch = useDispatch();

    useEffect(() => {
        if(id) {
            dispatch(getFilm(id));
        } else {
            dispatch(resetFilm());
        }
    }, [id]);

    const film = useSelector(state => state.filmReducer.film);

    return (
        <Formik
            initialValues={{
                title: film ? film.title : "",
                release_year: film ? film.release_year : "",
                production_country: film ? film.production_country : ""
            }}
            displayName="FilmForm"
            enableReinitialize={true}
            onSubmit={(values, actions) => {
                if(id) {
                    dispatch(updateFilm(id, values)).then(function() {
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
                    dispatch(createFilm(values)).then(function() {
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
                        name: "title",
                        label: "Title",
                        required: true
                    }}/>

                    <TextInput attributes={{
                        type: "number",
                        name: "release_year",
                        label: "Release Year",
                        required: true
                    }}/>

                    <TextInput attributes={{
                        type: "text",
                        name: "production_country",
                        label: "Production Country"
                    }}/>

                    <Divider hidden/>
                    <Button type="submit" positive disabled={formikProps.isSubmitting}>Save changes</Button>
                    <Button type="reset" disabled={formikProps.isSubmitting}>Reset</Button>
                </Form>
            )}
        </Formik>
    );
}

export default FilmForm;
