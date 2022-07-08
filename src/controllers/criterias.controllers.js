const logger = require("../btcs").logger;
const {
    findCriteriaById,
    findAllCriterias,
    createNewCriteria,
    updateCriteria,
    deleteCriteria,
} = require("../services/criterias.service");

exports.getCriteriaById = async (req, res) => {
    try {
        const id = req.params.id;
        const criteria = await findCriteriaById(id);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            criteria,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/getCriteriaById] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.getAllCriterias = async (req, res) => {
    logger.info(req.params, `[btcs][controllers/api/getAllCriterias] Request:`);
    try {
        const criterias = await findAllCriterias();
        console.log("criterias: ", criterias);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            criterias,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/getAllCriterias] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.createNewCriteria = async (req, res) => {
    logger.info(
        req.params,
        `[btcs][controllers/api/createNewCriteria] Request:`
    );
    try {
        // TODO: Validate data request

        const criteria_req = {
            id: req.body.id,
            created_by: req.body.created_by,
            description: req.body.description,
        };

        const criteria = await createNewCriteria(criteria_req);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            criteria,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/createNewCriteria] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.updateCriteria = async (req, res) => {
    try {
        // TODO: Validate data request

        const criteria_req = {
            id: req.body.id,
            description: req.body.description,
        };
        const criteria = await updateCriteria(criteria_req);

        if (criteria === null) {
            return res.status(404).json({
                success: false,
                message: "CRITERIA_NOT_FOUND_ERROR",
                error: 404,
                data: null,
            });
        }

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            criteria,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/updateCriteria] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.deleteCriteria = async (req, res) => {
    try {
        const id = req.params.id;
        const criteria = await deleteCriteria(id);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            criteria,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/deleteCriteria] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};
