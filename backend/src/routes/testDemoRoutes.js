const express = require("express");

const router = express.Router();

const authenticate =
  require("../middleware/authMiddleware");

const tenantMiddleware =
  require("../middleware/tenantMiddleware");

const schoolMiddleware =
  require("../middleware/schoolMiddleware");

const demoRestrictionMiddleware =
  require(
    "../middleware/demoRestrictionMiddleware"
  );

router.post(
  "/create-student",
  authenticate,
  tenantMiddleware,
  schoolMiddleware,
  demoRestrictionMiddleware,
  (req, res) => {
    return res.json({
      success: true,
      message:
        "Student creation allowed",
    });
  }
);

module.exports = router;