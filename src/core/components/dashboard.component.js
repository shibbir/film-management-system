import React from "react";
import { Link } from "react-router-dom";
import { Message, Divider, Card, Icon, Label, Feed } from "semantic-ui-react";

export default function Dashboard() {
    return (
        <>
            <Message
                info
                icon="info"
                header="Welcome to the Film Manager"
                content="Select any of the below services to get started."
            />

            <Divider hidden/>

            <Card.Group itemsPerRow={3} stackable>
                <Link className="ui raised card" to="/film-persons">
                    <Label color="blue" corner="right" size="small">
                        <Icon name="user"/>
                    </Label>
                    <Card.Content extra>
                        <Card.Header>Management of Film Related Persons</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Feed>
                            <Feed.Event>
                                <Feed.Label icon="hand point right outline"/>
                                <Feed.Content>
                                    <Feed.Summary>
                                        Overview of all film related persons.
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event></Feed.Event>
                            <Feed.Event></Feed.Event>

                            <Feed.Event>
                                <Feed.Label icon="hand point right outline"/>
                                <Feed.Content>
                                    <Feed.Summary>
                                        Manage person attributes such as name, birthdate, etc.
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Card.Content>
                </Link>

                <Link className="ui raised card" to="/films">
                    <Label color="blue" corner="right" size="small">
                        <Icon name="film"/>
                    </Label>
                    <Card.Content extra>
                        <Card.Header>Management of Films</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Feed>
                            <Feed.Event>
                                <Feed.Label icon="hand point right outline"/>
                                <Feed.Content>
                                    <Feed.Summary>
                                        Overview of all the available films.
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event></Feed.Event>
                            <Feed.Event></Feed.Event>

                            <Feed.Event>
                                <Feed.Label icon="hand point right outline"/>
                                <Feed.Content>
                                    <Feed.Summary>
                                        Manage film attributes, film roles, and subordinated films.
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Card.Content>
                </Link>

                <Link className="ui raised card" to="/film-ratings">
                    <Label color="blue" corner="right" size="small">
                        <Icon name="star"/>
                    </Label>
                    <Card.Content extra>
                        <Card.Header>Management of Film Ratings</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Feed>
                            <Feed.Event>
                                <Feed.Label icon="hand point right outline"/>
                                <Feed.Content>
                                    <Feed.Summary>
                                        Overview of all existing film ratings.
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>

                            <Feed.Event></Feed.Event>
                            <Feed.Event></Feed.Event>

                            <Feed.Event>
                                <Feed.Label icon="hand point right outline"/>
                                <Feed.Content>
                                    <Feed.Summary>
                                        Create, modify, remove, archive subjects. Assign teacher per subject.
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Card.Content>
                </Link>
            </Card.Group>
        </>
    );
}
