const { Users } = require("../models/user.model");

exports.findUserById = async (id) => {
    try {
        const user = await internalFindUser(id);
        return user;
    } catch (error) {
        return error;
    }
};

exports.findAllUsers = async () => {
    try {
        const users = await Users.findAll();
        return users;
    } catch (error) {
        return error;
    }
};

exports.createNewUser = async (user_req) => {
    try {
        const user = await Users.create({
            id: user_req.id,
            name: user_req.name,
            email: user_req.email,
            role: user_req.role,
            created_at: new Date(),
            updated_at: new Date(),
        });
        return user;
    } catch (error) {
        return error;
    }
};

exports.updateUser = async (user_req) => {
    try {
        const user = await internalFindUser(user_req.id);
        if (user === null) {
        } else {
            user.name = user_req.name == null ? user.name : user_req.name;
            user.email = user_req.email == null ? user.email : user_req.email;
            user.role = user_req.role == null ? user.role : user_req.role;
            user.updated_at = new Date();
            await user.save();
        }
        return user;
    } catch (error) {
        return error;
    }
};

exports.deleteUser = async (id) => {
    try {
        const user = await Users.destroy({
            where: {
                id: id,
            },
        });
        return user;
    } catch (error) {
        return error;
    }
};

internalFindUser = async (id) => {
    const user = await Users.findOne({
        where: {
            id: id,
        },
    });
    return user;
};