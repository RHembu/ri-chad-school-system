const express = require("express");

const router = express.Router();

const authenticate =
  require("../middleware/authMiddleware");

const authorize =
  require("../middleware/roleMiddleware");

const {
  createSchoolController,
  updateSchoolProfileController,
} = require("../controllers/schoolController");

router.post(
  "/",
  authenticate,
  authorize("SUPER_ADMIN"),
  createSchoolController
);

router.put(
  "/profile",
    authenticate,
    authorize(
    "super_admin",
    "school_admin"
  ),
  updateSchoolProfileController
);

module.exports = router;