const initialState = {
    film_persons: [],
    film_person: null
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case "GET_FILM_PERSONS_FULFILLED": {
            return { ...state, film_persons: action.payload.data };
        }
        case "GET_FILM_PERSON_FULFILLED": {
            return { ...state, film_person: action.payload.data };
        }
        case "RESET_FILM_PERSON": {
            return { ...state, film_person: null };
        }
    }
    return state;
}
