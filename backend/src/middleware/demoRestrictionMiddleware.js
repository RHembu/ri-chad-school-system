function demoRestrictionMiddleware(
  req,
  res,
  next
) {
  try {
    const school = req.school;

    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    if (
      school.isDemo &&
      new Date() > new Date(school.demoEndDate)
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Demo period expired. System is now read-only.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Demo restriction check failed",
    });
  }
}

module.exports =
  demoRestrictionMiddleware;