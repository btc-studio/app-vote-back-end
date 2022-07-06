const { UserOptions } = require("../models/user_option.model");
const sequelize = require("../commons/database/database").sequelize;

exports.findUserOptionById = async (id) => {
    try {
        const option = await internalFindUserOption(id);
        return option;
    } catch (error) {
        return error;
    }
};

exports.findAllUserOptions = async () => {
    try {
        const options = await UserOptions.findAll();
        return options;
    } catch (error) {
        return error;
    }
};

exports.createNewUserOption = async (data) => {
    // First, we start a transaction and save it into a variable
    const t = await sequelize.transaction();
    try {
        // insert to options table
        const option = await UserOptions.create({
            data,
        });
        await t.commit();
        return option;
    } catch (error) {
        await t.rollback();
        return error;
    }
};

exports.createBuldUserOptions = async (values) => {
    // First, we start a transaction and save it into a variable
    const t = await sequelize.transaction();
    try {
        // insert to options table
        const option = await UserOptions.bulkCreate(values);
        await t.commit();
        return option;
    } catch (error) {
        await t.rollback();
        return error;
    }
};

exports.deleteUserOption = async (id) => {
    try {
        const option = await UserOptions.destroy({
            where: {
                user_id: id,
            },
        });
        return option;
    } catch (error) {
        return error;
    }
};

internalFindUserOption = async (id) => {
    const user_option = await UserOptions.findAll({
        where: {
            option_id: id,
        },
    });
    return user_option;
};
