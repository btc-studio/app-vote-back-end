const logger = require("../btcs").logger;
const {
    findUserOptionById,
    findAllUserOptions,
    createNewUserOption,
    updateUserOption,
    deleteUserOption,
} = require("../services/user_options.service");

exports.getUserOptionById = async (req, res) => {
    try {
        const id = req.params.id;
        const user_option = await findUserOptionById(id);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            user_option,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/getUserOptionById] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.getAllUserOptions = async (req, res) => {
    logger.info(
        req.params,
        `[btcs][controllers/api/getAllUserOptions] Request:`
    );
    try {
        const user_options = await findAllUserOptions();
        console.log("user_options: ", user_options);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            user_options,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/getAllUserOptions] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.createNewUserOption = async (req, res) => {
    logger.info(
        req.params,
        `[btcs][controllers/api/createNewUserOption] Request:`
    );
    try {
        // TODO: Validate data request

        const option_req = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            user_ids: req.body.user_ids,
            created_by: req.body.created_by,
        };

        const option = await createNewUserOption(option_req);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            option,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/createNewUserOption] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.updateUserOption = async (req, res) => {
    try {
        // TODO: Validate data request

        const option_req = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            user_ids: req.body.criteria_ids,
        };
        const option = await updateUserOption(option_req);

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
            `[btcs][controllers/api/updateUserOption] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.deleteUserOption = async (req, res) => {
    try {
        const id = req.params.id;
        const option = await deleteUserOption(id);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            option,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/deleteUserOption] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};
