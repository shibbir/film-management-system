import React from "react";
import { Container, Icon, Header, Divider, Segment, Button, Statistic } from "semantic-ui-react";

export default function NoMatch() {
    return (
        <Container>
            <Divider hidden/>
            <Segment placeholder>
                <Header icon>
                    <Icon name="search" color="red" size="massive"/>
                </Header>
                <Statistic color="red" size="huge">
                    <Statistic.Value text>Not Found!</Statistic.Value>
                    <Statistic.Label>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</Statistic.Label>
                </Statistic>
                <Segment.Inline>
                    <Button primary href="/">GO HOME</Button>
                </Segment.Inline>
            </Segment>
        </Container>
    );
}
