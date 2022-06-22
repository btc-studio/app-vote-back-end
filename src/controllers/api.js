const Btcs = require("../btcs.js");
const {
    check,
    checkSchema,
    body,
    validationResult,
} = require("express-validator");
const axios = require("axios");
const dotenv = require("dotenv-flow");

const Sequelize = Btcs.sequelize;
const QueryTypes = Sequelize.QueryTypes;

const logger = Btcs.logger;

exports.status = async (req, res, next) => {
    logger.info(req.params, `[btcs][controllers/api/status] Request:`);

    res.status(200).json({
        status: "success",
        result: "",
    });
};
