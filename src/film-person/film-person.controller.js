const { QueryTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

async function getFilmPersons(req, res, next) {
    try {
        const filmPersons = await sequelize.dbConnector.query("SELECT * FROM fm.get_film_persons()", { type: QueryTypes.SELECT });

        res.json(filmPersons);
    } catch(err) {
        console.error(err);
        res.status(500).send("An error occurred. Please try again.");
    }
}

exports.getFilmPersons = getFilmPersons;
