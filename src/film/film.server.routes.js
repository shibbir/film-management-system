const controller = require("./film.controller");

module.exports = function(app) {
    app.route("/api/films")
        .get(controller.getFilms)
        .post(controller.createFilm);

    app.route("/api/films/:id")
        .get(controller.getFilm)
        .patch(controller.updateFilm)
        .delete(controller.deleteFilm);

    app.route("/api/films/:id/roles")
        .get(controller.getFilmRoles);
};
