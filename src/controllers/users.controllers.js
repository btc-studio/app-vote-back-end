const logger = require("../btcs").logger;
const { findUserById, findAllUsers } = require("../services/users.service");

exports.getUserById = async (req, res) => {
    //logger.info(req.params, `[uon][controllers/api/getUserById] Request:`);
    try {
        const user_id = req.params.user_id;
        console.log(`user_id ${user_id}`);
        const user = await findUserById(user_id);
        console.log("user: ", user);

        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({
                message: `Cannot find user with user_id=${user_id} `,
            });
        }
    } catch (error) {
        logger.error(
            { err: error },
            `[uon][controllers/api/getClassById] Error:`
        );
        res.status(400).json({
            status: "failed",
            errors: [error.message],
        });
    }
};

exports.getAllUsers = async (req, res) => {
    logger.info(req.params, `[uon][controllers/api/getAllUsers] Request:`);
    try {
        const users = await findAllUsers();
        console.log("users: ", users);

        if (users) {
            res.status(200).send(users);
        } else {
            res.status(404).send({
                message: `Cannot find users`,
            });
        }
    } catch (error) {
        logger.error(
            { err: error },
            `[uon][controllers/api/getAllUsers] Error:`
        );
        res.status(400).json({
            status: "failed",
            errors: [error.message],
        });
    }
};
