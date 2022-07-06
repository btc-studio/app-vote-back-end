const logger = require("../btcs").logger;
const {
    findPollById,
    findAllPolls,
    createNewPoll,
    updatePoll,
    deletePoll,
    vote,
    getResult,
} = require("../services/polls.service");

exports.getPollById = async (req, res) => {
    try {
        const id = req.params.id;
        const poll = await findPollById(id);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            poll,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/getPollById] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.getAllPolls = async (req, res) => {
    logger.info(req.params, `[btcs][controllers/api/getAllPolls] Request:`);
    try {
        const polls = await findAllPolls();
        console.log("polls: ", polls);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            polls,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/getAllPolls] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.createNewPoll = async (req, res) => {
    logger.info(req.params, `[btcs][controllers/api/createNewPoll] Request:`);
    try {
        // TODO: Validate data request

        const poll_req = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            criteria_ids: req.body.criteria_ids,
            option_id: req.body.option_id,
            created_by: req.body.created_by,
            start_at: req.body.start_at,
            end_at: req.body.end_at,
        };

        const poll = await createNewPoll(poll_req);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            poll,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/createNewPoll] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.updatePoll = async (req, res) => {
    try {
        // TODO: Validate data request

        const poll_req = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            created_by: req.body.created_by,
            start_at: req.body.start_at,
            end_at: req.body.end_at,
        };
        const poll = await updatePoll(poll_req);

        if (poll === null) {
            res.status(404).json({
                success: false,
                message: "USER_NOT_FOUND_ERROR",
                error: 404,
                data: null,
            });
        }

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            poll,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/updatePoll] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.deletePoll = async (req, res) => {
    try {
        const id = req.params.id;
        const poll = await deletePoll(id);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            poll,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/deletePoll] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.vote = async (req, res) => {
    try {
        const vote_rep = {
            poll_id: req.body.poll_id,
            criteria_id: req.body.criteria_id,
            user_id: req.body.user_id,
        };
        const vote = await vote(vote_rep);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            vote,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/deletePoll] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};

exports.getResult = async (req, res) => {
    try {
        const result_req = {
            poll_id: req.params.poll_id,
            criteria_id: req.params.criteria_id,
            user_id: req.params.user_id,
        };
        const result = await getResult(result_req);

        res.status(200).json({
            success: true,
            message: "SUCCESS",
            error: null,
            result,
        });
    } catch (error) {
        logger.error(
            { err: error },
            `[btcs][controllers/api/deletePoll] Error:`
        );
        res.status(500).json({
            success: false,
            message: "INTERNAL_SERVER_ERROR",
            error: 500,
            data: null,
        });
    }
};
