const greetAction = require("../actions/greet.action");

const actionService = (req, res, next) => {
  const { welcome } = greetAction(req, res, next);

  const greet = (input, a) => welcome(input, a);

  return {
    greet
  };
};

module.exports = actionService;
