CREATE OR REPLACE PROCEDURE fm.create_table_persons()
LANGUAGE 'plpgsql'
AS $BODY$
begin
CREATE TABLE IF NOT EXISTS fm.film_persons
(
    id uuid NOT NULL,
    name character varying(25) COLLATE pg_catalog."default" NOT NULL,
    date_of_birth date,
    sex character varying(10) COLLATE pg_catalog."default",
    CONSTRAINT film_persons_pkey PRIMARY KEY (id),
    CONSTRAINT film_persons_name_key UNIQUE (name)
);
end;
$BODY$;
