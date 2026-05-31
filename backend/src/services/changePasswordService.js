const bcrypt = require("bcryptjs");

const {
  findUserByUsername,
  updateUserPassword,
} = require("../models/userModel");

async function changePassword({
  username,
  newPassword,
}) {
  const user =
    await findUserByUsername(
      username
    );

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      10
    );

  const updatedUser =
    await updateUserPassword(
      user.id,
      hashedPassword
    );

  return updatedUser;
}

module.exports =
  changePassword;