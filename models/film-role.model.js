const { DataTypes } = require("sequelize");

const sequelize = require("../src/config/sequelize");

const FilmRole = sequelize.dbConnector.define("film_roles", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING(30)
    },
    person_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    film_id: {
        allowNull: false,
        type: DataTypes.INTEGER
    }
}, {
    schema: "fm",
    tableName: "film_roles",
    timestamps: false
});

module.exports = FilmRole;
