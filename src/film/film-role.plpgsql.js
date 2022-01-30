const create_film_roles_table = `
    CREATE TABLE IF NOT EXISTS fm.film_roles(
        film_id INT NOT NULL,
        person_id INT NOT NULL,
        roles VARCHAR(30)[] NOT NULL,
        CONSTRAINT film_roles_pkey PRIMARY KEY (film_id, person_id),
        CONSTRAINT film_roles_film_id_fkey FOREIGN KEY (film_id)
            REFERENCES fm.films (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE CASCADE,
        CONSTRAINT film_roles_person_id_fkey FOREIGN KEY (person_id)
            REFERENCES fm.film_persons (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE CASCADE
    )
`;

const get_film_roles = `
    CREATE OR REPLACE FUNCTION fm.get_film_roles(
        p_id INT
    )
    RETURNS SETOF fm.film_roles
    LANGUAGE plpgsql
    AS $$

    BEGIN

        RETURN QUERY SELECT * FROM fm.film_roles WHERE film_id = p_id;

    END; $$;
`;

exports.create_film_roles_table = create_film_roles_table;
exports.get_film_roles = get_film_roles;
