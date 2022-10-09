const express = require("express");
const userController = require("../controlars/user.controlar");
const verifyToken = require("../middleware/verifyToken");
// const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/signup", userController.signup);
// router.get("/signup/confirmation/:token", userController.confirmEmail);

router.post("/login", userController.login);

router.get("/me", verifyToken, userController.getMe);

module.exports = router;
