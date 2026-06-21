const {
  createGradeLevelService,
  getGradeLevelsService,
  updateGradeLevelService,
  deleteGradeLevelService,
} = require("../services/gradeLevelService");

async function createGradeLevel(
  req,
  res
) {
  try {
    const gradeLevel =
      await createGradeLevelService(
        req.user.schoolId,
        req.body,
        req.user.userId
      );

    return res.status(201).json({
      success: true,
      data: gradeLevel,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message:
        error.message,
    });
  }
}

async function getGradeLevels(
  req,
  res
) {
  try {
    const gradeLevels =
      await getGradeLevelsService(
        req.user.schoolId
      );

    return res.json({
      success: true,
      data: gradeLevels,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
}

async function updateGradeLevel(
  req,
  res
) {
  try {
    const gradeLevel =
      await updateGradeLevelService(
        req.user.schoolId,
        req.params.id,
        req.body
      );

    return res.json({
      success: true,
      data: gradeLevel,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message:
        error.message,
    });
  }
}

async function deleteGradeLevel(
  req,
  res
) {
  try {
    await deleteGradeLevelService(
      req.user.schoolId,
      req.params.id
    );

    return res.json({
      success: true,
      message:
        "Grade level deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message:
        error.message,
    });
  }
}

module.exports = {
  createGradeLevel,
  getGradeLevels,
  updateGradeLevel,
  deleteGradeLevel,
};