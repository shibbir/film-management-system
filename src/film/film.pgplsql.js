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
        film_id int default null
    )
    RETURNS SETOF fm.films
    LANGUAGE plpgsql

    AS $$
    BEGIN

        IF film_id IS NULL THEN
            RETURN QUERY SELECT * FROM fm.films;
        ELSE
            RETURN QUERY SELECT * FROM fm.films WHERE id = film_id;
        END IF;

    END; $$;
`;

exports.create_films_table = create_films_table;
exports.get_films = get_films;
