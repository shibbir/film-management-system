const { QueryTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

module.exports = function(app) {
    app.route("/api/film-persons")
        .get(async function(req, res) {
            try {
                const data = await sequelize.dbConnector.query("SELECT * FROM fm.get_film_persons()", { type: QueryTypes.SELECT });

                res.json(data);
            } catch(err) {
                res.status(500).send(err.message);
            }
        })
        .post(async function(req, res) {
            try {
                await sequelize.dbConnector.query("SELECT fm.insert_or_update_film_person(:name, :date_of_birth, :sex)", {
                    replacements: { ...req.body }
                });

                res.sendStatus(200);
            } catch(err) {
                res.status(500).send(err.message);
            }
        })
    ;

    app.route("/api/film-persons/:id")
        .get(async function(req, res) {
            try {
                const data = await sequelize.dbConnector.query("SELECT * FROM fm.get_film_persons(:id)", {
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
                await sequelize.dbConnector.query("SELECT fm.insert_or_update_film_person(:name, :date_of_birth, :sex, :id)", {
                    replacements: { ...req.body, id: req.params.id }
                });

                res.sendStatus(200);
            } catch(err) {
                res.status(500).send(err.message);
            }
        })
        .delete(async function(req, res) {
            try {
                await sequelize.dbConnector.query("SELECT fm.delete_film_person(:id)", {
                    replacements: { id: req.params.id }
                });

                res.sendStatus(200);
            } catch(err) {
                res.status(500).send(err.message);
            }
        })
    ;
};
