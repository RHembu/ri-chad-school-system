const db = require("../config/db");

async function createStream(
  schoolId,
  data
) {
  const {
    class_id,
    stream_name,
    stream_code,
  } = data;

  const result =
    await db.query(
      `
      INSERT INTO streams
      (
        school_id,
        class_id,
        stream_name,
        stream_code
      )
      VALUES
      ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        schoolId,
        class_id,
        stream_name,
        stream_code,
      ]
    );

  return result.rows[0];
}

async function getStreams(
  schoolId
) {
  const result =
    await db.query(
      `
      SELECT
        s.*,
        c.class_name
      FROM streams s
      JOIN classes c
        ON c.id = s.class_id
      WHERE s.school_id = $1
      ORDER BY
        c.class_name,
        s.stream_name
      `,
      [schoolId]
    );

  return result.rows;
}

async function updateStream(
  schoolId,
  streamId,
  data
) {
  const {
    class_id,
    stream_name,
    stream_code,
  } = data;

  const result =
    await db.query(
      `
      UPDATE streams
      SET
        class_id=$1,
        stream_name=$2,
        stream_code=$3,
        updated_at=CURRENT_TIMESTAMP
      WHERE
        id=$4
      AND
        school_id=$5
      RETURNING *
      `,
      [
        class_id,
        stream_name,
        stream_code,
        streamId,
        schoolId,
      ]
    );

  return result.rows[0];
}

async function deleteStream(
  schoolId,
  streamId
) {
  await db.query(
    `
    DELETE FROM streams
    WHERE id=$1
    AND school_id=$2
    `,
    [
      streamId,
      schoolId,
    ]
  );
}

module.exports = {
  createStream,
  getStreams,
  updateStream,
  deleteStream,
};