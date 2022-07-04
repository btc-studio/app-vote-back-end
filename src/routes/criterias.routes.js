const { Router } = require("express");
const router = Router();
const criteriaController = require("../controllers/criterias.controllers");

/// Get criteria By ID
router.get("/v1/criterias/:id", criteriaController.getCriteriaById);

/// Get All criterias
router.get("/v1/criterias", criteriaController.getAllCriterias);

/// Create new criteria
router.post("/v1/criterias", criteriaController.createNewCriteria);

/// Update criteria
router.put("/v1/criterias/:id", criteriaController.updateCriteria);

/// Delete criteria
router.delete("/v1/criterias/:id", criteriaController.deleteCriteria);

module.exports = router;
