const { Polls } = require("../models/poll.model");
const { PollOptions } = require("../models/poll_option.model");
const { PollCriterias } = require("../models/poll_criteria.model");
const { createNewPollCriteria } = require("../services/poll_criterias.service");
const sequelize = require("../commons/database/database").sequelize;

exports.findPollById = async (id) => {
    try {
        const poll = await internalFindPoll(id);
        return poll;
    } catch (error) {
        return error;
    }
};

exports.findAllPolls = async () => {
    try {
        const polls = await Polls.findAll();
        return polls;
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
            title: poll_req.title,
            description: poll_req.description,
            created_by: poll_req.created_by,
            start_at: poll_req.start_at,
            end_at: poll_req.end_at,
            created_at: new Date(),
            updated_at: new Date(),
        });

        // insert to polls poll_criterias table
        poll_req.criteria_ids.forEach((criteria_id) => {
            createNewPollCriteria({
                criteria_id: criteria_id,
                option_id: poll_req.id,
                user_id: null,
                total_vote: 0,
            });
        });

        // insert to polls poll_options table
        const poll_option = await PollOptions.create({
            option_id: poll_req.option_id,
            poll_id: poll_req.id,
        });
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
    const poll = await Polls.findOne({
        where: {
            id: id,
        },
    });
    return poll;
};

exports.vote = async (vote_req) => {
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

exports.getResult = async (result_req) => {
    try {
        const poll_criterias = await PollCriterias.findAll({
            where: {
                poll_id: result_req.poll_id,
            },
            order: 
            [ 
                "total_vote", 'DESC',
            ],
            limit: 3,
        });
        return poll_criterias;
    } catch (error) {
        return error;
    }
};
