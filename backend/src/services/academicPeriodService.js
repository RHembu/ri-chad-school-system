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
  console.log(
    "SERVICE RECEIVED:",
    data
  );

  const school =
    await findSchoolBySchoolId(
      data.schoolId
    );

  console.log(
    "SCHOOL FOUND:",
    school
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

  console.log(
    "ACADEMIC YEAR FOUND:",
    academicYear
  );

  if (!academicYear) {
    throw new Error(
      "Academic year not found"
    );
  }

  let periodOrder = 1;

  if (
    data.periodType === "TERM"
  ) {
    const match =
      data.periodName.match(
        /\d+/
      );

    if (match) {
      periodOrder =
        Number(match[0]);
    }
  }

  if (
    data.periodType ===
    "SEMESTER"
  ) {
    const match =
      data.periodName.match(
        /\d+/
      );

    if (match) {
      periodOrder =
        Number(match[0]);
    }
  }

  console.log(
    "PERIOD ORDER:",
    periodOrder
  );

  const payload = {
    ...data,
    schoolId: schoolDbId,
    periodOrder,
  };

  console.log(
    "SENDING TO MODEL:",
    payload
  );

  return await createAcademicPeriod(
    payload
  );
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