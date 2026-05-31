function tenantMiddleware(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    req.schoolId = req.user.schoolId;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Tenant resolution failed",
    });
  }
}

module.exports = tenantMiddleware;