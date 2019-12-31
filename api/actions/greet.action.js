const taskService = require("../services/task.service");

const greetAction = (req, res, next) => {
  const welcome = async (input, a) => {
    try {
      const { user } = req;
      const username =
        user.username || `${user.mobile_number}(I don't know your name yet)`;

      const userTasks = await taskService().getByAuthor(req.user.id);

      let response = `${input} ${username}\n\nI'm your *Calendar*, always available to help manage your personal schedules and plan your activities\n\n`;

      if (userTasks.length > 0) {
        const taskToString = await userTasks.reduce(
          (string, currentTask, i) => {
            string += `(${i + 1}) ${currentTask.title}. ${
              currentTask.isDone ? "✅" : ""
            }\n`;
            return string;
          },
          ""
        );
        response += `*You have _${userTasks.length}_ thing${
          userTasks.length > 1 ? "s" : ""
        } to do*\n${taskToString}`;
      } else {
        response += `<br>*You currently have nothing planned*.\nWhat do you have in plan to do later?
          `;
      }

      response += `<br>*_Hint:_*\n\n_Say something like_:\n\n_*I want to call Mr Adam* (add an activity todo)_`;

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    welcome
  };
};

module.exports = greetAction;
