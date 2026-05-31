const {
  findSchoolBySchoolId,
} = require("../models/schoolModel");

async function schoolMiddleware(
  req,
  res,
  next
) {
  try {
    const school =
      await findSchoolBySchoolId(
        req.schoolId
      );

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    req.school = school;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to load school",
    });
  }
}

module.exports = schoolMiddleware;