const {
  createGradeLevel,
  getGradeLevelsBySchool,
  getGradeLevelById,
  updateGradeLevel,
  deleteGradeLevel,
} = require("../models/gradeLevelModel");

const {
  findSchoolBySchoolId,
} = require("../models/schoolModel");

async function createGradeLevelService(
  schoolId,
  data,
  userId
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

  return createGradeLevel({
    schoolId: school.id,
    gradeName:
      data.gradeName,
    gradeOrder:
      data.gradeOrder,
    createdBy:
      userId,
  });
}

async function getGradeLevelsService(
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

  return getGradeLevelsBySchool(
    school.id
  );
}

async function updateGradeLevelService(
  schoolId,
  gradeLevelId,
  data
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

  const existing =
    await getGradeLevelById(
      gradeLevelId,
      school.id
    );

  if (!existing) {
    throw new Error(
      "Grade level not found"
    );
  }

  return updateGradeLevel(
    gradeLevelId,
    school.id,
    data
  );
}

async function deleteGradeLevelService(
  schoolId,
  gradeLevelId
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

  const existing =
    await getGradeLevelById(
      gradeLevelId,
      school.id
    );

  if (!existing) {
    throw new Error(
      "Grade level not found"
    );
  }

  return deleteGradeLevel(
    gradeLevelId,
    school.id
  );
}

module.exports = {
  createGradeLevelService,
  getGradeLevelsService,
  updateGradeLevelService,
  deleteGradeLevelService,
};