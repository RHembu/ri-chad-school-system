const bcrypt = require("bcryptjs");

const generateToken =
  require("../utils/generateToken");

const {
  findUserByUsernameAndSchoolId,
} = require("../models/userModel");

async function login({
  schoolId,
  username,
  password,
}) {
  const user =
  await findUserByUsernameAndSchoolId(
    username,
    schoolId
  );

  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const passwordMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!passwordMatch) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const token =
    generateToken({
      userId: user.id,
      schoolId: user.school_id,
      username: user.username,
      role: user.role,
    });

  return {
    token,
    user,
  };
}

module.exports = login;