const express = require("express");
const router = express.Router();
let userController = require("../controllers/users");

router.get('/all', userController.getAllUsers);

module.exports = router