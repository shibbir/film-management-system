const initialState = {
    films: [],
    film: null
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case "GET_FILMS_FULFILLED": {
            return { ...state, films: action.payload.data };
        }
        case "GET_FILM_FULFILLED": {
            return { ...state, film: action.payload.data };
        }
        case "RESET_FILM": {
            return { ...state, film: null };
        }
        case "GET_FILM_ROLES_FULFILLED": {
            return { ...state, film: { ...state.film, film_roles: action.payload.data } };
        }
    }
    return state;
}
