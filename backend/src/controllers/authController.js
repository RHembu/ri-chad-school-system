const changePassword = require(
  "../services/changePasswordService"
);

const login = require(
  "../services/loginService"
);

async function changePasswordController(
  req,
  res
) {
  try {
    const result =
      await changePassword(req.body);

    return res.json({
      success: true,
      message:
        "Password changed successfully",
      user: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function loginController(
  req,
  res
) {
  try {
    const result =
      await login(req.body);

    return res.json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  changePasswordController,
  loginController,
};