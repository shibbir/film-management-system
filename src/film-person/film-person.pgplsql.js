const create_film_persons_table = `
    CREATE TABLE IF NOT EXISTS fm.film_persons(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        date_of_birth DATE,
        sex VARCHAR(10)
    )
`;

const insert_film_person = `
    CREATE OR REPLACE FUNCTION fm.insert_film_person(
        p_name varchar,
        p_date_of_birth varchar,
        p_sex varchar
    )
    RETURNS SETOF fm.film_persons
    LANGUAGE plpgsql

    AS $$

    DECLARE
        person_name varchar := trim(p_name);
        person_dob varchar := p_date_of_birth;
        person_sex varchar := trim(p_sex);

    BEGIN

        IF person_name = '' THEN
            RAISE EXCEPTION 'Name must not be empty.';
        END IF;

        IF EXISTS (SELECT 1 FROM fm.film_persons WHERE name = person_name) THEN
            RAISE unique_violation USING MESSAGE = 'Person name already exists. Please try again with a different name.';
        END IF;

        IF person_dob = '' THEN
            person_dob := null;
        END IF;

        INSERT INTO fm.film_persons VALUES (DEFAULT, person_name, person_dob::date, person_sex);
        RETURN QUERY SELECT * FROM fm.film_persons WHERE name = person_name;

    END; $$;
`;

const get_film_persons = `
    CREATE OR REPLACE FUNCTION fm.get_film_persons(
        person_id int default null
    )
    RETURNS SETOF fm.film_persons
    LANGUAGE plpgsql

    AS $$
    BEGIN

        IF person_id IS NULL THEN
            RETURN QUERY SELECT * FROM fm.film_persons;
        ELSE
            RETURN QUERY SELECT * FROM fm.film_persons WHERE id = person_id;
        END IF;

    END; $$;
`;

exports.create_film_persons_table = create_film_persons_table;
exports.insert_film_person = insert_film_person;
exports.get_film_persons = get_film_persons;
