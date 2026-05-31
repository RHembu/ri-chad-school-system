function generateSchoolId() {
  const year = new Date().getFullYear();

  const uniquePart =
    Date.now().toString().slice(-6);

  return `RCS-${year}-${uniquePart}`;
}

module.exports = generateSchoolId;