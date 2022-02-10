# Film Manager
> A single page application for managing films, film related persons and film ratings.

## Development Environment Setup
- [Install Node.js >= 14.5](https://nodejs.org/en/)
- [Install PostgreSQL >= 12.0](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- After installing PostgreSQL, create a database named `film_manager`

## Configuring Environment Variables
> By default, this project comes with a pre-configured .env file. Feel free to adjust the values if needed. Details of each environment variables are below:

Name | Is Mandatory | Default Value | Description
------------ | ------------- | ------------- | -------------
PORT | Yes | `6060` | On which port the web server will run
POSTGRES_CONNECTION_STRING | Yes | `postgres://postgres:root@localhost:5432` | PostgreSQL connection string. Learn more from [here](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
POSTGRES_DATABASE | Yes | `film_manager` | PostgreSQL database name

## NPM Scripts
> First, open your favorite terminal or command prompt and navigate to the project root directory. After that, execute from the below scripts as necessary:

```bash
# To install the npm packages
$ npm install

# To drop and re-create the schema, tables, and PL/pgSQL functions
$ npm run seed

# To start the development build with the watch mode
$ npm start

# To run the production build without the watch mode
$ npm run production

# To stop the application running in background after a production run. Since in production mode the application will be running in background.
$ npm run stop
```

## License
<a href="https://opensource.org/licenses/MIT">The MIT License</a>
