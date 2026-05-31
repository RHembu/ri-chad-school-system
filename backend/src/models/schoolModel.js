const pool = require("../config/db");

async function createSchool(data) {
  const result = await pool.query(
    `
    INSERT INTO schools (
      school_id,
      school_name,
      school_email,
      school_phone,
      school_type,
      school_level,
      school_address,
      subscription_status,
      is_demo,
      demo_expires_at
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *
    `,
    [
      data.schoolId,
      data.schoolName,
      data.schoolEmail,
      data.schoolPhone,
      data.schoolType,
      data.schoolLevel,
      data.schoolAddress,
      data.subscriptionStatus,
      data.isDemo,
      data.demoExpiresAt,
    ]
  );

  return result.rows[0];
}

async function findSchoolBySchoolId(schoolId) {
  const result = await pool.query(
    `
    SELECT *
    FROM schools
    WHERE school_id = $1
    `,
    [schoolId]
  );

  return result.rows[0];
}

module.exports = {
  createSchool,
  findSchoolBySchoolId,
};