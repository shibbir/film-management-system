const create_film_roles_table = `
    CREATE TABLE IF NOT EXISTS fm.film_roles(
        id SERIAL PRIMARY KEY,
        role VARCHAR(30) NOT NULL,
        person_id INT NOT NULL,
        film_id INT NOT NULL
    )
`;

exports.create_film_roles_table = create_film_roles_table;
