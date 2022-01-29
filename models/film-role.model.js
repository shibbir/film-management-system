const { DataTypes } = require("sequelize");

const sequelize = require("../src/config/sequelize");

const Film = require("./film.model");
const Person = require("./film-person.model");

const FilmRole = sequelize.dbConnector.define("film_roles", {
    roles: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING)
    }
}, {
    schema: "fm",
    tableName: "film_roles",
    timestamps: false
});

Film.belongsToMany(Person, { as: "persons", through: FilmRole, foreignKey: "film_id" });
Person.belongsToMany(Film, { as: "films", through: FilmRole, foreignKey: "person_id" });

module.exports = FilmRole;
