const Btcs = require("../btcs.js");
const database = require("../commons/database/database");

const Sequelize = database.sequelize;
const QueryTypes = Sequelize.QueryTypes;

const logger = Btcs.logger;

exports.status = async (req, res, next) => {
    logger.info(req.params, `[btcs][controllers/api/status] Request:`);

    res.status(200).json({
        status: "success",
        result: "",
    });
};
