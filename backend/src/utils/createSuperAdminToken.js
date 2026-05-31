require("dotenv").config();

const generateToken = require("./generateToken");

const token = generateToken({
  userId: 1,
  schoolId: "SYSTEM",
  username: "superadmin",
  roles: ["SUPER_ADMIN"],
});

console.log(token);