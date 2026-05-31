const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  createSchoolController,
} = require("../controllers/schoolController");

router.post(
  "/",
  authenticate,
  authorize("SUPER_ADMIN"),
  createSchoolController
);

module.exports = router;