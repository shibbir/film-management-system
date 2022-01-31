import axios from "axios";

export function getFilmRatings(user_id) {
    return {
        type: "GET_FILM_RATINGS",
        payload: axios({
            method: "get",
            url: `/api/users/${user_id}/film-ratings`
        })
    };
}

export function getFilmSuggestions(user_id) {
    return {
        type: "GET_FILM_SUGGESTIONS",
        payload: axios({
            method: "get",
            url: `/api/users/${user_id}/film-suggestions`
        })
    };
}

export function createUser(data) {
    return {
        type: "POST_USER",
        payload: axios({
            method: "post",
            data,
            url: `/api/users`
        })
    };
}

export function getFilmRating(user_id, rating_id) {
    return {
        type: "GET_FILM_RATING",
        payload: axios({
            method: "get",
            url: `/api/users/${user_id}/film-ratings/${rating_id}`
        })
    };
}

export function createFilmRating(user_id, data) {
    return {
        type: "POST_FILM_RATING",
        payload: axios({
            method: "post",
            data,
            url: `/api/users/${user_id}/film-ratings`
        })
    };
}

export function updateFilmRating(user_id, film_rating_id, data) {
    return {
        type: "PATCH_FILM_RATING",
        payload: axios({
            method: "patch",
            data,
            url: `/api/users/${user_id}/film-ratings/${film_rating_id}`
        })
    };
}

export function deleteFilmRating(user_id, film_rating_id) {
    return {
        type: "DELETE_FILM_RATING",
        payload: axios({
            method: "delete",
            url: `/api/users/${user_id}/film-ratings/${film_rating_id}`
        })
    };
}

export function resetFilmRating() {
    return {
        type: "RESET_FILM_RATING"
    };
}
