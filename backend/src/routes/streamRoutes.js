const express = require("express");
const router = express.Router();

const {
  createStream,
  getStreams,
  updateStream,
  deleteStream,
} = require("../controllers/streamController");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.use(authMiddleware);

router.post(
  "/",
  authorize("SUPER_ADMIN", "SCHOOL_ADMIN"),
  createStream
);

router.get(
  "/",
  authorize("SUPER_ADMIN", "SCHOOL_ADMIN"),
  getStreams
);

router.put(
  "/:id",
  authorize("SUPER_ADMIN", "SCHOOL_ADMIN"),
  updateStream
);

router.delete(
  "/:id",
  authorize("SUPER_ADMIN", "SCHOOL_ADMIN"),
  deleteStream
);

module.exports = router;