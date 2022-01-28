import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import iziToast from "izitoast/dist/js/iziToast";
import { Divider, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import { TextInput, DropdownInput } from "../core/components/field-inputs.component";
import { createFilm, updateFilm, getFilm, resetFilm, getFilms } from "./film.actions";

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
    const films = useSelector(state => state.filmReducer.films);

    const film_options = films.map(function(option) {
        return { key: option.id, value: option.id, text: `${option.title} [${option.release_year}]` };
    });

    const genre_options = [
        { key: 1, value: "Action", text: "Action" },
        { key: 2, value: "Adventure", text: "Adventure" },
        { key: 3, value: "Crime", text: "Crime" },
        { key: 4, value: "Drama", text: "Drama" },
        { key: 5, value: "Narrative", text: "Narrative" },
        { key: 6, value: "Romance", text: "Romance" },
        { key: 7, value: "Sci-Fi", text: "Sci-Fi" },
        { key: 8, value: "Thriller", text: "Thriller" }
    ];

    return (
        <Formik
            initialValues={{
                title: film ? film.title : "",
                release_year: film ? film.release_year : "",
                production_country: film ? film.production_country : "",
                subordinated_to: film ? film.subordinated_to : "",
                genres: film ? film.genres : []
            }}
            displayName="FilmForm"
            enableReinitialize={true}
            onSubmit={(values, actions) => {
                if(id) {
                    dispatch(updateFilm(id, values)).then(function() {
                        dispatch(getFilms());

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
                        dispatch(getFilms());
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

                    <DropdownInput attributes={{
                        value: formikProps.values.genres,
                        name: "genres",
                        label: "Genres",
                        options: genre_options,
                        required: true,
                        multiple: true,
                        onChange: (event, data) => {formikProps.setFieldValue(data.name, data.value)}
                    }}/>

                    <TextInput attributes={{
                        type: "text",
                        name: "production_country",
                        label: "Production Country"
                    }}/>

                    <DropdownInput attributes={{
                        value: formikProps.values.subordinated_to,
                        name: "subordinated_to",
                        label: "Subordinated To",
                        options: film_options,
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

export default FilmForm;
