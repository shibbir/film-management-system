import React from "react";
import { Switch } from "react-router-dom";

import FilmRatings from "./film-ratings.component";
import FilmSuggestions from "./film-suggestions.component";
import PrivateRoute from "../core/components/route-container.component";

export default function UserRoutes() {
    return (
        <Switch>
            <PrivateRoute path="/film-ratings" component={FilmRatings}/>
            <PrivateRoute path="/film-suggestions" component={FilmSuggestions}/>
        </Switch>
    );
}
