import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";

import Films from "./films.component";
import PrivateRoute from "../core/components/route-container.component";

export default function ClassRoutes() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoute exact path={path} component={Films}/>
        </Switch>
    );
}
