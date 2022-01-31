const initialState = {
    user: null,
    film_ratings: [],
    film_rating: null,
    film_suggestions: []
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case "GET_FILM_RATINGS_FULFILLED": {
            return { ...state, film_ratings: action.payload.data };
        }
        case "GET_FILM_RATING_FULFILLED": {
            return { ...state, film_rating: action.payload.data };
        }
        case "RESET_FILM_RATING": {
            return { ...state, film_rating: null };
        }
        case "POST_USER_FULFILLED": {
            return { ...state, user: action.payload.data };
        }
        case "GET_FILM_SUGGESTIONS_FULFILLED": {
            return { ...state, film_suggestions: action.payload.data };
        }
    }
    return state;
}
