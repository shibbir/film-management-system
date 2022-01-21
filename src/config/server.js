require("dotenv").config();

const app = require("./express")();

app.listen(app.get("port"), function() {
    console.info(`Server running on port ${app.get("port")} in ${app.settings.env} mode...`);
});
