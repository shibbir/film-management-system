const { DataTypes } = require("sequelize");

const sequelize = require("../src/config/sequelize");

const User = sequelize.dbConnector.define("users", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    username: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(25)
    }
}, {
    schema: process.env.POSTGRES_DATABASE_SCHEMA,
    tableName: "users",
    timestamps: false
});

module.exports = User;
