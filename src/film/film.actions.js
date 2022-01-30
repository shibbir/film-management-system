import axios from "axios";

export function getFilms() {
    return {
        type: "GET_FILMS",
        payload: axios({
            method: "get",
            url: "/api/films"
        })
    };
}

export function getFilmRoles(id) {
    return {
        type: "GET_FILM_ROLES",
        payload: axios({
            method: "get",
            url: `/api/films/${id}/roles`
        })
    };
}

export function createFilm(data) {
    return {
        type: "POST_FILM",
        payload: axios({
            method: "post",
            data,
            url: `/api/films`
        })
    };
}

export function getFilm(id) {
    return {
        type: "GET_FILM",
        payload: axios({
            method: "get",
            url: `/api/films/${id}`
        })
    };
}

export function updateFilm(id, data) {
    return {
        type: "PATCH_FILM",
        payload: axios({
            method: "patch",
            data,
            url: `/api/films/${id}`
        })
    };
}

export function deleteFilm(id) {
    return {
        type: "DELETE_FILM",
        payload: axios({
            method: "delete",
            url: `/api/films/${id}`
        })
    };
}

export function resetFilm() {
    return {
        type: "RESET_FILM"
    };
}
