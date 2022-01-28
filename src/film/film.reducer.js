import _ from "lodash";
import Types from "./film.types";

const initialState = {
    films: [],
    film: null
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case Types.GET_FILMS_FULFILLED: {
            return { ...state, films: action.payload.data };
        }
        case Types.GET_FILM_FULFILLED: {
            return { ...state, film: action.payload.data };
        }
        case Types.PATCH_FILM_FULFILLED: {
            return { ...state, film: action.payload.data };
        }
        case Types.DELETE_FILM_FULFILLED: {
            return { ...state, films: _.reject(state.films, { id: +action.payload.data.id }) };
        }
        case Types.RESET_FILM: {
            return { ...state, film: null };
        }
    }
    return state;
}
