const express = require("express");

const router = express.Router();

const {
  changePasswordController,
  loginController,
} = require("../controllers/authController");

router.post(
  "/change-password",
  changePasswordController
);

router.post(
  "/login",
  loginController
);

module.exports = router;