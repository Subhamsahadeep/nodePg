const express = require("express");
const router = express.Router();
let authController = require("../controllers/auth");
let authenticateTokenMiddleware = require("../middlewares/auth");

router.post('/login', authenticateTokenMiddleware.authenticateToken, authController.loginUser);
router.post('/generateToken', authController.generateToken)

module.exports = router