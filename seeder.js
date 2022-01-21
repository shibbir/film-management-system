const async = require("async");

async function init() {
    require("dotenv").config();
    const sequelize = require("./src/config/sequelize");

    await sequelize.dbConnector.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.POSTGRES_DATABASE_SCHEMA}`);
    await sequelize.dbConnector.query(`DROP SCHEMA ${process.env.POSTGRES_DATABASE_SCHEMA} CASCADE`);
    await sequelize.dbConnector.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.POSTGRES_DATABASE_SCHEMA}`);

    require("./models/film.model");
    require("./models/film-person.model");
    require("./models/user.model");
    require("./models/film-rating.model");

    await sequelize.dbConnector.sync({ force: true });

    await sequelize.dbConnector.query(`
        CREATE OR REPLACE FUNCTION fm.insert_films()
        RETURNS void
        LANGUAGE plpgsql

        AS $$ BEGIN

        INSERT INTO fm.films (id, title, release_year, genres, production_country, subordinated_to) VALUES
            (DEFAULT, 'The Terminator', 1984, '{"Action", "Sci-Fi"}', 'United States', null),
            (DEFAULT, 'Terminator 2: Judgment Day', 1991, '{"Action", "Sci-Fi"}', 'United States', 1),
            (DEFAULT, 'Terminator 3: Judgment Day', 1991, '{"Action", "Sci-Fi", "Drama"}', 'United States', 1),
            (DEFAULT, 'Terminator 4: Judgment Day', 1991, '{"Action", "Sci-Fi", "Drama"}', 'United States', 1),
            (DEFAULT, 'The Godfather', 1972, '{"Action", "Crime", "Drama"}', 'United States', null),
            (DEFAULT, 'The Godfather: Part II', 1974, '{"Action", "Crime", "Drama"}', 'United States', 5),
            (DEFAULT, 'Interstellar', 2014, '{"Adventure", "Drama", "Sci-Fi"}', 'United States', null),
            (DEFAULT, 'WALL·E', 2008, '{"Animation", "Adventure", "Family"}', 'United States', null),
            (DEFAULT, 'Mary and Max ', 2009, '{"Animation", "Comedy", "Drama"}', 'United States', null),
            (DEFAULT, 'Terminator 10: Judgment Day', 1991, '{"Action", "Sci-Fi"}', 'United States', null);

        END; $$;
    `);

    await sequelize.dbConnector.query(`
        CREATE OR REPLACE FUNCTION fm.insert_film_persons()
        RETURNS void
        LANGUAGE plpgsql

        AS $$ BEGIN

        INSERT INTO fm.film_persons (id, name, date_of_birth, sex) VALUES
            (DEFAULT, 'James Cameron', '1954-8-16', 'Male'),
            (DEFAULT, 'Arnold Schwarzenegger', '1947-7-30', 'Male'),
            (DEFAULT, 'Linda Hamilton', '1956-9-26', 'Female'),
            (DEFAULT, 'Marlon Brando', '1924-4-3', 'Male'),
            (DEFAULT, 'Al Pacino', '1940-4-25', 'Male');

        END; $$;
    `);

    await sequelize.dbConnector.query(`
        CREATE OR REPLACE FUNCTION fm.insert_film_person(
            name varchar,
            date_of_birth date,
            sex varchar
        )
        RETURNS void
        LANGUAGE plpgsql

        AS $$ BEGIN

        INSERT INTO fm.film_persons VALUES (DEFAULT, name, date_of_birth, sex);

        END; $$;
    `);

    await sequelize.dbConnector.query(`
        CREATE OR REPLACE FUNCTION fm.get_film_persons()
        RETURNS SETOF fm.film_persons
        LANGUAGE plpgsql

        AS $$ BEGIN

        RETURN QUERY SELECT * FROM fm.film_persons;

        END; $$;
    `);

    function filmSeeder(callback) {
        sequelize.dbConnector.query("SELECT fm.insert_films()").then(() => callback());
    }

    function filmPersonSeeder(callback) {
        sequelize.dbConnector.query("SELECT fm.insert_film_persons()").then(() => callback());
    }

    async.waterfall([
        filmSeeder,
        filmPersonSeeder
    ], function (err) {
        if (err) console.error(err);
        else console.info("DB seed completed!");
        process.exit();
    });
}

init();
