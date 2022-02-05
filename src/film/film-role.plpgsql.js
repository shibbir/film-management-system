const create_film_roles_table = `
    CREATE OR REPLACE FUNCTION fm.create_film_roles_table()
    RETURNS void
    LANGUAGE plpgsql
    AS $$
    BEGIN
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
        );
    END; $$;
`;

const seed_film_roles = `
    CREATE OR REPLACE FUNCTION fm.seed_film_roles()
    RETURNS void
    LANGUAGE plpgsql
    AS $$

    BEGIN
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

            (7, 10, '{"Writer"}');
    END; $$;
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
exports.seed_film_roles = seed_film_roles;
exports.get_film_roles = get_film_roles;
