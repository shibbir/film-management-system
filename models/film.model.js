const { DataTypes } = require("sequelize");

const sequelize = require("../src/config/sequelize");

const Film = sequelize.dbConnector.define("films", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(25)
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
    foreign_film_id: {
        type: DataTypes.UUID
    }
}, {
    schema: process.env.POSTGRES_DATABASE_SCHEMA,
    tableName: "films",
    timestamps: false
});

Film.hasOne(Film, { as: 'child_film', foreignKey: 'foreign_film_id' });
Film.belongsTo(Film, { as: 'parent_film', foreignKey: 'foreign_film_id' });

module.exports = Film;
