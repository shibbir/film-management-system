import { Form, Formik, FieldArray } from "formik";
import React, { useEffect } from "react";
import iziToast from "izitoast/dist/js/iziToast";
import { Divider, Button, Form as SemanticUIForm } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import { TextInput, DropdownInput } from "../core/components/field-inputs.component";
import { createFilm, updateFilm, getFilm, resetFilm, getFilms, getFilmRoles } from "./film.actions";
import { getFilmPersons } from "../film-person/film-person.client.actions";

function FilmForm({ id } = props) {
    const dispatch = useDispatch();

    useEffect(() => {
        if(id) {
            dispatch(getFilm(id));
            dispatch(getFilmRoles(id));
        } else {
            dispatch(resetFilm());
        }
        dispatch(getFilms());
        dispatch(getFilmPersons());
    }, [id]);

    const film = useSelector(state => state.filmReducer.film);
    const films = useSelector(state => state.filmReducer.films);
    const film_persons = useSelector(state => state.filmPersonReducer.film_persons);

    const film_options = films.map(function(option) {
        return { key: option.id, value: option.id, text: `${option.title} [${option.release_year}]` };
    });

    const film_persons_options = film_persons.map(function(option) {
        return { key: option.id, value: option.id, text: option.name };
    });

    const year_options = Array(223).fill(2022).map(function(v, i) {
        return { key: v-i, value: v-i, text: v-i };
    });

    const role_options = [
        { key: 1, value: "Actor", text: "Actor" },
        { key: 2, value: "Director", text: "Director" },
        { key: 3, value: "Producer", text: "Producer" },
        { key: 4, value: "Writer", text: "Writer" }
    ];

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
                genres: film ? film.genres : [],
                film_roles: film && film.film_roles ? film.film_roles : []
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
                    <SemanticUIForm.Group widths="equal">
                        <TextInput attributes={{
                            type: "text",
                            name: "title",
                            label: "Title",
                            required: true
                        }}/>

                        <DropdownInput attributes={{
                            value: formikProps.values.subordinated_to,
                            name: "subordinated_to",
                            label: "Subordinated To",
                            options: film_options,
                            onChange: (event, data) => {formikProps.setFieldValue(data.name, data.value)}
                        }}/>
                    </SemanticUIForm.Group>

                    <SemanticUIForm.Group widths="equal">
                        <DropdownInput attributes={{
                            value: formikProps.values.release_year,
                            name: "release_year",
                            label: "Release Year",
                            options: year_options,
                            required: true,
                            onChange: (event, data) => {formikProps.setFieldValue(data.name, data.value)}
                        }}/>

                        <TextInput attributes={{
                            type: "text",
                            name: "production_country",
                            label: "Production Country"
                        }}/>
                    </SemanticUIForm.Group>

                    <DropdownInput attributes={{
                        value: formikProps.values.genres,
                        name: "genres",
                        label: "Genres",
                        options: genre_options,
                        required: true,
                        multiple: true,
                        onChange: (event, data) => {formikProps.setFieldValue(data.name, data.value)}
                    }}/>

                    <FieldArray name="film_roles" render={ arrayHelpers => (
                        <>
                            {formikProps.values.film_roles.map((film_role, index) => (
                                <SemanticUIForm.Group widths="equal" key={index}>
                                    <DropdownInput attributes={{
                                        value: film_role.person_id,
                                        name: `film_roles[${index}].person_id`,
                                        label: "Related Person",
                                        options: film_persons_options,
                                        required: true,
                                        onChange: (event, data) => {formikProps.setFieldValue(data.name, data.value)}
                                    }}/>

                                    <DropdownInput attributes={{
                                        value: film_role.roles,
                                        name: `film_roles[${index}].roles`,
                                        label: "Roles",
                                        options: role_options,
                                        required: true,
                                        multiple: true,
                                        onChange: (event, data) => {formikProps.setFieldValue(data.name, data.value)}
                                    }}/>

                                    <SemanticUIForm.Field>
                                        <label>Action</label>
                                        <Button type="button" icon="close" color="red" content="Discard" onClick={() => arrayHelpers.remove(index)}/>
                                    </SemanticUIForm.Field>
                                </SemanticUIForm.Group>
                            ))}
                            <Button type="button" icon="plus" onClick={() => arrayHelpers.push({ person_id: '', roles: [] })} content="Add Related Person"/>
                        </>
                    )}/>

                    <Divider hidden/>
                    <Button type="submit" positive disabled={formikProps.isSubmitting}>Save changes</Button>
                    <Button type="reset" disabled={formikProps.isSubmitting}>Reset</Button>
                </Form>
            )}
        </Formik>
    );
}

export default FilmForm;
