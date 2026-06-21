const express = require("express");
const pool = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const tenantMiddleware = require("../middleware/tenantMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

/**
 * CREATE CLASS
 */
router.post("/", async (req, res) => {
  try {
    const { grade_level_id, class_name } = req.body;
    const school_id = req.schoolId;

    if (!grade_level_id || !class_name) {
      return res.status(400).json({
        success: false,
        message: "Grade level and class name are required",
      });
    }

    const gradeCheck = await pool.query(
      `SELECT id FROM grade_levels
       WHERE id = $1 AND school_id = $2`,
      [grade_level_id, school_id]
    );

    if (gradeCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Grade level not found for this school",
      });
    }

    const result = await pool.query(
      `INSERT INTO classes (school_id, grade_level_id, class_name)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [school_id, grade_level_id, class_name]
    );

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Create class error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating class",
    });
  }
});

/**
 * LIST CLASSES
 */
router.get("/", async (req, res) => {
  try {
    const school_id = req.schoolId;

    const result = await pool.query(
      `SELECT 
        c.id,
        c.school_id,
        c.grade_level_id,
        c.class_name,
        gl.grade_name,
        gl.grade_order
       FROM classes c
       JOIN grade_levels gl ON gl.id = c.grade_level_id
       WHERE c.school_id = $1
       ORDER BY gl.grade_order ASC, c.class_name ASC`,
      [school_id]
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("List classes error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching classes",
    });
  }
});

/**
 * UPDATE CLASS
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { grade_level_id, class_name } = req.body;
    const school_id = req.schoolId;

    if (!grade_level_id || !class_name) {
      return res.status(400).json({
        success: false,
        message: "Grade level and class name are required",
      });
    }

    const gradeCheck = await pool.query(
      `SELECT id FROM grade_levels
       WHERE id = $1 AND school_id = $2`,
      [grade_level_id, school_id]
    );

    if (gradeCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Grade level not found for this school",
      });
    }

    const result = await pool.query(
      `UPDATE classes
       SET grade_level_id = $1,
           class_name = $2
       WHERE id = $3 AND school_id = $4
       RETURNING *`,
      [grade_level_id, class_name, id, school_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.json({
      success: true,
      message: "Class updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Update class error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating class",
    });
  }
});

/**
 * DELETE CLASS
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const school_id = req.schoolId;

    const result = await pool.query(
      `DELETE FROM classes
       WHERE id = $1 AND school_id = $2
       RETURNING *`,
      [id, school_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    console.error("Delete class error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting class",
    });
  }
});

module.exports = router;