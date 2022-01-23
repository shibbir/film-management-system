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

exports.create_films_table = create_films_table;
