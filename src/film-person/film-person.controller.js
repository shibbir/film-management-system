const { QueryTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

async function getFilmPersons(req, res) {
    try {
        const data = await sequelize.dbConnector.query("SELECT * FROM fm.get_film_persons()", { type: QueryTypes.SELECT });

        res.json(data);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function getFilmPerson(req, res) {
    try {
        const data = await sequelize.dbConnector.query("SELECT * FROM fm.get_film_persons(:id)", {
            replacements: { id: req.params.id },
            type: QueryTypes.SELECT
        });

        res.json(data[0]);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function createFilmPerson(req, res) {
    try {
        const data = await sequelize.dbConnector.query("SELECT * FROM fm.insert_or_update_film_person(:name, :date_of_birth, :sex)", {
            replacements: { ...req.body },
            type: QueryTypes.SELECT
        });

        res.json(data[0]);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function updateFilmPerson(req, res) {
    try {
        const data = await sequelize.dbConnector.query("SELECT * FROM fm.insert_or_update_film_person(:name, :date_of_birth, :sex, :id)", {
            replacements: { ...req.body, id: req.params.id },
            type: QueryTypes.SELECT
        });

        res.json(data[0]);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function deleteFilmPerson(req, res) {
    try {
        await sequelize.dbConnector.query("SELECT fm.delete_film_person(:id)", {
            replacements: { id: req.params.id }
        });

        res.json({ id: req.params.id });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

exports.getFilmPersons = getFilmPersons;
exports.getFilmPerson = getFilmPerson;
exports.createFilmPerson = createFilmPerson;
exports.updateFilmPerson = updateFilmPerson;
exports.deleteFilmPerson = deleteFilmPerson;
