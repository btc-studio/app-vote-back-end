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
    try {
        return await PollCriterias.bulkCreate(values);
    } catch (error) {
        return error;
    }
};

exports.internalVote = async (conditions) => {
    try {
        const poll_criteria = await PollCriterias.findOne({
            where: conditions,
        });

        if(poll_criteria === null) {
            return null;
        }

        // Add +1 Vote for user
        poll_criteria.total_vote += 1;
        await poll_criteria.save();
        return poll_criteria;
    } catch (error) {
        return error;
    }
};

exports.findPollCriteriaByPollId = async (poll_id) => {
    try {
        return await PollCriterias.findAll({
            attributes: [
                "criteria_id",
                [
                    sequelize.fn("sum", sequelize.col("total_vote")),
                    "total_vote",
                ],
            ],
            where: {
                poll_id: poll_id,
            },
            group: ["criteria_id"],
        });
    } catch (error) {
        return error;
    }
};
