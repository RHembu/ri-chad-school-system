const bcrypt = require("bcryptjs");

const generateSchoolId =
  require("../utils/generateSchoolId");

const generateTempPassword =
  require("../utils/generateTempPassword");

const {
  createSchool,
  findSchoolBySchoolId,
} = require("../models/schoolModel");

const {
  createUser,
} = require("../models/userModel");

const {
  createAuditLog,
} = require("../models/auditLogModel");

async function createSchoolService(data) {
  const {
    schoolName,
    schoolEmail,
    schoolPhone,
    schoolType,
    schoolLevel,
    schoolAddress,

    adminFullName,
    adminUsername,
    adminEmail,

    isDemo,
    demoExpiresAt,
  } = data;

  const schoolId =
    generateSchoolId(schoolName);

  const existingSchool =
    await findSchoolBySchoolId(
      schoolId
    );

  if (existingSchool) {
    throw new Error(
      "School already exists"
    );
  }

  const tempPassword =
    generateTempPassword();

  const hashedPassword =
    await bcrypt.hash(
      tempPassword,
      10
    );

  const school =
    await createSchool({
      schoolId,
      schoolName,
      schoolEmail,
      schoolPhone,
      schoolType,
      schoolLevel,
      schoolAddress,

      subscriptionStatus:
        "active",

      isDemo:
        isDemo || false,

      demoExpiresAt:
        demoExpiresAt || null,
    });

  const schoolAdmin =
    await createUser({
      schoolId,

      fullName:
        adminFullName,

      username:
        adminUsername,

      email:
        adminEmail,

      password:
        hashedPassword,

      role:
        "school_admin",

      mustChangePassword:
        true,
    });

  await createAuditLog({
    schoolId,

    userId:
      schoolAdmin.id,

    action:
      "CREATE_SCHOOL",

    description:
      `School ${schoolName} created`,
  });

  return {
    school,
    schoolAdmin,
    temporaryPassword:
      tempPassword,
  };
}

module.exports =
  createSchoolService;