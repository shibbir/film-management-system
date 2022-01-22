const { QueryTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

async function getFilmPersons(req, res) {
    try {
        const filmPersons = await sequelize.dbConnector.query("SELECT * FROM fm.get_film_persons()", { type: QueryTypes.SELECT });

        res.json(filmPersons);
    } catch(err) {
        res.status(500).send("An error occurred. Please try again.");
    }
}

async function getFilmPerson(req, res) {
    try {
        const filmPerson = await sequelize.dbConnector.query("SELECT * FROM fm.get_film_person(:id)", {
            replacements: { id: req.params.id },
            type: QueryTypes.SELECT
        });

        res.json(filmPerson);
    } catch(err) {
        console.error(err);
        res.status(500).send("An error occurred. Please try again.");
    }
}

exports.getFilmPersons = getFilmPersons;
exports.getFilmPerson = getFilmPerson;
