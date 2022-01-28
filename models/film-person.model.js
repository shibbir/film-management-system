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

module.exports = Person;
