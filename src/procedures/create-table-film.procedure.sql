CREATE OR REPLACE PROCEDURE fm.create_table_films()
LANGUAGE 'plpgsql'
AS $BODY$
begin
CREATE TABLE IF NOT EXISTS fm.films
(
    id uuid NOT NULL,
    title varchar(25) NOT NULL,
    release_year integer NOT NULL,
    genres varchar(255)[],
    production_country varchar(30),
    foreign_film_id uuid,
    CONSTRAINT films_pkey PRIMARY KEY (id),
    CONSTRAINT films_title_key UNIQUE (title),
    CONSTRAINT films_foreign_film_id_fkey FOREIGN KEY (foreign_film_id)
        REFERENCES fm.films (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
end;
$BODY$;
