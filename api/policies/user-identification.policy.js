const userService = require("../services/user.service");

module.exports = async (req, res, next) => {
  try {
    const body = req.body;
    const [x, mobileNumber] = body.From.replace(/[-\s]/g, "").split("+");

    const findUser = await userService().findByUsernameOrMobile(mobileNumber);
    const registerUser = async x =>
      await userService().register({ mobile_number: x });
    const user = findUser || (await registerUser(mobileNumber));

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
