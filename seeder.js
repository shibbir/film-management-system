async function init() {
    require("dotenv").config();
    const sequelize = require("./src/config/sequelize");

    try {
        await sequelize.dbConnector.query("CREATE SCHEMA IF NOT EXISTS fm");
        await sequelize.dbConnector.query("DROP SCHEMA fm CASCADE");
        await sequelize.dbConnector.query("CREATE SCHEMA IF NOT EXISTS fm");

        // require("./models/film.model");
        // require("./models/film-person.model");
        // //require("./models/film-role.model");
        // require("./models/user.model");
        // require("./models/film-rating.model");

        // await sequelize.dbConnector.sync();

        const {  create_film_persons_table, get_film_persons, insert_or_update_film_person, delete_film_person } = require("./src/film-person/film-person.pgplsql");
        const {  create_films_table, get_films, insert_or_update_film } = require("./src/film/film.pgplsql");
        const {  create_film_roles_table, get_film_roles } = require("./src/film/film-role.pgplsql");
        const {  create_users_table } = require("./src/user/user.pgplsql");
        const {  create_film_ratings_table } = require("./src/film-rating/film-rating.pgplsql");

        await sequelize.dbConnector.query(create_film_persons_table);
        await sequelize.dbConnector.query(get_film_persons);
        await sequelize.dbConnector.query(insert_or_update_film_person);
        await sequelize.dbConnector.query(delete_film_person);

        await sequelize.dbConnector.query(create_films_table);
        await sequelize.dbConnector.query(get_films);
        await sequelize.dbConnector.query(insert_or_update_film);

        await sequelize.dbConnector.query(create_film_roles_table);
        await sequelize.dbConnector.query(get_film_roles);

        await sequelize.dbConnector.query(create_users_table);
        await sequelize.dbConnector.query(create_film_ratings_table);

        async function filmSeeder() {
            await sequelize.dbConnector.query(`
                INSERT INTO fm.films (title, release_year, genres, production_country, subordinated_to)
                VALUES
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
            `);
        }

        async function filmPersonSeeder() {
            await sequelize.dbConnector.query(`
                INSERT INTO fm.film_persons (name, date_of_birth, sex)
                VALUES
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
            `);
        }

        async function filmRoleSeeder() {
            await sequelize.dbConnector.query(`
                INSERT INTO fm.film_roles (film_id, person_id, roles)
                VALUES
                    (1, 1, '{"Director"}'),
                    (2, 1, '{"Director"}'),
                    (3, 1, '{"Director"}'),

                    (2, 2, '{"Actor"}'),
                    (3, 2, '{"Actor"}'),
                    (4, 2, '{"Actor"}'),

                    (1, 3, '{"Actor"}'),
                    (2, 3, '{"Actor"}'),
                    (4, 3, '{"Actor"}'),

                    (8, 7, '{"Actor"}'),
                    (9, 7, '{"Actor"}'),
                    (10, 7, '{"Actor"}'),

                    (5, 8, '{"Actor"}'),
                    (9, 8, '{"Actor"}'),
                    (10, 8, '{"Actor"}'),

                    (8, 6, '{"Director", "Producer", "Writer"}'),

                    (6, 4, '{"Actor"}'),

                    (6, 5, '{"Actor"}'),

                    (6, 9, '{"Director"}'),

                    (6, 10, '{"Writer"}'),

                    (7, 10, '{"Writer"}')
            `);
        }

        async function userSeeder() {
            await sequelize.dbConnector.query(`
                INSERT INTO fm.users (username)
                VALUES
                    ('user1'),
                    ('user2'),
                    ('user3'),
                    ('user4'),
                    ('user5');
            `);
        }

        async function filmRatingSeeder() {
            await sequelize.dbConnector.query(`
                INSERT INTO fm.film_ratings (user_id, film_id, rating)
                VALUES
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
            `);
        }

        filmSeeder();
        filmPersonSeeder();
        filmRoleSeeder();
        userSeeder();
        filmRatingSeeder();
    } catch(err) {
        console.error(err);
    }
}

init();
