const create_film_persons_table = `
    CREATE TABLE IF NOT EXISTS fm.film_persons(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        date_of_birth DATE,
        sex VARCHAR(10)
    )
`;

const get_film_persons = `
    CREATE OR REPLACE FUNCTION fm.get_film_persons(
        p_id INT DEFAULT NULL
    )
    RETURNS SETOF fm.film_persons
    LANGUAGE plpgsql

    AS $$
    BEGIN

        IF p_id IS NULL THEN
            RETURN QUERY SELECT * FROM fm.film_persons;
        ELSE
            RETURN QUERY SELECT * FROM fm.film_persons WHERE id = p_id;
        END IF;

    END; $$;
`;

const insert_or_update_film_person = `
    CREATE OR REPLACE FUNCTION fm.insert_or_update_film_person(
        p_name VARCHAR,
        p_date_of_birth VARCHAR,
        p_sex VARCHAR,
        p_id INT DEFAULT NULL
    )
    RETURNS SETOF fm.film_persons
    LANGUAGE plpgsql

    AS $$

    DECLARE
        person_name VARCHAR := trim(p_name);
        person_dob VARCHAR := p_date_of_birth;
        person_sex VARCHAR := trim(p_sex);

    BEGIN

        IF person_name = '' THEN
            RAISE not_null_violation USING MESSAGE = 'Name must not be empty.';
        END IF;

        IF person_dob = '' THEN
            person_dob := null;
        END IF;

        IF p_id IS NULL THEN
            IF EXISTS (SELECT 1 FROM fm.film_persons WHERE name = person_name) THEN
                RAISE unique_violation USING MESSAGE = 'Person name already exists. Please try again with a different name.';
            ELSE
                INSERT INTO fm.film_persons VALUES (DEFAULT, person_name, person_dob::date, person_sex);
            END IF;
        ELSE
            IF EXISTS (SELECT 1 FROM fm.film_persons WHERE name = person_name AND id != p_id) THEN
                RAISE unique_violation USING MESSAGE = 'Person name already exists. Please try again with a different name.';
            ELSE
                UPDATE fm.film_persons SET name=person_name, date_of_birth=person_dob::DATE, sex=person_sex WHERE id = p_id;
            END IF;
        END IF;

        RETURN QUERY SELECT * FROM fm.film_persons WHERE name = person_name;

    END; $$;
`;

const delete_film_person = `
    CREATE OR REPLACE FUNCTION fm.delete_film_person(p_id INT)
    RETURNS void
    LANGUAGE plpgsql

    AS $$
    BEGIN

        IF NOT EXISTS (SELECT 1 FROM fm.film_persons WHERE id = p_id) THEN
            RAISE EXCEPTION 'Person not found.';
        END IF;

        DELETE FROM fm.film_persons WHERE id = p_id;

        DELETE FROM fm.film_roles WHERE person_id = p_id;

    END; $$;
`;

exports.get_film_persons = get_film_persons;
exports.create_film_persons_table = create_film_persons_table;
exports.insert_or_update_film_person = insert_or_update_film_person;
exports.delete_film_person = delete_film_person;
