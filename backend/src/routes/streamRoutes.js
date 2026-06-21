const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  createStream,
  getStreams,
  updateStream,
  deleteStream,
} = require(
  "../controllers/streamController"
);

router.get(
  "/",
  authMiddleware,
  getStreams
);

router.post(
  "/",
  authMiddleware,
  createStream
);

router.put(
  "/:id",
  authMiddleware,
  updateStream
);

router.delete(
  "/:id",
  authMiddleware,
  deleteStream
);

module.exports =
  router;