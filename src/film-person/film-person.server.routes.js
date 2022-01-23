const controller = require("./film-person.controller");

module.exports = function(app) {
    app.route("/api/film-persons")
        .get(controller.getFilmPersons)
        .post(controller.createFilmPerson);

    app.route("/api/film-persons/:id")
        .get(controller.getFilmPerson)
        .patch(controller.updateFilmPerson)
        .delete(controller.removeFilmPerson);
};
