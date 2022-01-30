import axios from "axios";

export function getFilmPersons() {
    return {
        type: "GET_FILM_PERSONS",
        payload: axios({
            method: "get",
            url: "/api/film-persons"
        })
    };
}

export function createFilmPerson(data) {
    return {
        type: "POST_FILM_PERSON",
        payload: axios({
            method: "post",
            data,
            url: `/api/film-persons`
        })
    };
}

export function getFilmPerson(id) {
    return {
        type: "GET_FILM_PERSON",
        payload: axios({
            method: "get",
            url: `/api/film-persons/${id}`
        })
    };
}

export function updateFilmPerson(id, data) {
    return {
        type: "PATCH_FILM_PERSON",
        payload: axios({
            method: "patch",
            data,
            url: `/api/film-persons/${id}`
        })
    };
}

export function deleteFilmPerson(id) {
    return {
        type: "DELETE_FILM_PERSON",
        payload: axios({
            method: "delete",
            url: `/api/film-persons/${id}`
        })
    };
}

export function resetFilmPerson() {
    return {
        type: "RESET_FILM_PERSON"
    };
}
