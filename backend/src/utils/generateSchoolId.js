function generateSchoolId(existingSchools = []) {
  const year = new Date().getFullYear();

  const currentYearSchools = existingSchools.filter((school) =>
    school.schoolId?.startsWith(`RCS-${year}`)
  );

  const nextNumber = currentYearSchools.length + 1;

  const sequence = String(nextNumber).padStart(4, "0");

  return `RCS-${year}-${sequence}`;
}

module.exports = generateSchoolId;