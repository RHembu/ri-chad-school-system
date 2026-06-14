const {
  createAcademicPeriodService,
  getAcademicPeriodsService,
} = require("../services/academicPeriodService");

async function createAcademicPeriod(
  req,
  res
) {
  try {
    const academicPeriod =
      await createAcademicPeriodService({
        schoolId:
          req.user.schoolId,

        academicYearId:
          req.body.academicYearId,

        periodName:
          req.body.periodName,

        periodType:
          req.body.periodType,

        startDate:
          req.body.startDate,

        endDate:
          req.body.endDate,
      });

    return res.status(201).json({
      success: true,
      data: academicPeriod,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error.message,
    });
  }
}

async function getAcademicPeriods(
  req,
  res
) {
  try {
    const periods =
      await getAcademicPeriodsService(
        req.user.schoolId
      );

    return res.json({
      success: true,
      data: periods,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
}

module.exports = {
  createAcademicPeriod,
  getAcademicPeriods,
};