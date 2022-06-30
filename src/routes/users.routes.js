const { Router } = require("express");
const router = Router();
const userController = require("../controllers/users.controllers");

/// Get User By ID
router.get("/v1/users/:user_id", userController.getUserById);

/// Get All Users
router.get("/v1/users", userController.getAllUsers);

module.exports = router;
