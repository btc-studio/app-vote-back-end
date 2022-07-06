const { Router } = require("express");
const router = Router();
const userOptionController = require("../controllers/user_options.controller");

/// Get By ID
router.get("/v1/user_options/:id", userOptionController.getUserOptionById);

/// Get All user_options
router.get("/v1/user_options", userOptionController.getAllUserOptions);

/// Create new
router.post("/v1/user_options", userOptionController.createNewUserOption);

/// Update
router.put("/v1/user_options/:id", userOptionController.updateUserOption);

/// Delete
router.delete("/v1/user_options/:id", userOptionController.deleteUserOption);

module.exports = router;
