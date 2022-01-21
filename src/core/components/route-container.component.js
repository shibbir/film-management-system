import React from "react";
import { Route } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";

import Footer from "./footer.component";

export default function ContainerRoute({ component: Component, roles, ...rest }) {
    return (
        <Route {...rest} render={props => {
            return (
                <>
                    <Divider hidden/>
                    <Container className="site-content">
                        <Component {...props}/>
                        <Divider hidden/>
                    </Container>
                    <Footer/>
                </>
            )
        }}/>
    );
}
