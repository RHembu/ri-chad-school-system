const {
  updateSchoolProfile,
} = require("../models/schoolModel");

async function updateSchoolProfileService(
  schoolId,
  data
) {
  const school =
    await updateSchoolProfile(
      schoolId,
      data
    );

  if (!school) {
    throw new Error(
      "School not found"
    );
  }

  return school;
}

module.exports = {
  updateSchoolProfileService,
};