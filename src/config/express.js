const path = require("path");
const glob = require("glob");
const express = require("express");
const hbs = require("express-hbs");

const assets = {
    css: process.env.NODE_ENV === "production" ? "wwwroot/bundles/app*.css" : "wwwroot/bundles/app.css",
    js: process.env.NODE_ENV === "production" ? "wwwroot/bundles/app*.js" : "wwwroot/bundles/app.js"
};

module.exports = function() {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(process.cwd(), "wwwroot")));

    app.engine("html", hbs.express4({ extname: ".html" }));
    app.set("view engine", "html");
    app.set("views", path.join(process.cwd(), "src/core"));

    app.set("port", process.env.PORT);

    app.locals.jsFiles = glob.sync(assets.js).map(filePath => filePath.replace("wwwroot/", ""));
    app.locals.cssFiles = glob.sync(assets.css).map(filePath => filePath.replace("wwwroot/", ""));

    return app;
};
