const { QueryTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

async function getFilms(req, res) {
    try {
        const data = await sequelize.dbConnector.query("SELECT * FROM fm.get_films()", { type: QueryTypes.SELECT });

        res.json(data);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function getFilm(req, res) {
    try {
        const data = await sequelize.dbConnector.query("SELECT * FROM fm.get_films(:id)", {
            replacements: { id: req.params.id },
            type: QueryTypes.SELECT
        });

        res.json(data[0]);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function createFilm(req, res) {
    try {
        const data = await sequelize.dbConnector.query("SELECT * FROM fm.insert_or_update_film(:name, :date_of_birth, :sex)", {
            replacements: { ...req.body },
            type: QueryTypes.SELECT
        });

        res.json(data[0]);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function updateFilm(req, res) {
    try {
        const data = await sequelize.dbConnector.query("SELECT * FROM fm.insert_or_update_film(:name, :date_of_birth, :sex, :id)", {
            replacements: { ...req.body, id: req.params.id },
            type: QueryTypes.SELECT
        });

        res.json(data[0]);
    } catch(err) {
        res.status(500).send(err.message);
    }
}

async function deleteFilm(req, res) {
    try {
        await sequelize.dbConnector.query("SELECT fm.delete_film(:id)", {
            replacements: { id: req.params.id }
        });

        res.json({ id: req.params.id });
    } catch(err) {
        res.status(500).send(err.message);
    }
}

exports.getFilms = getFilms;
exports.getFilm = getFilm;
exports.createFilm = createFilm;
exports.updateFilm = updateFilm;
exports.deleteFilm = deleteFilm;
