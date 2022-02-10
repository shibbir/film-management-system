import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import iziToast from "izitoast/dist/js/iziToast";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Divider, Segment, Button, Table, Modal, Header, Dropdown, Breadcrumb } from "semantic-ui-react";

import UsernameForm from "./username-form.component";
import FilmRatingForm from "./film-rating-form.component";
import { deleteFilmRating, getFilmRatings } from "./user.actions";

export default function FilmRatings() {
    const dispatch = useDispatch();
    const [filmRatingId, setFilmRatingId] = useState(undefined);

    const user = useSelector(state => state.userReducer.user);
    const film_ratings = useSelector(state => state.userReducer.film_ratings);

    useEffect(() => {
        if(user && user.id) {
            dispatch(getFilmRatings(user.id));
        }
    }, [user]);

    const onDeleteFilmRating = function(rating_id) {
        if(confirm("Are you sure you want to remove the rating?")) {
            dispatch(deleteFilmRating(user.id, rating_id)).then(function() {
                dispatch(getFilmRatings(user.id));

                iziToast["success"]({
                    timeout: 3000,
                    message: "Rating is removed.",
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

    const rows = film_ratings.map(function(row, index) {
        return (
            <Table.Row key={row.id}>
                <Table.Cell>{index+1}</Table.Cell>
                <Table.Cell>{row.title}</Table.Cell>
                <Table.Cell>{row.release_year}</Table.Cell>
                <Table.Cell>{row.genres.join(', ')}</Table.Cell>
                <Table.Cell>
                    <StarRatings
                        rating={+row.rating}
                        starRatedColor="orange"
                        numberOfStars={10}
                        name={`name${row.id}`}
                        starDimension="15px"
                        starSpacing="3px"
                    />
                </Table.Cell>
                <Table.Cell>{row.username}</Table.Cell>
                <Table.Cell>
                    <Dropdown>
                        <Dropdown.Menu>
                            <Dropdown.Item icon="edit" text="Update" onClick={() => setFilmRatingId(row.id)}/>
                            <Dropdown.Item icon="trash" text="Delete" onClick={() => onDeleteFilmRating(row.id)}/>
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
                <Breadcrumb.Section active>Film Ratings</Breadcrumb.Section>
            </Breadcrumb>

            <Button
                primary
                floated="right"
                content="Rate a film"
                onClick={() => setFilmRatingId(null)}
            />

            <Divider hidden clearing/>

            { film_ratings.length > 0 &&
                <Table selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Film Title</Table.HeaderCell>
                            <Table.HeaderCell>Release Year</Table.HeaderCell>
                            <Table.HeaderCell>Genres</Table.HeaderCell>
                            <Table.HeaderCell>Rating</Table.HeaderCell>
                            <Table.HeaderCell>Rated By</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {rows}
                    </Table.Body>
                </Table>
            }

            { film_ratings.length === 0 &&
                <Segment placeholder>
                    <Header icon>
                        <Icon name="star"/>
                        No film ratings are available for {user && user.username}.
                    </Header>
                </Segment>
            }

            <Modal dimmer size="tiny" open={filmRatingId !== undefined}>
                <Modal.Header>Rate a film</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <FilmRatingForm filmRatingId={filmRatingId}/>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="black" onClick={() => setFilmRatingId(undefined)}>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>

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
