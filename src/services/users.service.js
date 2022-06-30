const { users } = require("../models/user.model");

exports.findUserById = async (user_id) => {
    try {
        const user = await users.findOne({
            where: {
                id: user_id,
            },
        });
        return user;
    } catch (error) {
        // handle error;
        return error;
    }
};

exports.findAllUsers = async () => {
    try {
        const users = await users.findAll();
        return users;
    } catch (error) {
        // handle error;
        return error;
    }
};
