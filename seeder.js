async function init() {
    require("dotenv").config();
    const sequelize = require("./src/config/sequelize");

    try {
        await sequelize.dbConnector.query("CREATE SCHEMA IF NOT EXISTS fm");
        await sequelize.dbConnector.query("DROP SCHEMA fm CASCADE");
        await sequelize.dbConnector.query("CREATE SCHEMA IF NOT EXISTS fm");

        const {
            create_film_persons_table,
            seed_film_persons,
            get_film_persons,
            insert_or_update_film_person,
            delete_film_person
        } = require("./src/film-person/film-person.plpgsql");

        const {
            create_films_table,
            seed_films,
            get_films,
            insert_or_update_film,
            delete_film
        } = require("./src/film/film.plpgsql");

        const {
            create_film_roles_table,
            seed_film_roles,
            get_film_roles
        } = require("./src/film/film-role.plpgsql");

        const {
            create_users_table,
            create_film_ratings_table,
            seed_users,
            seed_film_ratings,
            insert_user,
            get_film_ratings,
            insert_or_update_film_rating,
            delete_film_rating,
            get_film_watch_suggestions
        } = require("./src/user/user.plpgsql");

        await sequelize.dbConnector.query(create_film_persons_table);
        await sequelize.dbConnector.query(create_films_table);
        await sequelize.dbConnector.query(create_film_roles_table);
        await sequelize.dbConnector.query(create_users_table);
        await sequelize.dbConnector.query(create_film_ratings_table);

        await sequelize.dbConnector.query("SELECT fm.create_film_persons_table()");
        await sequelize.dbConnector.query("SELECT fm.create_films_table()");
        await sequelize.dbConnector.query("SELECT fm.create_film_roles_table()");
        await sequelize.dbConnector.query("SELECT fm.create_users_table()");
        await sequelize.dbConnector.query("SELECT fm.create_film_ratings_table()");

        await sequelize.dbConnector.query(seed_film_persons);
        await sequelize.dbConnector.query(seed_films);
        await sequelize.dbConnector.query(seed_film_roles);
        await sequelize.dbConnector.query(seed_users);
        await sequelize.dbConnector.query(seed_film_ratings);

        await sequelize.dbConnector.query("SELECT fm.seed_film_persons()");
        await sequelize.dbConnector.query("SELECT fm.seed_films()");
        await sequelize.dbConnector.query("SELECT fm.seed_film_roles()");
        await sequelize.dbConnector.query("SELECT fm.seed_users()");
        await sequelize.dbConnector.query("SELECT fm.seed_film_ratings()");

        await sequelize.dbConnector.query(get_film_persons);
        await sequelize.dbConnector.query(insert_or_update_film_person);
        await sequelize.dbConnector.query(delete_film_person);

        await sequelize.dbConnector.query(get_films);
        await sequelize.dbConnector.query(insert_or_update_film);
        await sequelize.dbConnector.query(delete_film);

        await sequelize.dbConnector.query(get_film_roles);

        await sequelize.dbConnector.query(insert_user);
        await sequelize.dbConnector.query(get_film_ratings);
        await sequelize.dbConnector.query(insert_or_update_film_rating);
        await sequelize.dbConnector.query(delete_film_rating);
        await sequelize.dbConnector.query(get_film_watch_suggestions);
    } catch(err) {
        console.error(err);
    }
}

init();
