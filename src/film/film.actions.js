import axios from "axios";
import Types from "./film.types";

export function getFilms() {
    return {
        type: Types.GET_FILMS,
        payload: axios({
            method: "get",
            url: "/api/films"
        })
    };
}

export function createFilm(data) {
    return {
        type: Types.POST_FILM,
        payload: axios({
            method: "post",
            data,
            url: `/api/films`
        })
    };
}

export function getFilm(id) {
    return {
        type: Types.GET_FILM,
        payload: axios({
            method: "get",
            url: `/api/films/${id}`
        })
    };
}

export function updateFilm(id, data) {
    return {
        type: Types.PATCH_FILM,
        payload: axios({
            method: "patch",
            data,
            url: `/api/films/${id}`
        })
    };
}

export function deleteFilm(id) {
    return {
        type: Types.DELETE_FILM,
        payload: axios({
            method: "delete",
            url: `/api/films/${id}`
        })
    };
}

export function resetFilm() {
    return {
        type: Types.RESET_FILM
    };
}
