const path = require("path");
const pino = require("pino");
const { multistream } = require("pino-multi-stream");
const rfs = require("rotating-file-stream");

const axios = require("axios");

const dotenv = require("dotenv-flow");

const Sequelize = require("sequelize");

const fs = require("fs");

let isLambda = require("is-lambda");

dotenv.config();

const LOG_LEVEL = process.env.LOG_LEVEL || "info";

if (!process.env.RDS_DB_NAME) {
    console.log("Error: Missing database name!");
    process.exit(1);
}

if (!process.env.RDS_HOSTNAME) {
    console.log("Error: Missing database host!");
    process.exit(1);
}

if (!process.env.RDS_USERNAME) {
    console.log("Error: Missing database username!");
    process.exit(1);
}

if (!process.env.RDS_PORT) {
    process.env.RDS_PORT = 5432;
}

// Initialize logger
let logger = {};

if (isLambda) {
    // Just simple log under serverless environment, aws lambda will send log to cloudwatch
    logger = pino({
        name: "btc-studio",
        prettyPrint: {
            levelFirst: true,
            translateTime: true,
        },
        level: LOG_LEVEL,
    });
} else {
    // Under server environment
    let appLogStream = rfs.createStream("app.log", {
        interval: "1d",
        path: path.join(__dirname, "../logs"),
        compress: true,
        maxFiles: 10,
    });

    let streams = [
        { level: "debug", stream: process.stdout }, // default log level is info, if level is not assigned
        { stream: appLogStream },
    ];

    logger = pino(
        {
            name: "btc-studio",
            transport: {
                target: "pino-pretty",
                options: {
                    colorize: true,
                },
            },
            level: LOG_LEVEL,
        },
        multistream(streams)
    );
}

// Initialize Database connection
const sequelize = new Sequelize(
    process.env.RDS_DB_NAME,
    process.env.RDS_USERNAME,
    process.env.RDS_PASSWORD,
    {
        host: process.env.RDS_HOSTNAME,
        port: process.env.RDS_PORT,
        dialect: "postgres",
        logging: (msg) => logger.debug(msg),
        logging: console.log,
    }
);

async function connect() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

module.exports = {
    logger: logger,
    sequelize: sequelize,
    axios: axios,
    connect,
};
