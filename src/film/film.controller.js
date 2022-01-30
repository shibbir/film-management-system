const { QueryTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

module.exports = function(app) {
    app.route("/api/films")
        .get(async function(req, res) {
            try {
                const data = await sequelize.dbConnector.query("SELECT * FROM fm.get_films()", { type: QueryTypes.SELECT });

                res.json(data);
            } catch(err) {
                res.status(500).send(err.message);
            }
        })
        .post(async function(req, res) {
            try {
                await sequelize.dbConnector.query("SELECT fm.insert_or_update_film(:title, :release_year, :genres, :production_country, :subordinated_to, :film_roles)", {
                    replacements: {
                        title: req.body.title,
                        release_year: +req.body.release_year,
                        genres: req.body.genres.join(),
                        production_country: req.body.production_country,
                        subordinated_to: +req.body.subordinated_to,
                        film_roles: JSON.stringify(req.body.film_roles)
                    }
                });

                res.sendStatus(200);
            } catch(err) {
                res.status(500).send(err.message);
            }
        })
    ;

    app.route("/api/films/:id")
        .get(async function(req, res) {
            try {
                const data = await sequelize.dbConnector.query("SELECT * FROM fm.get_films(:id)", {
                    replacements: { id: req.params.id },
                    type: QueryTypes.SELECT
                });

                res.json(data[0]);
            } catch(err) {
                res.status(500).send(err.message);
            }
        })
        .patch(async function(req, res) {
            try {
                await sequelize.dbConnector.query("SELECT fm.insert_or_update_film(:title, :release_year, :genres, :production_country, :subordinated_to, :film_roles, :id)", {
                    replacements: {
                        id: req.params.id,
                        title: req.body.title,
                        release_year: +req.body.release_year,
                        genres: req.body.genres.join(),
                        production_country: req.body.production_country,
                        subordinated_to: +req.body.subordinated_to,
                        film_roles: JSON.stringify(req.body.film_roles)
                    }
                });

                res.sendStatus(200);
            } catch(err) {
                res.status(500).send(err.message);
            }
        })
        .delete(async function(req, res) {
            try {
                await sequelize.dbConnector.query("SELECT fm.delete_film(:id)", {
                    replacements: { id: req.params.id }
                });

                res.sendStatus(200);
            } catch(err) {
                res.status(500).send(err.message);
            }
        })
    ;

    app.route("/api/films/:id/roles").get(async function(req, res) {
        try {
            const data = await sequelize.dbConnector.query("SELECT * FROM fm.get_film_roles(:id)", {
                replacements: { id: req.params.id },
                type: QueryTypes.SELECT
            });

            res.json(data);
        } catch(err) {
            res.status(500).send(err.message);
        }
    });
};
