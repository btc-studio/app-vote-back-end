const { Polls } = require("../models/poll.model");
const { PollCriterias } = require("../models/poll_criteria.model");
const {
    createBulkPollCriterias,
    internalVote,
} = require("../services/poll_criterias.service");
const { findUserOptionById } = require("../services/user_options.service");
const {
    findPollCriteriaByPollId,
} = require("../services/poll_criterias.service");
const createDataPolls = require("../helpers/polls.helper").createDataPolls;

const sequelize = require("../commons/database/database").sequelize;

exports.findPollById = async (id) => {
    try {
        const poll = await internalFindPoll(id);
        const poll_criterias = await findPollCriteriaByPollId(id);
        const criteria_ids = poll_criterias.map((data) => data.criteria_id);
        return {poll: poll, criteria_ids: criteria_ids};
    } catch (error) {
        return error;
    }
};

exports.findAllPolls = async () => {
    try {
        return await Polls.findAll();
    } catch (error) {
        return error;
    }
};

exports.createNewPoll = async (poll_req) => {
    // First, we start a transaction and save it into a variable
    const t = await sequelize.transaction();
    try {
        // insert to polls table
        const poll = await Polls.create({
            id: poll_req.id,
            option_id: poll_req.option_id,
            criteria_ids: poll_req.criteria_ids,
            title: poll_req.title,
            description: poll_req.description,
            created_by: poll_req.created_by,
            start_at: poll_req.start_at,
            end_at: poll_req.end_at,
            created_at: new Date(),
            updated_at: new Date(),
        });

        const user_options = await findUserOptionById(poll_req.option_id);
        const values = createDataPolls(poll_req.id,poll_req.criteria_ids, user_options);
        const poll_criterias = await createBulkPollCriterias(values);
        
        if (poll_criterias === null) {
            await t.rollback();
            return null;
        }
        await t.commit();
        return poll;
    } catch (error) {
        await t.rollback();
        return error;
    }
};

exports.updatePoll = async (poll_req) => {
    const t = await sequelize.transaction();
    try {
        const poll = await internalFindPoll(poll_req.id);
        if (poll === null) {
            return null;
        } else {
            poll.title = poll_req.title == null ? poll.title : poll_req.title;
            poll.description =
                poll_req.description == null
                    ? poll.description
                    : poll_req.description;
            poll.start_at =
                poll_req.start_at == null ? poll.start_at : poll_req.start_at;
            poll.end_at =
                poll_req.end_at == null ? poll.end_at : poll_req.end_at;
            poll.updated_at = new Date();
            await poll.save();
        }
        await t.commit();
        return poll;
    } catch (error) {
        await t.rollback();
        return error;
    }
};

exports.deletePoll = async (id) => {
    const t = await sequelize.transaction();
    try {
        const poll = await Polls.destroy({
            where: {
                id: id,
            },
        });
        await t.commit();
        return poll;
    } catch (error) {
        await t.rollback();
        return error;
    }
};

internalFindPoll = async (id) => {
    return await Polls.findOne({
        where: {
            id: id,
        },
    });
};

exports.pollVote = async (conditions) => {
    const t = await sequelize.transaction();
    try {
        const votes = await internalVote(conditions);
        if(votes === null) {
            await t.rollback();
            return votes;
        }
        await t.commit();
        return votes;
    } catch (error) {
        await t.rollback();
        return error;
    }
};

exports.getResult = async (result_req) => {
    try {
        return await PollCriterias.findAll({
            where: {
                poll_id: result_req.poll_id,
            },
            order: [["total_vote", "DESC"]],
            limit: 3,
        });
    } catch (error) {
        return error;
    }
};
