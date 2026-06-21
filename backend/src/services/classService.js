const db =
  require("../config/db");

const {
  findSchoolBySchoolId,
} = require("../models/schoolModel");

async function createClass(
  schoolId,
  data
) {
  const school =
    await findSchoolBySchoolId(
      schoolId
    );

  if (!school) {
    throw new Error(
      "School not found"
    );
  }

  const schoolDbId =
    school.id;

  const {
    class_name,
    class_level,
    class_type,
  } = data;

  const result =
    await db.query(
      `
      INSERT INTO classes
      (
        school_id,
        class_name,
        class_level,
        class_type
      )
      VALUES
      ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        schoolDbId,
        class_name,
        class_level,
        class_type,
      ]
    );

  return result.rows[0];
}

async function getClasses(
  schoolId
) {
  const school =
    await findSchoolBySchoolId(
      schoolId
    );

  if (!school) {
    throw new Error(
      "School not found"
    );
  }

  const schoolDbId =
    school.id;

  const result =
    await db.query(
      `
      SELECT *
      FROM classes
      WHERE school_id = $1
      ORDER BY class_level
      `,
      [schoolDbId]
    );

  return result.rows;
}

async function updateClass(
  schoolId,
  classId,
  data
) {
  const school =
    await findSchoolBySchoolId(
      schoolId
    );

  if (!school) {
    throw new Error(
      "School not found"
    );
  }

  const schoolDbId =
    school.id;

  const {
    class_name,
    class_level,
    class_type,
  } = data;

  const result =
    await db.query(
      `
      UPDATE classes
      SET
        class_name=$1,
        class_level=$2,
        class_type=$3,
        updated_at=CURRENT_TIMESTAMP
      WHERE
        id=$4
      AND
        school_id=$5
      RETURNING *
      `,
      [
        class_name,
        class_level,
        class_type,
        classId,
        schoolDbId,
      ]
    );

  return result.rows[0];
}

async function deleteClass(
  schoolId,
  classId
) {
  const school =
    await findSchoolBySchoolId(
      schoolId
    );

  if (!school) {
    throw new Error(
      "School not found"
    );
  }

  const schoolDbId =
    school.id;

  await db.query(
    `
    DELETE FROM classes
    WHERE id=$1
    AND school_id=$2
    `,
    [
      classId,
      schoolDbId,
    ]
  );
}

module.exports = {
  createClass,
  getClasses,
  updateClass,
  deleteClass,
};