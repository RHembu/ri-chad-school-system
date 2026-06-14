const express = require("express");

const router = express.Router();

const authenticate =
  require("../middleware/authMiddleware");

const authorize =
  require("../middleware/roleMiddleware");

const {
  createAcademicYear,
  getAcademicYears,
  activateAcademicYear,
} = require("../controllers/academicYearController");

router.post(
  "/",
  authenticate,
  authorize(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "super_admin",
    "school_admin"
  ),
  createAcademicYear
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
  getAcademicYears
);

router.patch(
  "/:id/activate",
  authenticate,
  authorize(
    "SUPER_ADMIN",
    "SCHOOL_ADMIN",
    "super_admin",
    "school_admin"
  ),
  activateAcademicYear
);

module.exports = router;
