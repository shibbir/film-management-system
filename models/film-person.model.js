const { DataTypes } = require("sequelize");

const sequelize = require("../src/config/sequelize");

const Person = sequelize.dbConnector.define("film_persons", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(25)
    },
    date_of_birth: {
        type: DataTypes.DATEONLY
    },
    sex: {
        type: DataTypes.STRING(10)
    }
}, {
    schema: process.env.POSTGRES_DATABASE_SCHEMA,
    tableName: "film_persons",
    timestamps: false
});

module.exports = Person;
