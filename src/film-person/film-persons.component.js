import axios from "axios";
import { capitalize } from "lodash";
import { Link } from "react-router-dom";
import { FormattedDate } from "react-intl";
import iziToast from "izitoast/dist/js/iziToast";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Divider, Segment, Button, Table, Modal, Header, Dropdown, Breadcrumb, List } from "semantic-ui-react";

import SubjectForm from "./film-person-form.component";
import { getFilmPersons, deleteSubject, updateSubject } from "./film-person.client.actions";

export default function SubjectList() {
    const dispatch = useDispatch();
    const [subjectId, setSubjectId] = useState(undefined);

    useEffect(() => {
        dispatch(getFilmPersons());
    }, []);

    const film_persons = useSelector(state => state.filmPersonReducer.film_persons);

    const onDeleteSubject = function(id) {
        if(confirm("Are you sure you want to remove the subject?")) {
            dispatch(deleteSubject(id)).then(function() {
                iziToast["success"]({
                    timeout: 3000,
                    message: "Subject is removed.",
                    position: "topRight"
                });
            });
        }
    };

    const rows = film_persons.map(function(row, index) {
        return (
            <Table.Row key={row.id}>
                <Table.Cell>{index+1}</Table.Cell>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell><FormattedDate value={row.date_of_birth} day="2-digit" month="long" year="numeric"/></Table.Cell>
                <Table.Cell>{row.sex}</Table.Cell>
                <Table.Cell>
                    <Dropdown>
                        <Dropdown.Menu>
                            <Dropdown.Item icon="edit" text="Update Attributes" onClick={() => setSubjectId(row.id)}/>
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
                <Breadcrumb.Section active>Film Related Persons</Breadcrumb.Section>
            </Breadcrumb>

            <Button
                primary
                floated="right"
                content="Add new film related person"
                onClick={() => setSubjectId(null)}
            />

            <Divider hidden clearing/>

            { film_persons.length > 0 &&
                <Table selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Date of Birth</Table.HeaderCell>
                            <Table.HeaderCell>Sex</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {rows}
                    </Table.Body>
                </Table>
            }

            { film_persons.length === 0 &&
                <Segment placeholder>
                    <Header icon>
                        <Icon name="user"/>
                        No film related persons are available.
                    </Header>
                </Segment>
            }

            <Modal dimmer size="tiny" open={subjectId !== undefined}>
                <Modal.Header>Subject Form</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <SubjectForm id={subjectId}/>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="black" onClick={() => setSubjectId(undefined)}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}
