const create_films_table = `
    CREATE TABLE IF NOT EXISTS fm.films(
        id SERIAL PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        release_year INT NOT NULL,
        genres varchar(20)[] NOT NULL,
        production_country VARCHAR(30),
        subordinated_to INT,
        CONSTRAINT films_subordinated_to_fkey FOREIGN KEY (subordinated_to)
            REFERENCES fm.films (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE CASCADE
    )
`;

const seed_films = `
    CREATE OR REPLACE FUNCTION fm.seed_films()
    RETURNS void
    LANGUAGE plpgsql
    AS $$

    BEGIN
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
    END; $$;
`;

const get_films = `
    CREATE OR REPLACE FUNCTION fm.get_films(
        p_id INT DEFAULT NULL
    )
    RETURNS table(
        id INT,
        title VARCHAR,
        release_year INT,
        genres VARCHAR[],
        production_country VARCHAR,
        subordinated_to INT,
        subordinated_to_title VARCHAR
    )
    LANGUAGE plpgsql
    AS $$

    BEGIN

        IF p_id IS NULL THEN
            RETURN QUERY
                SELECT t1.*, t2.title as "subordinated_to_title"
                FROM fm.films t2
                RIGHT JOIN fm.films t1
                ON t1.subordinated_to = t2.id
                ORDER BY t1.release_year;
        ELSE
            RETURN QUERY
                SELECT t1.*, t2.title as "subordinated_to_title"
                FROM fm.films t2
                RIGHT JOIN fm.films t1
                ON t1.subordinated_to = t2.id
                WHERE t1.id = p_id
                ORDER BY t1.release_year;
        END IF;

    END; $$;
`;

const insert_or_update_film = `
    CREATE OR REPLACE FUNCTION fm.insert_or_update_film(
        p_title VARCHAR,
        p_release_year INT,
        p_genres VARCHAR,
        p_production_country VARCHAR,
        p_subordinated_to INT,
        p_film_roles JSONB,
        p_id INT DEFAULT NULL
    )
    RETURNS void
    LANGUAGE plpgsql

    AS $$

    DECLARE
        d_title VARCHAR := trim(p_title);
        d_release_year INT := p_release_year;
        d_genres VARCHAR[] := string_to_array(p_genres, ',');
        d_production_country VARCHAR := trim(p_production_country);
        d_subordinated_to INT := p_subordinated_to;
        temp_subordinated_to INT := p_subordinated_to;
        temp_table RECORD;
        i JSONB;
        d_id INT := p_id;

    BEGIN

        IF d_title = '' THEN
            RAISE not_null_violation USING MESSAGE = 'Title must not be empty.';
        END IF;

        IF d_release_year = 0 THEN
            RAISE not_null_violation USING MESSAGE = 'Release year must not be empty.';
        END IF;

        IF p_genres = '' THEN
            RAISE not_null_violation USING MESSAGE = 'At least one genre must be selected.';
        END IF;

        IF d_production_country = '' THEN
            d_production_country := NULL;
        END IF;

        IF d_subordinated_to = 0 THEN
            d_subordinated_to := NULL;
            temp_subordinated_to := NULL;
        END IF;

        IF d_id IS NOT NULL AND d_subordinated_to IS NOT NULL THEN
            SELECT * INTO temp_table FROM fm.films WHERE id = d_subordinated_to;
            IF temp_table.subordinated_to = d_id OR temp_table.id = d_id THEN
                RAISE EXCEPTION 'No cycles or self references are allowed.';
            END IF;
        END IF;

        LOOP
            EXIT WHEN temp_subordinated_to IS NULL;

            SELECT * INTO temp_table FROM fm.films WHERE id = temp_subordinated_to;

            IF temp_table.title = d_title OR temp_table.release_year = d_release_year THEN
                RAISE unique_violation USING MESSAGE = 'Title and release year must be unique within the current group.';
            END IF;

            temp_subordinated_to := temp_table.subordinated_to;
        END LOOP;

        IF d_id IS NULL THEN
            INSERT INTO fm.films(id, title, release_year, genres, production_country, subordinated_to)
                VALUES (DEFAULT, d_title, d_release_year, d_genres, d_production_country, d_subordinated_to) RETURNING id INTO d_id;
        ELSE
            UPDATE fm.films SET title=d_title, release_year=d_release_year, genres=d_genres, production_country=d_production_country, subordinated_to=d_subordinated_to WHERE id = d_id;
        END IF;

        DELETE FROM fm.film_roles WHERE film_id = d_id;

        FOR i IN SELECT * FROM jsonb_array_elements_text(p_film_roles) LOOP
            INSERT INTO fm.film_roles(film_id, person_id, roles) VALUES (
                d_id,
                (i->>'person_id')::INT,
                translate((i->>'roles')::JSONB::VARCHAR, '[]','{}')::VARCHAR[]
            );
        END LOOP;

    END; $$;
`;

const delete_film = `
    CREATE OR REPLACE FUNCTION fm.delete_film(p_id INT)
    RETURNS void
    LANGUAGE plpgsql

    AS $$
    BEGIN

        IF NOT EXISTS (SELECT 1 FROM fm.films WHERE id = p_id) THEN
            RAISE EXCEPTION 'Film not found.';
        END IF;

        DELETE FROM fm.films WHERE id = p_id OR subordinated_to = p_id;

    END; $$;
`;

exports.create_films_table = create_films_table;
exports.seed_films = seed_films;
exports.get_films = get_films;
exports.insert_or_update_film = insert_or_update_film;
exports.delete_film = delete_film;
