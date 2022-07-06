const { Router } = require("express");
const router = Router();
const optionController = require("../controllers/options.controllers");

/// Get By ID
router.get("/v1/options/:id", optionController.getOptionById);

/// Get All options
router.get("/v1/options", optionController.getAllOptions);

/// Create new
router.post("/v1/options", optionController.createNewOption);

/// Update
router.put("/v1/options/:id", optionController.updateOption);

/// Delete
router.delete("/v1/options/:id", optionController.deleteOption);

module.exports = router;
