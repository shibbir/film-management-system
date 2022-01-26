import { combineReducers } from "redux";

import filmPersonReducer from "../film-person/film-person.reducer";
import filmReducer from "../film/film.reducer";

export default combineReducers({
    filmPersonReducer,
    filmReducer
})
