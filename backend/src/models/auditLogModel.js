const pool = require("../config/db");

async function createAuditLog(data) {
  const result = await pool.query(
    `
    INSERT INTO audit_logs (
      school_id,
      user_id,
      action,
      description,
      ip_address
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [
      data.schoolId,
      data.userId,
      data.action,
      data.description,
      data.ipAddress,
    ]
  );

  return result.rows[0];
}

module.exports = {
  createAuditLog,
};