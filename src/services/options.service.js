const { Options } = require("../models/option.model");
const { UserOptions } = require("../models/user_option.model");
const sequelize = require("../commons/database/database").sequelize;

exports.findOptionById = async (id) => {
    try {
        const option = await internalFindOption(id);
        return option;
    } catch (error) {
        return error;
    }
};

exports.findAllOptions = async () => {
    try {
        const options = await Options.findAll();
        return options;
    } catch (error) {
        return error;
    }
};

exports.createNewOption = async (option_req) => {
    // First, we start a transaction and save it into a variable
    const t = await sequelize.transaction();
    try {
        // insert to options table
        const option = await Options.create({
            id: option_req.id,
            title: option_req.title,
            description: option_req.description,
            created_by: option_req.created_by,
            created_at: new Date(),
            updated_at: new Date(),
        });

         // insert to options option_criterias table
        option_req.user_ids.forEach((user_id) => {
            const user_option = await UserOptions.create({
                user_id: user_id,
                option_id: option_req.id,
            });
        });
        
        await t.commit();
        return option;
    } catch (error) {
        await t.rollback();
        return error;
    }
};

exports.updateOption = async (option_req) => {
    const t = await sequelize.transaction();
    try {
        const option = await internalFindOption(option_req.id);
        if (option === null) {
        } else {
            option.title = option_req.title == null ? option.title : option_req.title;
            option.description =
                option_req.description == null
                    ? option.description
                    : option_req.description;
            option.start_at =
                option_req.start_at == null ? option.start_at : option_req.start_at;
            option.end_at =
                option_req.end_at == null ? option.end_at : option_req.end_at;
            option.updated_at = new Date();
            await option.save();
        }
        await t.commit();
        return option;
    } catch (error) {
        await t.commit();
        return error;
    }
};

exports.deleteOption = async (id) => {
    try {
        const option = await Options.destroy({
            where: {
                id: id,
            },
        });
        return option;
    } catch (error) {
        return error;
    }
};

internalFindOption = async (id) => {
    const option = await Options.findOne({
        where: {
            id: id,
        },
    });
    return option;
};
