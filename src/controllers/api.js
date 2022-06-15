const Uon = require('../uon.js');
const { check, checkSchema, body, validationResult } = require('express-validator');
const axios = require('axios');
const dotenv = require('dotenv-flow');

const Sequelize = Uon.sequelize;
const QueryTypes = Sequelize.QueryTypes;

const logger = Uon.logger;

exports.status = async (req, res, next) => {
    logger.info(req.params, `[uon][controllers/api/status] Request:`);

    res.status(200).json({
        status: 'success',
        result: ""
    });
}