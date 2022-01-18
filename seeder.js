const path = require("path");
const async = require("async");
const faker = require("faker");
const { v4: uuidv4 } = require("uuid");

async function init() {
    require("dotenv").config();
    const sequelize = require("./src/config/sequelize");

    await sequelize.dbConnector.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.POSTGRES_DATABASE_SCHEMA}`);
    await sequelize.dbConnector.query(`DROP SCHEMA ${process.env.POSTGRES_DATABASE_SCHEMA} CASCADE`);
    await sequelize.dbConnector.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.POSTGRES_DATABASE_SCHEMA}`);

    require("./models/film.model");
    require("./models/film-person.model");

    await sequelize.dbConnector.sync();

    // async.waterfall([
    //     classSeeder,
    //     userSeeder,
    //     subjectSeeder,
    //     classSubjectSeeder,
    //     testSeeder,
    //     testResultSeeder
    // ], function (err) {
    //     if (err) console.error(err);
    //     else console.info("DB seed completed!");
    //     process.exit();
    // });
}

init();
