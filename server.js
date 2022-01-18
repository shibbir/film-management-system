require("dotenv").config();

const app = require("./src/config/express")();

app.listen(app.get("port"), function() {
    console.info(`Server running on port ${app.get("port")} in ${app.settings.env} mode...`);
});
