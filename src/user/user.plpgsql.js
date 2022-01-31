const create_users_table = `
    CREATE TABLE IF NOT EXISTS fm.users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(25) NOT NULL UNIQUE
    )
`;

const create_film_ratings_table = `
    CREATE TABLE IF NOT EXISTS fm.film_ratings(
        id SERIAL PRIMARY KEY,
        rating NUMERIC NOT NULL,
        user_id INT,
        film_id INT,
        CONSTRAINT film_ratings_film_id_fkey FOREIGN KEY (film_id)
            REFERENCES fm.films (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE SET NULL,
        CONSTRAINT film_ratings_user_id_fkey FOREIGN KEY (user_id)
            REFERENCES fm.users (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE SET NULL
    )
`;

const get_film_ratings = `
    CREATE OR REPLACE FUNCTION fm.get_film_ratings(
        p_user_id INT,
        p_rating_id INT DEFAULT NULL
    )
    RETURNS table(
        id INT,
        user_id INT,
        film_id INT,
        rating NUMERIC,
        title VARCHAR,
        release_year INT,
        genres VARCHAR[],
        username VARCHAR
    )
    LANGUAGE plpgsql

    AS $$
    BEGIN

        IF p_user_id = 0 THEN
            RAISE not_null_violation USING MESSAGE = 'Invalid Username.';
        END IF;

        IF p_rating_id IS NULL THEN
            RETURN QUERY
                SELECT
                    t1.id,
                    t1.user_id,
                    t1.film_id,
                    t1.rating,
                    t2.title,
                    t2.release_year,
                    t2.genres,
                    t3.username
                FROM fm.film_ratings t1
                JOIN fm.films t2 ON t2.id = t1.film_id
                JOIN fm.users t3 ON t3.id = t1.user_id
                WHERE t1.user_id = p_user_id;
        ELSE
            RETURN QUERY
                SELECT
                    t1.id,
                    t1.user_id,
                    t1.film_id,
                    t1.rating,
                    t2.title,
                    t2.release_year,
                    t2.genres,
                    t3.username
                FROM fm.film_ratings t1
                JOIN fm.films t2 ON t2.id = t1.film_id
                JOIN fm.users t3 ON t3.id = t1.user_id
                WHERE t1.user_id = p_user_id AND t1.id = p_rating_id;
        END IF;

    END; $$;
`;

const insert_user = `
    CREATE OR REPLACE FUNCTION fm.insert_user(
        p_username VARCHAR
    )
    RETURNS SETOF fm.users
    LANGUAGE plpgsql

    AS $$

    DECLARE
        d_username VARCHAR := trim(p_username);

    BEGIN

        IF d_username = '' THEN
            RAISE not_null_violation USING MESSAGE = 'Name must not be empty.';
        END IF;

        IF NOT EXISTS (SELECT 1 FROM fm.users WHERE username = d_username) THEN
            INSERT INTO fm.users VALUES (DEFAULT, d_username);
        END IF;

        RETURN QUERY SELECT * FROM fm.users WHERE username = d_username;

    END; $$;
`;

const insert_or_update_film_rating = `
    CREATE OR REPLACE FUNCTION fm.insert_or_update_film_rating(
        p_user_id INT,
        p_film_id INT,
        p_rating NUMERIC,
        p_id INT DEFAULT NULL
    )
    RETURNS void
    LANGUAGE plpgsql

    AS $$

    BEGIN

        IF p_user_id <= 0 THEN
            RAISE not_null_violation USING MESSAGE = 'Username must not be empty.';
        END IF;

        IF p_film_id <= 0 THEN
            RAISE not_null_violation USING MESSAGE = 'Film must not be empty.';
        END IF;

        IF p_rating <= 0 THEN
            RAISE not_null_violation USING MESSAGE = 'Rating must not be empty.';
        END IF;

        IF p_id IS NULL THEN
            IF EXISTS (SELECT 1 FROM fm.film_ratings WHERE user_id = p_user_id AND film_id = p_film_id) THEN
                RAISE unique_violation USING MESSAGE = 'A rating already exists for the selected film. Please consider updating the previous rating or select a different film.';
            ELSE
                INSERT INTO fm.film_ratings (user_id, film_id, rating) VALUES (p_user_id, p_film_id, p_rating);
            END IF;
        ELSE
            UPDATE fm.film_ratings SET rating=p_rating WHERE id = p_id;
        END IF;

    END; $$;
`;

const delete_film_rating = `
    CREATE OR REPLACE FUNCTION fm.delete_film_rating(p_id INT)
    RETURNS void
    LANGUAGE plpgsql

    AS $$
    BEGIN

        DELETE FROM fm.film_ratings WHERE id = p_id;

    END; $$;
`;

const get_film_watch_suggestions = `
    CREATE OR REPLACE FUNCTION fm.get_film_watch_suggestions(p_user_id INT)
    RETURNS SETOF fm.films
    LANGUAGE plpgsql

    AS $$

    DECLARE
        d_genres VARCHAR[];

    BEGIN
        SELECT t1.genres INTO d_genres
        FROM fm.films t1
        JOIN fm.film_ratings t2 ON t2.film_id = t1.id
        WHERE t2.user_id = p_user_id AND t2.rating > 5;

        RETURN QUERY SELECT * FROM fm.films WHERE genres IN(d_genres);

    END; $$;
`;

exports.create_users_table = create_users_table;
exports.insert_user = insert_user;
exports.create_film_ratings_table = create_film_ratings_table;
exports.get_film_ratings = get_film_ratings;
exports.insert_or_update_film_rating = insert_or_update_film_rating;
exports.delete_film_rating = delete_film_rating;
exports.get_film_watch_suggestions = get_film_watch_suggestions;
