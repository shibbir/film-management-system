import { combineReducers } from "redux";

import filmPersonReducer from "../film-person/film-person.reducer";
import filmReducer from "../film/film.reducer";
import userReducer from "../user/user.reducer";

export default combineReducers({
    filmPersonReducer,
    filmReducer,
    userReducer
})
