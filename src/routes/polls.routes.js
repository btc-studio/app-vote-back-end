const { Router } = require("express");
const router = Router();
const pollController = require("../controllers/polls.controllers");

/// Get By ID
router.get("/v1/polls/:id", pollController.getPollById);

/// Get All polls
router.get("/v1/polls", pollController.getAllPolls);

/// Create new
router.post("/v1/polls", pollController.createNewPoll);

/// Update
router.put("/v1/polls/:id", pollController.updatePoll);

/// Delete
router.delete("/v1/polls/:id", pollController.deletePoll);

/// Get result polls
router.post("/v1/polls/vote", pollController.vote);

/// Get result polls
router.get("/v1/polls?", pollController.getResult);

module.exports = router;
