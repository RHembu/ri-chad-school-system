const createSchool = require("../services/createSchoolService");
const {
  updateSchoolProfileService,
} = require("../services/schoolProfileService");

async function createSchoolController(req, res) {
  try {
    const result = await createSchool(req.body);

    return res.status(201).json({
      success: true,
      message: "School created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateSchoolProfileController(
  req,
  res
) {
  try {
    const schoolId =
      req.user.schoolId;

    const school =
      await updateSchoolProfileService(
        schoolId,
        req.body
      );

    return res.json({
      success: true,
      message:
        "School profile updated successfully",
      data: school,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createSchoolController,
  updateSchoolProfileController,
};