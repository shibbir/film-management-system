const { DataTypes } = require("sequelize");

const User = require("./user.model");
const Film = require("./film.model");
const sequelize = require("../src/config/sequelize");

const FilmRating = sequelize.dbConnector.define("film_ratings", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    rating: {
        allowNull: false,
        type: DataTypes.INTEGER
    }
}, {
    schema: process.env.POSTGRES_DATABASE_SCHEMA,
    tableName: "film_ratings",
    timestamps: false
});

User.hasMany(FilmRating, { as: 'flim_ratings', foreignKey: 'user_id' });
FilmRating.belongsTo(User, { as: 'user', foreignKey: 'user_id', allowNull: false });

FilmRating.belongsTo(Film, { as: 'film', foreignKey: 'film_id', allowNull: false });

module.exports = FilmRating;
