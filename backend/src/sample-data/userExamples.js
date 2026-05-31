module.exports = {
  superAdmin: {
    roles: ["SUPER_ADMIN"],
  },

  schoolAdmin: {
    roles: ["SCHOOL_ADMIN"],
  },

  principal: {
    roles: ["PRINCIPAL"],
  },

  deputyPrincipal: {
    roles: ["DEPUTY_PRINCIPAL"],
  },

  bursar: {
    roles: ["BURSAR"],
  },

  teacher: {
    roles: ["TEACHER"],
  },

  teacherHod: {
    roles: ["TEACHER", "HOD"],
  },

  classTeacher: {
    roles: ["TEACHER", "CLASS_TEACHER"],
  },

  hodAndClassTeacher: {
    roles: ["TEACHER", "HOD", "CLASS_TEACHER"],
  },

  student: {
    roles: ["STUDENT"],
  },

  parent: {
    roles: ["PARENT"],
  },
};