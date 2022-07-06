const Btcs = require("./btcs");
const database = require("./commons/database/database");

const express = require("express");
require("express-async-errors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const expressPino = require("express-pino-logger");
const cors = require("cors");
const routes = require("./routes");
const user_routes = require("./routes/users.routes");
const criteria_routes = require("./routes/criterias.routes");
const poll_routes = require("./routes/polls.routes");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const logger = Btcs.logger;
var path = require("path");

const app = express();

const expressLogger = expressPino({ logger });

database.connect(); // Connect to DB

const corsOptions = {
    origin: true,
    methods: ["GET", "POST"],
};

// Detect terminate events
process.on("SIGTERM", function () {
    logger.info("[btcs][app] Receive SIGTERM!");
    database.sequelize.close();
    process.exit(0);
});

process.on("SIGINT", function () {
    logger.info("[btcs][app] Receive SIGINT!");
    database.sequelize.close();
    process.exit(0);
});

//define static folder
app.use(express.static(path.join(__dirname, "../public")));

global.__basedir = __dirname;

const options = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "BTC Studio API",
            description: "BTC Studio Api Service",
            contact: {
                name: "BTCS Developer",
            },
            servers: ["http://localhost:3000"],
        },
    },
    apis: ["./src/routes/*"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.disable("x-powered-by")
    .use(helmet())
    .use(expressLogger)
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json({ limit: "5mb" }))
    .use(cors(corsOptions))
    .use("/", routes);

// Import routes
app.use("/", user_routes).use("/", criteria_routes).use("/", poll_routes);

app.get("/", function (req, res) {
    res.send("Welcome to BTC Studio Back-end Api v1.0.0");
});

module.exports = app;
