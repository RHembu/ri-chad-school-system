const {
  createAcademicPeriod,
  getAcademicPeriodsBySchool,
} = require("../models/academicPeriodModel");

const {
  getAcademicYearById,
} = require("../models/academicYearModel");

const {
  findSchoolBySchoolId,
} = require("../models/schoolModel");

async function createAcademicPeriodService(
  data
) {
  const school =
    await findSchoolBySchoolId(
      data.schoolId
    );

  if (!school) {
    throw new Error(
      "School not found"
    );
  }

  const schoolDbId = school.id;

  const academicYear =
    await getAcademicYearById(
      data.academicYearId,
      schoolDbId
    );

  if (!academicYear) {
    throw new Error(
      "Academic year not found"
    );
  }

  return createAcademicPeriod({
    ...data,
    schoolId: schoolDbId,
  });
}

async function getAcademicPeriodsService(
  schoolId
) {
  const school =
    await findSchoolBySchoolId(
      schoolId
    );

  if (!school) {
    throw new Error(
      "School not found"
    );
  }

  return getAcademicPeriodsBySchool(
    school.id
  );
}

module.exports = {
  createAcademicPeriodService,
  getAcademicPeriodsService,
};