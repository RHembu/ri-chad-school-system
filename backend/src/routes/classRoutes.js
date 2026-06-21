const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  createClass,
  getClasses,
  updateClass,
  deleteClass,
} = require(
  "../controllers/classController"
);

router.get(
  "/",
  authMiddleware,
  getClasses
);

router.post(
  "/",
  authMiddleware,
  createClass
);

router.put(
  "/:id",
  authMiddleware,
  updateClass
);

router.delete(
  "/:id",
  authMiddleware,
  deleteClass
);

module.exports =
  router;