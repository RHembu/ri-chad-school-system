const pool = require("../config/db");

async function createAcademicPeriod({
  academicYearId,
  schoolId,
  periodName,
  periodType,
  startDate,
  endDate,
}) {
  const result = await pool.query(
    `
    INSERT INTO academic_periods (
      academic_year_id,
      school_id,
      period_name,
      period_type,
      start_date,
      end_date
    )
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *
    `,
    [
      academicYearId,
      schoolId,
      periodName,
      periodType,
      startDate,
      endDate,
    ]
  );

  return result.rows[0];
}

async function getAcademicPeriodsByYear(
  academicYearId,
  schoolId
) {
  const result = await pool.query(
    `
    SELECT *
    FROM academic_periods
    WHERE academic_year_id = $1
    AND school_id = $2
    ORDER BY id ASC
    `,
    [
      academicYearId,
      schoolId,
    ]
  );

  return result.rows;
}

async function getAcademicPeriodsBySchool(
  schoolId
) {
  const result = await pool.query(
    `
    SELECT
      ap.*,
      ay.year_name
    FROM academic_periods ap
    JOIN academic_years ay
      ON ay.id = ap.academic_year_id
    WHERE ap.school_id = $1
    ORDER BY ay.year_name DESC,
             ap.id ASC
    `,
    [schoolId]
  );

  return result.rows;
}

module.exports = {
  createAcademicPeriod,
  getAcademicPeriodsByYear,
  getAcademicPeriodsBySchool,
};