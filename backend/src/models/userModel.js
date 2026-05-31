const pool = require("../config/db");

async function createUser(data) {
  const result = await pool.query(
    `
    INSERT INTO users (
      school_id,
      full_name,
      username,
      email,
      password,
      role,
      must_change_password
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
    `,
    [
      data.schoolId,
      data.fullName,
      data.username,
      data.email,
      data.password,
      data.role,
      data.mustChangePassword,
    ]
  );

  return result.rows[0];
}

async function findUserByUsernameAndSchoolId(
  username,
  schoolId
) {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE username = $1
    AND school_id = $2
    `,
    [username, schoolId]
  );

  return result.rows[0];
}

async function findUserById(id) {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}

async function updatePassword(
  id,
  hashedPassword
) {
  const result = await pool.query(
    `
    UPDATE users
    SET
      password = $1,
      must_change_password = false,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *
    `,
    [hashedPassword, id]
  );

  return result.rows[0];
}

module.exports = {
  createUser,
  findUserByUsernameAndSchoolId,
  findUserById,
  findUserByUsername,
  updateUserPassword,
  updatePassword,
};

async function findUserByUsername(username) {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE username = $1
    `,
    [username]
  );

  return result.rows[0];
}

async function updateUserPassword(
  userId,
  hashedPassword
) {
  const result = await pool.query(
    `
    UPDATE users
    SET
      password = $1,
      must_change_password = false,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *
    `,
    [hashedPassword, userId]
  );

  return result.rows[0];
}