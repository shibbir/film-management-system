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
        case Types.POST_FILM_PERSON_FULFILLED: {
            return { ...state, films: [action.payload.data].concat(state.films) };
        }
        case Types.GET_FILM_FULFILLED: {
            return { ...state, film: action.payload.data };
        }
        case Types.PATCH_FILM_FULFILLED: {
            const films = state.films.map(function(x) {
                if(x.id === action.payload.data.id) {
                    x = { ...action.payload.data };
                }
                return x;
            });
            return { ...state, films, film: action.payload.data };
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
