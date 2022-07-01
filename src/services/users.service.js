const { users } = require("../models/user.model");

exports.findUserById = async (user_id) => {
    try {
        const user = internalFindUser(user_id);
        return user;
    } catch (error) {
        return error;
    }
};

exports.findAllUsers = async () => {
    try {
        const users = await users.findAll();
        return users;
    } catch (error) {
        return error;
    }
};

exports.createNewUser = async (user_req) => {
    try {
        const user = await users.create({
            name: user_req.name,
            email: user_req.email,
            role: user_req.role,
            created_at: new Date(),
            update_at: new Date(),
        });
        return user;
    } catch (error) {
        return error;
    }
};

exports.updateUser = async (user_req) => {
    try {
        const user = internalFindUser(user_id);
        if (user === null) {
        } else {
            user.name = user_req.name ? null : user.name;
            user.email = user_req.email ? null : user.email;
            user.role = user_req.role ? null : user.role;
            user.update_at = new Date();
            await users.save();
        }
        return user;
    } catch (error) {
        return error;
    }
};

exports.deleteUser = async (user_id) => {
    try {
        const user = await users.destroy({
            where: {
                id: user_id,
            },
        });
        return user;
    } catch (error) {
        return error;
    }
};

internalFindUser = async (user_id) => {
    const user = await users.findOne({
        where: {
            id: user_id,
        },
    });
    return user;
};
