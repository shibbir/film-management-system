const controller = require("./film-person.controller");
// const { validateBody, validateParams } = require("../core/validator.middleware");
// const { registrationSchema, idSchema, updateSchema } = require("./user.schema");

module.exports = function(app) {
    app.route("/api/film-persons")
        .get(controller.getFilmPersons)
        //.post(validateBody(registrationSchema), controller.createUser);

    // app.route("/api/film-persons/:id")
    //     .get(validateParams(idSchema), controller.getUser)
    //     .patch(validateParams(idSchema), validateBody(updateSchema), controller.updateUser)
    //     .delete(validateParams(idSchema), controller.deleteUser);
};
