const classService =
  require("../services/classService");

async function createClass(
  req,
  res
) {
  try {
    const schoolId =
      req.user.schoolId;

    const classData =
      await classService.createClass(
        schoolId,
        req.body
      );

    res.status(201).json({
      success: true,
      data: classData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
        success: false,
        message: error.message,
    });
    }
}

async function getClasses(
  req,
  res
) {
  try {
    const schoolId =
      req.user.schoolId;

    const classes =
      await classService.getClasses(
        schoolId
      );

    res.json({
      success: true,
      data: classes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch classes",
    });
  }
}

async function updateClass(
  req,
  res
) {
  try {
    const schoolId =
      req.user.schoolId;

    const classId =
      req.params.id;

    const updatedClass =
      await classService.updateClass(
        schoolId,
        classId,
        req.body
      );

    res.json({
      success: true,
      data: updatedClass,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to update class",
    });
  }
}

async function deleteClass(
  req,
  res
) {
  try {
    const schoolId =
      req.user.schoolId;

    const classId =
      req.params.id;

    await classService.deleteClass(
      schoolId,
      classId
    );

    res.json({
      success: true,
      message:
        "Class deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to delete class",
    });
  }
}

module.exports = {
  createClass,
  getClasses,
  updateClass,
  deleteClass,
};