const createSchool = require("../services/createSchoolService");

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

module.exports = {
  createSchoolController,
};