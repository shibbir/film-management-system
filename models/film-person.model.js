const { DataTypes } = require("sequelize");

const sequelize = require("../src/config/sequelize");

const Film = require("./film.model");

const Person = sequelize.dbConnector.define("film_persons", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(30)
    },
    date_of_birth: {
        type: DataTypes.DATEONLY
    },
    sex: {
        type: DataTypes.STRING(10)
    }
}, {
    schema: "fm",
    tableName: "film_persons",
    timestamps: false
});

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

module.exports = Person;
