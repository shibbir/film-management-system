import _ from "lodash";
import Types from "./film-person.types";

const initialState = {
    film_persons: []
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case Types.GET_FILM_PERSONS_FULFILLED: {
            return { ...state, film_persons: action.payload.data };
        }
        case Types.POST_SUBJECT_FULFILLED: {
            return { ...state, subjects: [action.payload.data].concat(state.subjects) };
        }
        case Types.GET_SUBJECT_FULFILLED: {
            return { ...state, subject: action.payload.data };
        }
        case Types.PATCH_SUBJECT_FULFILLED: {
            const subjects = state.subjects.map(function(x) {
                if(x.id === action.payload.data.id) {
                    x = { ...action.payload.data };
                }
                return x;
            });
            return { ...state, subjects, subject: action.payload.data };
        }
        case Types.DELETE_SUBJECT_FULFILLED: {
            return { ...state, subjects: _.reject(state.subjects, { id: action.payload.data.id }) };
        }
        case Types.RESET_SUBJECT: {
            return { ...state, subject: null };
        }
    }
    return state;
}