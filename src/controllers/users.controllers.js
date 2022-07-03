const logger = require("../btcs").logger;
const {
    findUserById,
    findAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
} = require("../services/users.service");

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await findUserById(id);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            user,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/getClassById] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.getAllUsers = async (req, res) => {
    logger.info(req.params, `[btcs][controllers/api/getAllUsers] Request:`);
    try {
        const users = await findAllUsers();
        console.log("users: ", users);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            users,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/getAllUsers] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.createNewUser = async (req, res) => {
    try {
        // TODO: Validate data request

        const user_req = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        };

        const user = await createNewUser(user_req);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            user,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/createNewUser] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        // TODO: Validate data request

        const user_req = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        };
        const user = await updateUser(user_req);

        if (user === null) {
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
            user,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/getAllUsers] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await deleteUser(id);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            user,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/deleteUser] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};
