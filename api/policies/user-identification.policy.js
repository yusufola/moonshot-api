const userService = require('../services/user.service')

module.exports = async (req, res, next) => {
  try {
    const body = req.body
    console.log(body)
    next()
  } catch (error) {
    next(error)
  }
};
