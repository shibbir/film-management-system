const create_film_ratings_table = `
    CREATE TABLE IF NOT EXISTS fm.film_ratings(
        id SERIAL PRIMARY KEY,
        rating INT NOT NULL,
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

exports.create_film_ratings_table = create_film_ratings_table;
