require("dotenv").config();

const app = require("./express")();

require("../film-person/film-person.server.routes")(app);

app.get("*", (req, res) => {
    if(req.xhr) return res.status(404).send("The resource you are looking for is not exists.");
    res.render("index");
});

app.listen(app.get("port"), function() {
    console.info(`Server running on port ${app.get("port")} in ${app.settings.env} mode...`);
});
