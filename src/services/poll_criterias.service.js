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

exports.createBulkPollCriterias = async (values) => {
    const t = await sequelize.transaction();
    try {
        const poll_criterias = await PollCriterias.bulkCreate(values);
        await t.commit();
        return poll_criterias;
    } catch (error) {
        await t.rollback();
        return error;
    }
};

exports.vote = async (request) => {
    const t = await sequelize.transaction();
    try {
        const poll_criteria = await PollCriterias.findOne({
            where: {
                criteria_id: vote_req.criteria_id,
                poll_id: vote_req.poll_id,
                user_id: vote_req.user_id,
            },
        });
        // Add +1 Vote for user
        poll_criteria.total_vote += 1;
        await poll_criteria.save();
        await t.commit();
        return poll_criteria;
    } catch (error) {
        await t.rollback();
        return error;
    }
};
