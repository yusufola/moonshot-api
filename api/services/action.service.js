const actionService = () => {
    const greet = (input, a)=> {
        return `${input}\nYou are not tracking any goals/priorites. \nWhat is your current topmost priority?
        `
      }

  return {
    greet,
  };
};

module.exports = actionService;
