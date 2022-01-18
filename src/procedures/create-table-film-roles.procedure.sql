CREATE OR REPLACE PROCEDURE fm.create_table_film_roles()
LANGUAGE 'plpgsql'
AS $BODY$
begin
CREATE TABLE IF NOT EXISTS fm.film_roles
(
    role varchar(30) NOT NULL,
    film_id uuid NOT NULL,
    person_id uuid NOT NULL,
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
end;
$BODY$;
