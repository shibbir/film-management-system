const { QueryTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

module.exports = function(app) {
    app.route("/api/users").post(async function(req, res) {
        try {
            const data = await sequelize.dbConnector.query("SELECT * FROM fm.insert_user(:username)", {
                replacements: { ...req.body },
                type: QueryTypes.SELECT
            });

            res.json(data[0]);
        } catch(err) {
            res.status(500).send(err.message);
        }
    });

    app.route("/api/users/:id/film-ratings")
        .get(async function(req, res) {
            try {
                const data = await sequelize.dbConnector.query("SELECT * FROM fm.get_film_ratings(:user_id)", {
                    replacements: { user_id: +req.params.id },
                    type: QueryTypes.SELECT
                });

                res.json(data);
            } catch(err) {
                res.status(500).send(err.message);
            }
        })
        .post(async function(req, res) {
            try {
                await sequelize.dbConnector.query("SELECT fm.insert_or_update_film_rating(:user_id, :film_id, :rating)", {
                    replacements: {
                        user_id: +req.params.id,
                        film_id: +req.body.film_id,
                        rating: +req.body.rating
                    }
                });

                res.sendStatus(200);
            } catch(err) {
                res.status(500).send(err.message);
            }
        })
    ;

    app.route("/api/users/:userId/film-ratings/:ratingId")
        .get(async function(req, res) {
            try {
                const data = await sequelize.dbConnector.query("SELECT * FROM fm.get_film_ratings(:user_id, :rating_id)", {
                    replacements: {
                        user_id: +req.params.userId,
                        rating_id: +req.params.ratingId
                    },
                    type: QueryTypes.SELECT
                });

                res.json(data[0]);
            } catch(err) {
                res.status(500).send(err.message);
            }
        })
        .patch(async function(req, res) {
            try {
                await sequelize.dbConnector.query("SELECT fm.insert_or_update_film_rating(:user_id, :film_id, :rating, :rating_id)", {
                    replacements: {
                        user_id: +req.params.userId,
                        rating_id: +req.params.ratingId,
                        film_id: +req.body.film_id,
                        rating: +req.body.rating
                    }
                });

                res.sendStatus(200);
            } catch(err) {
                res.status(500).send(err.message);
            }
        })
        .delete(async function(req, res) {
            try {
                await sequelize.dbConnector.query("SELECT fm.delete_film_rating(:rating_id)", {
                    replacements: {
                        rating_id: +req.params.ratingId
                    }
                });

                res.sendStatus(200);
            } catch(err) {
                res.status(500).send(err.message);
            }
        })
    ;

    app.route("/api/users/:id/film-suggestions").get(async function(req, res) {
        try {
            const data = await sequelize.dbConnector.query("SELECT * FROM fm.get_film_watch_suggestions(:user_id)", {
                replacements: { user_id: +req.params.id },
                type: QueryTypes.SELECT
            });

            res.json(data);
        } catch(err) {
            res.status(500).send(err.message);
        }
    });
};
