import React from "react";
import { Icon, Container } from "semantic-ui-react";

export default function Footer() {
    return (
        <Container>
            <footer className="ui vertical footer segment">
                <div className="ui center aligned container">
                    <Icon name="copyright outline"/> Film Manager 2022.
                    Licensed under <a rel="license" href="https://opensource.org/licenses/MIT">MIT</a>.
                </div>
            </footer>
        </Container>
    );
}
