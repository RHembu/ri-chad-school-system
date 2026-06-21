const pool = require("../config/db");

async function tenantMiddleware(
  req,
  res,
  next
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication required",
      });
    }

    const schoolCode =
      req.user.schoolId;

    const result =
      await pool.query(
        `
        SELECT id
        FROM schools
        WHERE school_id = $1
        `,
        [schoolCode]
      );

    if (
      result.rows.length === 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          "School not found",
      });
    }

    req.schoolId =
      result.rows[0].id;

    req.schoolCode =
      schoolCode;

    next();
  } catch (error) {
    console.error(
      "Tenant middleware error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Tenant resolution failed",
    });
  }
}

module.exports =
  tenantMiddleware;