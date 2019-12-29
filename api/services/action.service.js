const actionService = (req, res, next) => {
  const greet = (input, a) => {
    return `${input} @${req.user.username ||
      req.user
        .mobile_number}\nYou are not tracking any goals/priorites. \nWhat is your current topmost priority?
        `;
  };

  return {
    greet
  };
};

module.exports = actionService;
