const {
  createAcademicYearService,
  getAcademicYearsService,
  activateAcademicYearService,
} = require("../services/academicYearService");

async function createAcademicYear(req, res) {
  try {
    const academicYear = await createAcademicYearService({
      schoolId: req.user.schoolId,
      yearName: req.body.yearName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      isActive: req.body.isActive,
      createdBy: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Academic year created successfully",
      data: academicYear,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function getAcademicYears(req, res) {
  try {
    const academicYears = await getAcademicYearsService(
      req.user.schoolId
    );

    return res.json({
      success: true,
      data: academicYears,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function activateAcademicYear(req, res) {
  try {
    const academicYear = await activateAcademicYearService(
      req.params.id,
      req.user.schoolId
    );

    return res.json({
      success: true,
      message: "Academic year activated successfully",
      data: academicYear,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  createAcademicYear,
  getAcademicYears,
  activateAcademicYear,
};