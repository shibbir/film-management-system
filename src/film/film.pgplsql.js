const create_films_table = `
    CREATE TABLE IF NOT EXISTS fm.films(
        id SERIAL PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        release_year INT NOT NULL,
        genres varchar(20)[],
        production_country VARCHAR(30),
        subordinated_to INT,
        CONSTRAINT films_subordinated_to_fkey FOREIGN KEY (subordinated_to)
            REFERENCES fm.films (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE CASCADE
    )
`;

const get_films = `
    CREATE OR REPLACE FUNCTION fm.get_films(
        p_id INT DEFAULT null
    )
    RETURNS table(
        id INT,
        title VARCHAR(50),
        release_year INT,
        genres VARCHAR(30)[],
        production_country VARCHAR(30),
        subordinated_to INT,
        subordinated_to_title VARCHAR(30)
    )
    LANGUAGE plpgsql
    AS $$

    BEGIN

        IF p_id IS NULL THEN
            RETURN QUERY
                SELECT t1.*, t2.title as "subordinated_to_title"
                FROM fm.films t2
                RIGHT JOIN fm.films t1
                ON t1.subordinated_to = t2.id;
        ELSE
            RETURN QUERY
                SELECT t1.*, t2.title as "subordinated_to_title"
                FROM fm.films t2
                RIGHT JOIN fm.films t1
                ON t1.subordinated_to = t2.id
                WHERE t1.id = p_id;
        END IF;

    END; $$;
`;

const insert_or_update_film = `
    CREATE OR REPLACE FUNCTION fm.insert_or_update_film(
        p_title VARCHAR,
        p_release_year VARCHAR,
        p_genres JSON,
        p_production_country VARCHAR,
        p_subordinated_to VARCHAR,
        p_id INT DEFAULT NULL
    )
    RETURNS SETOF fm.films
    LANGUAGE plpgsql

    AS $$

    DECLARE
        d_title VARCHAR := trim(p_title);
        d_release_year INT;
        d_genres VARCHAR[];
        d_production_country VARCHAR := trim(p_production_country);
        temp_subordinated_to INT;
        temp_table RECORD;

    BEGIN

        IF d_title = '' THEN
            RAISE not_null_violation USING MESSAGE = 'Title must not be empty.';
        END IF;

        IF p_release_year = '' THEN
            RAISE not_null_violation USING MESSAGE = 'Release year must not be empty.';
        END IF;

        IF p_genres = '' THEN
            RAISE not_null_violation USING MESSAGE = 'At least one genre must be selected.';
        ELSE
            d_genres := array_agg(json_array_elements_text(p_genres));
        END IF;

        IF p_subordinated_to = '' THEN
            p_subordinated_to := NULL;
            temp_subordinated_to := NULL;
        ELSE
            temp_subordinated_to := p_subordinated_to::INT;
        END IF;

        d_release_year := p_release_year::INT;

        LOOP
            EXIT WHEN temp_subordinated_to IS NULL;

            SELECT * INTO temp_table FROM fm.films WHERE id = temp_subordinated_to;

            IF temp_table.title = d_title OR temp_table.release_year = d_release_year THEN
                RAISE unique_violation USING MESSAGE = 'Title and release year must be unique within the current group.';
            END IF;

            temp_subordinated_to := temp_table.subordinated_to;
        END LOOP;

        IF p_id IS NULL THEN
            INSERT INTO fm.films(id, title, release_year, genres, production_country, subordinated_to)
                VALUES (DEFAULT, d_title, d_release_year, d_genres, d_production_country, 2015);
        ELSE
            IF p_subordinated_to IS NOT NULL THEN
                SELECT * INTO temp_table FROM fm.films WHERE id = p_subordinated_to;
                IF temp_table.subordinated_to = p_id OR temp_table.id = p_id THEN
                    RAISE EXCEPTION 'No cycles or self references are allowed.';
                END IF;
            END IF;
            UPDATE fm.films SET title=d_title, release_year=d_release_year, genres=d_genres, production_country=d_production_country, subordinated_to=p_subordinated_to WHERE id = p_id;
        END IF;

        RETURN QUERY SELECT * FROM fm.films WHERE title = d_title;

    END; $$;
`;

exports.create_films_table = create_films_table;
exports.get_films = get_films;
exports.insert_or_update_film = insert_or_update_film;
