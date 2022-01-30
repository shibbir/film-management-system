import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";

import FilmRatings from "./film-ratings.component";
import PrivateRoute from "../core/components/route-container.component";

export default function ClassRoutes() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={path} component={FilmRatings}/>
        </Switch>
    );
}
