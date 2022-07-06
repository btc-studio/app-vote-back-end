const { PollCriterias } = require("../models/poll_criteria.model");
const sequelize = require("../commons/database/database").sequelize;

exports.createNewPollCriteria = async (request) => {
    const t = await sequelize.transaction();
    try {
        const poll_criteria = await PollCriterias.create({
            criteria_id: request.criteria_id,
            option_id: request.option_id,
            user_id: request.user_id,
            total_vote: 0,
        });
        await t.commit();
        return poll_criteria;
    } catch (error) {
        await t.rollback();
        return error;
    }
};
