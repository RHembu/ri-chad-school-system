const pool = require("../config/db");

async function createAcademicYear({
  schoolId,
  yearName,
  startDate,
  endDate,
  isActive,
  createdBy,
}) {
  const result = await pool.query(
    `
    INSERT INTO academic_years (
      school_id,
      year_name,
      start_date,
      end_date,
      is_active,
      created_by,
      status
    )
    VALUES ($1,$2,$3,$4,$5,$6,'ACTIVE')
    RETURNING *
    `,
    [
      schoolId,
      yearName,
      startDate,
      endDate,
      isActive,
      createdBy,
    ]
  );

  return result.rows[0];
}

async function getAcademicYearsBySchool(
  schoolId
) {
  const result = await pool.query(
    `
    SELECT *
    FROM academic_years
    WHERE school_id = $1
    ORDER BY year_name DESC
    `,
    [schoolId]
  );

  return result.rows;
}

async function deactivateAcademicYears(
  schoolId
) {
  await pool.query(
    `
    UPDATE academic_years
    SET is_active = false
    WHERE school_id = $1
    `,
    [schoolId]
  );
}

async function activateAcademicYear(
  id,
  schoolId
) {
  const result = await pool.query(
    `
    UPDATE academic_years
    SET is_active = true
    WHERE id = $1
    AND school_id = $2
    RETURNING *
    `,
    [id, schoolId]
  );

  return result.rows[0];
}

async function getAcademicYearById(
  id,
  schoolId
) {
  const result = await pool.query(
    `
    SELECT *
    FROM academic_years
    WHERE id = $1
    AND school_id = $2
    `,
    [id, schoolId]
  );

  return result.rows[0];
}

module.exports = {
  createAcademicYear,
  getAcademicYearsBySchool,
  deactivateAcademicYears,
  activateAcademicYear,
  getAcademicYearById,
};
