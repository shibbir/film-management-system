import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Divider, Segment, Table, Modal, Header, Breadcrumb } from "semantic-ui-react";

import UsernameForm from "./username-form.component";
import { getFilmSuggestions } from "./user.actions";

export default function FilmSuggestions() {
    const dispatch = useDispatch();

    const user = useSelector(state => state.userReducer.user);
    const film_suggestions = useSelector(state => state.userReducer.film_suggestions);

    useEffect(() => {
        if(user && user.id) {
            dispatch(getFilmSuggestions(user.id));
        }
    }, [user]);

    const rows = film_suggestions.map(function(row, index) {
        return (
            <Table.Row key={row.id}>
                <Table.Cell>{index+1}</Table.Cell>
                <Table.Cell>{row.title}</Table.Cell>
                <Table.Cell>{row.release_year}</Table.Cell>
                <Table.Cell>{row.genres.join(', ')}</Table.Cell>
            <Table.Cell>{row.production_country}</Table.Cell>
            </Table.Row>
        );
    });

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Section><Link to="/">Dashboard</Link></Breadcrumb.Section>
                <Breadcrumb.Divider>/</Breadcrumb.Divider>
                <Breadcrumb.Section active>Film Suggestions</Breadcrumb.Section>
            </Breadcrumb>

            <Divider hidden clearing/>

            { user && <Header as='h3'>Film watch suggestions for {user.username} based on film rating and genres.</Header> }

            { film_suggestions.length > 0 &&
                <Table selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Film Title</Table.HeaderCell>
                            <Table.HeaderCell>Release Year</Table.HeaderCell>
                            <Table.HeaderCell>Genres</Table.HeaderCell>
                            <Table.HeaderCell>Production Country</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {rows}
                    </Table.Body>
                </Table>
            }

            { film_suggestions.length === 0 &&
                <Segment placeholder>
                    <Header icon>
                        <Icon name="film"/>
                        No film suggestions are available for {user && user.username}.
                    </Header>
                </Segment>
            }

            <Modal dimmer size="tiny" open={!user}>
                <Modal.Header>Please enter your username to proceed</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <UsernameForm/>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        </>
    );
}
