import axios from "axios";
import React from "react";
import { Route, Switch } from "react-router-dom";

import "fomantic-ui-css/semantic.css";
import "izitoast/dist/css/iziToast.css";
import "./app.component.css";

import NoMatch from "./components/nomatch-route.component";
import RouteContainer from "./components/route-container.component";
import Dashboard from "./components/dashboard.component";

import FilmPersonRoutes from "../film-person/film-person.routes";
import FilmRoutes from "../film/film.routes";
import FilmRatingRoutes from "../film-rating/film-rating.routes";

let refCount = 0;

function setLoading(isLoading) {
    if (isLoading) {
        refCount++;
        document.getElementById("loader").style = "display: block";
    } else if (refCount > 0) {
        refCount--;
        if(refCount > 0) document.getElementById("loader").style = "display: block";
        else document.getElementById("loader").style = "display: none";
    }
}

axios.interceptors.request.use(config => {
    setLoading(true);
    return config;
}, error => {
    setLoading(false);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    setLoading(false);
    return response;
}, error => {
    setLoading(false);
    return Promise.reject(error);
});

export default function App() {
    return (
        <Switch>
            <RouteContainer exact path="/" component={Dashboard}/>

            <Route path="/film-persons" component={FilmPersonRoutes}/>
            <Route path="/films" component={FilmRoutes}/>
            <Route path="/film-ratings" component={FilmRatingRoutes}/>

            <Route component={NoMatch}/>
        </Switch>
    );
}
