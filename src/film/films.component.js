import { Link } from "react-router-dom";
import iziToast from "izitoast/dist/js/iziToast";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Divider, Segment, Button, Table, Modal, Header, Dropdown, Breadcrumb } from "semantic-ui-react";

import FilmForm from "./film-form.component";
import { getFilms, deleteFilm } from "./film.actions";

export default function FilmList() {
    const dispatch = useDispatch();
    const [filmId, setFilmId] = useState(undefined);

    useEffect(() => {
        dispatch(getFilms());
    }, []);

    const films = useSelector(state => state.filmReducer.films);

    const onDeleteFilm = function(id) {
        if(confirm("Are you sure you want to remove the film? Subordinated films and related film user ratings will also be removed.")) {
            dispatch(deleteFilm(id)).then(function() {
                dispatch(getFilms());
                iziToast["success"]({
                    timeout: 3000,
                    message: "Film is removed.",
                    position: "topRight"
                });
            }).catch(function(err) {
                iziToast["error"]({
                    timeout: 3000,
                    title: err.response.status,
                    message: err.response.data,
                    position: "topRight"
                });
            });
        }
    };

    const rows = films.map(function(row, index) {
        return (
            <Table.Row key={row.id}>
                <Table.Cell>{index+1}</Table.Cell>
                <Table.Cell>{row.title}</Table.Cell>
                <Table.Cell>{row.release_year}</Table.Cell>
                <Table.Cell>{row.genres.join(', ')}</Table.Cell>
                <Table.Cell>{row.production_country}</Table.Cell>
                <Table.Cell>{row.subordinated_to ? row.subordinated_to_title : '--'}</Table.Cell>
                <Table.Cell>
                    <Dropdown>
                        <Dropdown.Menu>
                            <Dropdown.Item icon="edit" text="Update" onClick={() => setFilmId(row.id)}/>
                            <Dropdown.Item icon="trash" text="Delete" onClick={() => onDeleteFilm(row.id)}/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Table.Cell>
            </Table.Row>
        );
    });

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Section><Link to="/">Dashboard</Link></Breadcrumb.Section>
                <Breadcrumb.Divider>/</Breadcrumb.Divider>
                <Breadcrumb.Section active>Films</Breadcrumb.Section>
            </Breadcrumb>

            <Button
                primary
                floated="right"
                content="Add new film"
                onClick={() => setFilmId(null)}
            />

            <Divider hidden clearing/>

            { films.length > 0 &&
                <Table selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Release Year</Table.HeaderCell>
                            <Table.HeaderCell>Genres</Table.HeaderCell>
                            <Table.HeaderCell>Production Country</Table.HeaderCell>
                            <Table.HeaderCell>Subordinated To</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {rows}
                    </Table.Body>
                </Table>
            }

            { films.length === 0 &&
                <Segment placeholder>
                    <Header icon>
                        <Icon name="user"/>
                        No films are available.
                    </Header>
                </Segment>
            }

            <Modal dimmer size="small" open={filmId !== undefined}>
                <Modal.Header>Film Form</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <FilmForm id={filmId}/>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="black" onClick={() => setFilmId(undefined)}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}
