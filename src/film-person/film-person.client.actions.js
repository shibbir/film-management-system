import axios from "axios";
import Types from "./film-person.types";

export function getFilmPersons() {
    return {
        type: Types.GET_FILM_PERSONS,
        payload: axios({
            method: "get",
            url: "/api/film-persons"
        })
    };
}

export function createFilmPerson(data) {
    return {
        type: Types.POST_FILM_PERSON,
        payload: axios({
            method: "post",
            data,
            url: `/api/film-persons`
        })
    };
}

export function getFilmPerson(id) {
    return {
        type: Types.GET_FILM_PERSON,
        payload: axios({
            method: "get",
            url: `/api/film-persons/${id}`
        })
    };
}

export function updateFilmPerson(id, data) {
    return {
        type: Types.PATCH_FILM_PERSON,
        payload: axios({
            method: "patch",
            data,
            url: `/api/film-persons/${id}`
        })
    };
}

export function resetFilmPerson() {
    return {
        type: Types.RESET_FILM_PERSON
    };
}
