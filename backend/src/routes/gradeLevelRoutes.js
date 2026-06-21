const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  createGradeLevel,
  getGradeLevels,
  updateGradeLevel,
  deleteGradeLevel,
} = require("../controllers/gradeLevelController");

router.post(
  "/",
  authMiddleware,
  createGradeLevel
);

router.get(
  "/",
  authMiddleware,
  getGradeLevels
);

router.put(
  "/:id",
  authMiddleware,
  updateGradeLevel
);

router.delete(
  "/:id",
  authMiddleware,
  deleteGradeLevel
);

module.exports =
  router;