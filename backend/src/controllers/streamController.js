const pool = require("../config/db");

exports.createStream = async (req, res) => {
  try {
    const schoolId = req.user.school_id;
    const { class_id, stream_name } = req.body;

    if (!class_id || !stream_name) {
      return res.status(400).json({
        success: false,
        message: "Class and stream name are required",
      });
    }

    const classCheck = await pool.query(
      "SELECT id FROM classes WHERE id = $1 AND school_id = $2",
      [class_id, schoolId]
    );

    if (classCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Class not found for this school",
      });
    }

    const result = await pool.query(
      `INSERT INTO streams (school_id, class_id, stream_name)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [schoolId, class_id, stream_name]
    );

    res.status(201).json({
      success: true,
      message: "Stream created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Create stream error:", error);
    res.status(500).json({
      success: false,
      message: "Server error creating stream",
    });
  }
};

exports.getStreams = async (req, res) => {
  try {
    const schoolId = req.user.school_id;

    const result = await pool.query(
      `SELECT 
        streams.id,
        streams.school_id,
        streams.class_id,
        streams.stream_name,
        classes.class_name
       FROM streams
       JOIN classes ON streams.class_id = classes.id
       WHERE streams.school_id = $1
       ORDER BY classes.class_name ASC, streams.stream_name ASC`,
      [schoolId]
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get streams error:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching streams",
    });
  }
};

exports.updateStream = async (req, res) => {
  try {
    const schoolId = req.user.school_id;
    const { id } = req.params;
    const { class_id, stream_name } = req.body;

    if (!class_id || !stream_name) {
      return res.status(400).json({
        success: false,
        message: "Class and stream name are required",
      });
    }

    const classCheck = await pool.query(
      "SELECT id FROM classes WHERE id = $1 AND school_id = $2",
      [class_id, schoolId]
    );

    if (classCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Class not found for this school",
      });
    }

    const result = await pool.query(
      `UPDATE streams
       SET class_id = $1, stream_name = $2
       WHERE id = $3 AND school_id = $4
       RETURNING *`,
      [class_id, stream_name, id, schoolId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Stream not found",
      });
    }

    res.json({
      success: true,
      message: "Stream updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Update stream error:", error);
    res.status(500).json({
      success: false,
      message: "Server error updating stream",
    });
  }
};

exports.deleteStream = async (req, res) => {
  try {
    const schoolId = req.user.school_id;
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM streams WHERE id = $1 AND school_id = $2 RETURNING *",
      [id, schoolId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Stream not found",
      });
    }

    res.json({
      success: true,
      message: "Stream deleted successfully",
    });
  } catch (error) {
    console.error("Delete stream error:", error);
    res.status(500).json({
      success: false,
      message: "Server error deleting stream",
    });
  }
};