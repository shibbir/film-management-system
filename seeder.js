async function init() {
    require("dotenv").config();
    const sequelize = require("./src/config/sequelize");

    await sequelize.dbConnector.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.POSTGRES_DATABASE_SCHEMA}`);
    await sequelize.dbConnector.query(`DROP SCHEMA ${process.env.POSTGRES_DATABASE_SCHEMA} CASCADE`);
    await sequelize.dbConnector.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.POSTGRES_DATABASE_SCHEMA}`);

    require("./models/film.model");
    require("./models/film-person.model");
    require("./models/film-role.model");
    require("./models/user.model");
    require("./models/film-rating.model");

    await sequelize.dbConnector.sync({ force: true });

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

    await sequelize.dbConnector.query(`
        CREATE OR REPLACE FUNCTION fm.get_film_person(IN person_id int, OUT person_name varchar, OUT date_of_birth date, OUT person_sex void)
        LANGUAGE plpgsql

        AS $$ BEGIN

        SELECT id, name, date_of_birth, sex FROM fm.film_persons WHERE id = person_id INTO ;

        END; $$;
    `);

    async function filmSeeder() {
        await sequelize.dbConnector.query(`
            CREATE OR REPLACE FUNCTION fm.insert_films()
            RETURNS void
            LANGUAGE plpgsql

            AS $$ BEGIN

            INSERT INTO fm.films (title, release_year, genres, production_country, subordinated_to) VALUES
                ('The Terminator', 1984, '{"Action", "Sci-Fi"}', 'United States', null),
                ('Terminator 2: Judgment Day', 1991, '{"Action", "Sci-Fi"}', 'United States', 1),
                ('Terminator 3: Rise of the Machines', 2003, '{"Action", "Sci-Fi"}', 'United States', 1),
                ('Terminator: Dark Fate', 2019, '{"Action", "Sci-Fi"}', 'United States', 1),
                ('Good Will Hunting', 1997, '{"Narrative", "Drama", "Romance"}', 'United States', null),
                ('The Godfather', 1972, '{"Action", "Crime", "Drama"}', 'United States', null),
                ('The Godfather: Part II', 1974, '{"Action", "Crime", "Thriller"}', 'United States', null),
                ('Inception', 2010, '{"Action", "Adventure", "Sci-Fi"}', 'United States', null),
                ('Interstellar', 2014, '{"Adventure", "Drama", "Sci-Fi"}', 'United States', null),
                ('The Departed', 2006, '{"Crime", "Drama", "Thriller"}', 'United States', null);

            END; $$;
        `);

        await sequelize.dbConnector.query("SELECT fm.insert_films()");
    }

    async function filmPersonSeeder() {
        await sequelize.dbConnector.query(`
            CREATE OR REPLACE FUNCTION fm.insert_film_persons()
            RETURNS void
            LANGUAGE plpgsql

            AS $$ BEGIN

            INSERT INTO fm.film_persons (name, date_of_birth, sex) VALUES
                ('James Cameron', '1954-8-16', 'Male'),
                ('Arnold Schwarzenegger', '1947-7-30', 'Male'),
                ('Linda Hamilton', '1956-9-26', 'Female'),
                ('Marlon Brando', '1924-4-3', 'Male'),
                ('Al Pacino', '1940-4-25', 'Male'),
                ('Christopher Nolan', '1970-7-30', 'Male'),
                ('Leonardo DiCaprio', '1974-11-11', 'Male'),
                ('Matt Damon', '1970-10-8', 'Male'),
                ('Francis Ford Coppola', '1939-4-7', 'Male'),
                ('Mario Puzo', '1920-10-15', 'Male');

            END; $$;
        `);

        await sequelize.dbConnector.query("SELECT fm.insert_film_persons()");
    }

    async function filmRoleSeeder() {
        await sequelize.dbConnector.query(`
            CREATE OR REPLACE FUNCTION fm.insert_film_roles()
            RETURNS void
            LANGUAGE plpgsql

            AS $$ BEGIN

            INSERT INTO fm.film_roles (role, person_id, film_id) VALUES
                ('Director', 1, 1),
                ('Director', 1, 2),
                ('Director', 1, 3),

                ('Actor', 2, 2),
                ('Actor', 2, 3),
                ('Actor', 2, 4),

                ('Actor', 3, 1),
                ('Actor', 3, 2),
                ('Actor', 3, 4),

                ('Actor', 7, 8),
                ('Actor', 7, 9),
                ('Actor', 7, 10),

                ('Actor', 8, 5),
                ('Actor', 8, 9),
                ('Actor', 8, 10),

                ('Director', 6, 8),
                ('Writer', 6, 8),
                ('Producer', 6, 8),

                ('Actor', 4, 6),

                ('Actor', 5, 6),

                ('Director', 9, 6),

                ('Writer', 10, 6),
                ('Writer', 10, 7);

            END; $$;
        `);

        sequelize.dbConnector.query("SELECT fm.insert_film_roles()");
    }

    async function userSeeder() {
        await sequelize.dbConnector.query(`
            CREATE OR REPLACE FUNCTION fm.insert_users()
            RETURNS void
            LANGUAGE plpgsql

            AS $$ BEGIN

            INSERT INTO fm.users (username) VALUES
                ('user1'),
                ('user2'),
                ('user3'),
                ('user4'),
                ('user5');

            END; $$;
        `);

        await sequelize.dbConnector.query("SELECT fm.insert_users()");
    }

    async function filmRatingSeeder() {
        await sequelize.dbConnector.query(`
            CREATE OR REPLACE FUNCTION fm.insert_film_ratings()
            RETURNS void
            LANGUAGE plpgsql

            AS $$ BEGIN

            INSERT INTO fm.film_ratings (user_id, film_id, rating) VALUES
                (1, 1, 7),
                (1, 2, 8),
                (1, 3, 7.5),
                (1, 4, 9.2),
                (1, 5, 7.5),
                (1, 6, 8),
                (1, 7, 9),
                (1, 8, 6),
                (1, 9, 9.5),
                (1, 10, 7.5),

                (2, 1, 7),
                (2, 2, 8),
                (2, 3, 7.5),
                (2, 4, 9.2),
                (2, 5, 7.5),

                (3, 6, 7),
                (3, 7, 8),
                (3, 8, 7.5),
                (3, 9, 9.2),
                (3, 10, 7.5),

                (4, 1, 7),
                (4, 3, 8),
                (4, 5, 7.5),
                (4, 7, 9.2),
                (4, 9, 7.5);

            END; $$;
        `);

        await sequelize.dbConnector.query("SELECT fm.insert_film_ratings()");
    }

    filmSeeder();
    filmPersonSeeder();
    filmRoleSeeder();
    userSeeder();
    filmRatingSeeder();
}

init();
