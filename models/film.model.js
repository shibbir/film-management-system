const { DataTypes } = require("sequelize");

const sequelize = require("../src/config/sequelize");

const Film = sequelize.dbConnector.define("films", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(30)
    },
    release_year: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    genres: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    production_country: {
        type: DataTypes.STRING(30)
    },
    subordinated_to: {
        type: DataTypes.INTEGER
    }
}, {
    schema: process.env.POSTGRES_DATABASE_SCHEMA,
    tableName: "films",
    timestamps: false
});

Film.hasOne(Film, { as: 'child_film', foreignKey: 'subordinated_to' });
Film.belongsTo(Film, { as: 'parent_film', foreignKey: 'subordinated_to' });

module.exports = Film;
