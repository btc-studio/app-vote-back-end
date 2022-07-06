const { Router } = require("express");
const router = Router();
const pollCriteriaController = require("../controllers/pollCriterias.controllers");

/// Get By ID
router.get("/v1/pollCriterias/:id", pollCriteriaController.getPollCriteriaById);

/// Get All
router.get("/v1/pollCriterias", pollCriteriaController.getAllPollCriterias);

/// Create new
router.post("/v1/pollCriterias", pollCriteriaController.createNewPollCriteria);

/// Update
router.put("/v1/pollCriterias/:id", pollCriteriaController.updatePollCriteria);

module.exports = router;
