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

const {
  createAcademicPeriod,
  getAcademicPeriodsByYear,
} = require("../models/academicPeriodModel");

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

  const academicYear =
    await createAcademicYear({
      ...data,
      schoolId: schoolDbId,
      isActive,
    });

  let defaultPeriods = [];

  const schoolType =
    (
      school.school_type || ""
    ).toLowerCase();

  if (
    schoolType.includes(
      "primary"
    ) ||
    schoolType.includes(
      "secondary"
    )
  ) {
    defaultPeriods = [
      {
        name: "Term 1",
        type: "TERM",
        order: 1,
      },
      {
        name: "Term 2",
        type: "TERM",
        order: 2,
      },
      {
        name: "Term 3",
        type: "TERM",
        order: 3,
      },
      {
        name: "Term 4",
        type: "TERM",
        order: 4,
      },
    ];
  }

  if (
    schoolType.includes(
      "college"
    ) ||
    schoolType.includes(
      "vocational"
    )
  ) {
    defaultPeriods = [
      {
        name: "Semester 1",
        type: "SEMESTER",
        order: 1,
      },
      {
        name: "Semester 2",
        type: "SEMESTER",
        order: 2,
      },
    ];
  }

  const existingPeriods =
    await getAcademicPeriodsByYear(
      academicYear.id,
      schoolDbId
    );

  for (const period of defaultPeriods) {
    const alreadyExists =
      existingPeriods.find(
        (p) =>
          p.period_name ===
          period.name
      );

    if (!alreadyExists) {
      await createAcademicPeriod({
        academicYearId:
          academicYear.id,
        schoolId:
          schoolDbId,
        periodName:
          period.name,
        periodType:
          period.type,
        periodOrder:
          period.order,
        startDate: null,
        endDate: null,
      });
    }
  }

  return academicYear;
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