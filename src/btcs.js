const path = require("path");
const pino = require("pino");
const rfs = require("rotating-file-stream");
const { multistream } = require("pino-multi-stream");

const axios = require("axios");

const dotenv = require("dotenv-flow");

const fs = require("fs");

let isLambda = require("is-lambda");

dotenv.config();

const LOG_LEVEL = process.env.LOG_LEVEL || "info";

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

module.exports = {
    logger: logger,
    axios: axios,
};
