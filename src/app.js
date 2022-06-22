const Btcs = require("./btcs.js");

const express = require("express");
require("express-async-errors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const expressPino = require("express-pino-logger");
const cors = require("cors");
const routes = require("./routes");

const logger = Btcs.logger;
var path = require("path");

const app = express();

const expressLogger = expressPino({ logger });

Btcs.connect(); // Connect to DB

const corsOptions = {
    origin: true,
    methods: ["GET", "POST"],
};

// Detect terminate events
process.on("SIGTERM", function () {
    logger.info("[btcs][app] Receive SIGTERM!");
    Btcs.sequelize.close();
    process.exit(0);
});

process.on("SIGINT", function () {
    logger.info("[btcs][app] Receive SIGINT!");
    Btcs.sequelize.close();
    process.exit(0);
});

//define static folder
app.use(express.static(path.join(__dirname, "../public")));

global.__basedir = __dirname;

app.disable("x-powered-by")
    .use(helmet())
    .use(expressLogger)
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json({ limit: "5mb" }))
    .use(cors(corsOptions))
    .use("/", routes);

app.get("/", function (req, res) {
    res.send("Welcome to BTC Studio Back-end Api v1.0.0");
});

module.exports = app;
