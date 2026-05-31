function getTenantInfo(req, res) {
  return res.json({
    success: true,
    schoolId: req.schoolId,
    user: req.user,
  });
}

module.exports = {
  getTenantInfo,
};