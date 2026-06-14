const {
  createAcademicYear,
  getAcademicYearsBySchool,
  deactivateAcademicYears,
  activateAcademicYear,
  getAcademicYearById,
} = require("../models/academicYearModel");

const {
  findSchoolBySchoolId,
} = require("../models/schoolModel");

async function createAcademicYearService(
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

  const existingYears =
    await getAcademicYearsBySchool(
      schoolDbId
    );

  const isActive =
    existingYears.length === 0;

  if (isActive) {
    await deactivateAcademicYears(
      schoolDbId
    );
  }

  return createAcademicYear({
    ...data,
    schoolId: schoolDbId,
    isActive,
  });
} {
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

  if (data.isActive) {
    await deactivateAcademicYears(
      schoolDbId
    );
  }

  return createAcademicYear({
    ...data,
    schoolId: schoolDbId,
  });
}

async function getAcademicYearsService(
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

  return getAcademicYearsBySchool(
    school.id
  );
}

async function activateAcademicYearService(
  id,
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

  const schoolDbId = school.id;

  const academicYear =
    await getAcademicYearById(
      id,
      schoolDbId
    );

  if (!academicYear) {
    throw new Error(
      "Academic year not found"
    );
  }

  await deactivateAcademicYears(
    schoolDbId
  );

  return activateAcademicYear(
    id,
    schoolDbId
  );
}

module.exports = {
  createAcademicYearService,
  getAcademicYearsService,
  activateAcademicYearService,
};
