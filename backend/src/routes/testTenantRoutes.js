const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const tenantMiddleware = require("../middleware/tenantMiddleware");

const {
  getTenantInfo,
} = require("../controllers/testTenantController");

router.get(
  "/",
  authenticate,
  tenantMiddleware,
  getTenantInfo
);

module.exports = router;