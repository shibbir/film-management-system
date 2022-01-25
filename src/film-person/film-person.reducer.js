import _ from "lodash";
import Types from "./film-person.types";

const initialState = {
    film_persons: [],
    film_person: null
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case Types.GET_FILM_PERSONS_FULFILLED: {
            return { ...state, film_persons: action.payload.data };
        }
        case Types.POST_FILM_PERSON_FULFILLED: {
            return { ...state, film_persons: [action.payload.data].concat(state.film_persons) };
        }
        case Types.GET_FILM_PERSON_FULFILLED: {
            return { ...state, film_person: action.payload.data };
        }
        case Types.PATCH_FILM_PERSON_FULFILLED: {
            const film_persons = state.film_persons.map(function(x) {
                if(x.id === action.payload.data.id) {
                    x = { ...action.payload.data };
                }
                return x;
            });
            return { ...state, film_persons, film_person: action.payload.data };
        }
        case Types.DELETE_FILM_PERSON_FULFILLED: {
            return { ...state, film_persons: _.reject(state.film_persons, { id: +action.payload.data.id }) };
        }
        case Types.RESET_FILM_PERSON: {
            return { ...state, film_person: null };
        }
    }
    return state;
}
