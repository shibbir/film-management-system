import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import iziToast from "izitoast/dist/js/iziToast";
import { Divider, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import { DropdownInput } from "../core/components/field-inputs.component";
import { getFilms } from "../film/film.actions";
import { createFilmRating, updateFilmRating, getFilmRating, resetFilmRating, getFilmRatings } from "./user.actions";

function FilmRatingForm({ filmRatingId } = props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);

    useEffect(() => {
        if(user && user.id && filmRatingId) {
            dispatch(getFilmRating(user.id, filmRatingId));
        } else {
            dispatch(resetFilmRating());
        }
        dispatch(getFilms());
    }, [user, filmRatingId]);

    const films = useSelector(state => state.filmReducer.films);
    const film_rating = useSelector(state => state.userReducer.film_rating);

    const film_options = films.map(function(option) {
        return { key: option.id, value: option.id, text: `${option.title} [${option.release_year}]` };
    });

    const rating_options = [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1].map(function(option) {
        return { key: option, value: option+"", text: option };
    });

    return (
        <Formik
            initialValues={{
                film_id: film_rating ? film_rating.film_id : "",
                rating: film_rating ? film_rating.rating : ""
            }}
            displayName="FilmRatingForm"
            enableReinitialize={true}
            onSubmit={(values, actions) => {
                if(filmRatingId) {
                    dispatch(updateFilmRating(user.id, filmRatingId, values)).then(function() {
                        dispatch(getFilmRatings(user.id));

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
                    dispatch(createFilmRating(user.id, values)).then(function() {
                        dispatch(getFilmRatings(user.id));
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
                    <DropdownInput attributes={{
                        value: formikProps.values.film_id,
                        name: "film_id",
                        label: "Film",
                        options: film_options,
                        onChange: (event, data) => {formikProps.setFieldValue(data.name, data.value)}
                    }}/>

                    <DropdownInput attributes={{
                        value: formikProps.values.rating,
                        name: "rating",
                        label: "Rating",
                        options: rating_options,
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

export default FilmRatingForm;
