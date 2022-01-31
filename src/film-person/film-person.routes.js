import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";

import FilmPersons from "./film-persons.component";
import PrivateRoute from "../core/components/route-container.component";

export default function FilmPersonRoutes() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={path} component={FilmPersons}/>
        </Switch>
    );
}
