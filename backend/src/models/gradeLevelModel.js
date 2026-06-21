const db =
  require("../config/db");

async function createGradeLevel(
  data
) {
  const {
    schoolId,
    gradeName,
    gradeOrder,
    createdBy,
  } = data;

  const result =
    await db.query(
      `
      INSERT INTO grade_levels
      (
        school_id,
        grade_name,
        grade_order,
        created_by
      )
      VALUES
      ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        schoolId,
        gradeName,
        gradeOrder,
        createdBy,
      ]
    );

  return result.rows[0];
}

async function getGradeLevelsBySchool(
  schoolId
) {
  const result =
    await db.query(
      `
      SELECT *
      FROM grade_levels
      WHERE school_id = $1
      ORDER BY grade_order ASC
      `,
      [schoolId]
    );

  return result.rows;
}

async function getGradeLevelById(
  id,
  schoolId
) {
  const result =
    await db.query(
      `
      SELECT *
      FROM grade_levels
      WHERE id = $1
      AND school_id = $2
      LIMIT 1
      `,
      [
        id,
        schoolId,
      ]
    );

  return result.rows[0];
}

async function updateGradeLevel(
  id,
  schoolId,
  data
) {
  const {
    gradeName,
    gradeOrder,
  } = data;

  const result =
    await db.query(
      `
      UPDATE grade_levels
      SET
        grade_name = $1,
        grade_order = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      AND school_id = $4
      RETURNING *
      `,
      [
        gradeName,
        gradeOrder,
        id,
        schoolId,
      ]
    );

  return result.rows[0];
}

async function deleteGradeLevel(
  id,
  schoolId
) {
  await db.query(
    `
    DELETE FROM grade_levels
    WHERE id = $1
    AND school_id = $2
    `,
    [
      id,
      schoolId,
    ]
  );

  return true;
}

module.exports = {
  createGradeLevel,
  getGradeLevelsBySchool,
  getGradeLevelById,
  updateGradeLevel,
  deleteGradeLevel,
};