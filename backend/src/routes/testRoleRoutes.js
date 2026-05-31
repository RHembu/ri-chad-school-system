const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  superAdminOnly,
} = require("../controllers/testRoleController");

router.get(
  "/super-admin",
  authenticate,
  authorize("SUPER_ADMIN"),
  superAdminOnly
);

module.exports = router;