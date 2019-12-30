const User = require("../models/User");

const userService = () => {
  const findByUsernameOrMobile = async data => {
    try {
      const user = await User.findOne({
        $or: [{ username: data }, { mobile_number: data }]
      }).populate("tasks");
      return user;
    } catch (error) {
      throw error;
    }
  };

  const register = async data => {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  };

  return {
    findByUsernameOrMobile,
    register
  };
};

module.exports = userService;
