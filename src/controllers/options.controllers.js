const logger = require("../btcs").logger;
const {
    findOptionById,
    findAllOptions,
    createNewOption,
    updateOption,
    deleteOption,
} = require("../services/options.service");

exports.getOptionById = async (req, res) => {
    try {
        const id = req.params.id;
        const option = await findOptionById(id);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            option,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/getOptionById] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.getAllOptions = async (req, res) => {
    logger.info(req.params, `[btcs][controllers/api/getAllOptions] Request:`);
    try {
        const options = await findAllOptions();
        console.log("options: ", options);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            options,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/getAllOptions] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.createNewOption = async (req, res) => {
    logger.info(req.params, `[btcs][controllers/api/createNewOption] Request:`);
    try {
        // TODO: Validate data request

        const option_req = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            user_ids: req.body.criteria_ids,
            created_by: req.body.created_by,
        };

        const option = await createNewOption(option_req);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            option,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/createNewOption] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.updateOption = async (req, res) => {
    try {
        // TODO: Validate data request

        const option_req = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            user_ids: req.body.criteria_ids,
        };
        const option = await updateOption(option_req);

        if (option === null) {
            res.status(404).json({
                success: false,
                message: "USER_NOT_FOUND_ERROR",
                error: 404,
                data: null,
            });
        }

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            option,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/updateOption] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.deleteOption = async (req, res) => {
    try {
        const id = req.params.id;
        const option = await deleteOption(id);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            option,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/deleteOption] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};
