const express = require("express");

const router = express.Router();

const authenticate =
  require("../middleware/authMiddleware");

const authorize =
  require("../middleware/roleMiddleware");

const {
  createAcademicPeriod,
  getAcademicPeriods,
} = require("../controllers/academicPeriodController");

router.post(
  "/",
  authenticate,
  authorize(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "super_admin",
    "school_admin"
  ),
  createAcademicPeriod
);

router.get(
  "/",
  authenticate,
  authorize(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "super_admin",
    "school_admin"
  ),
  getAcademicPeriods
);

module.exports = router;