function superAdminOnly(req, res) {
  return res.json({
    success: true,
    message: "Welcome Super Admin",
    user: req.user,
  });
}

module.exports = {
  superAdminOnly,
};