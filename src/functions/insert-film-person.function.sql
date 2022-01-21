CREATE OR REPLACE FUNCTION fm.insert_film_person(
    INOUT name varchar,
    INOUT date_of_birth date,
    INOUT sex varchar)
    RETURNS record
    LANGUAGE 'plpgsql'

AS $BODY$
BEGIN

INSERT INTO fm.film_persons VALUES (DEFAULT, name, date_of_birth, sex);

END;
$BODY$;
