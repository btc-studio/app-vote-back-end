const { Router } = require("express");
const router = Router();
const userController = require("../controllers/users.controllers");

/// Get User By ID
router.get("/v1/users/:id", userController.getUserById);

/// Get All Users
router.get("/v1/users", userController.getAllUsers);

/// Create new user
router.post("/v1/users", userController.createNewUser);

/// Update user
router.put("/v1/users/:id", userController.updateUser);

/// Delete user
router.delete("/v1/users/:id", userController.deleteUser);

module.exports = router;
