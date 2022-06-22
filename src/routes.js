const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const logger = require("./btcs.js").logger;
const router = Router();
const api = require("./controllers/api.js");

router.get("/status", api.status);

module.exports = router;
