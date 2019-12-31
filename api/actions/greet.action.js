const taskService = require("../services/task.service");

const greetAction = (req, res, next) => {
  const welcome = async (input, a) => {
    try {
      const { user } = req;
      const username = user.username || user.mobile_number;

      const userTasks = await taskService().getByAuthor(req.user.id);

      let response = `${input} ${username}\n\n I'm available to help manage your personal schedules and activities\n\n`;

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
        response += `<br>*_Hint:_*\n_Say something like_:\n_*I want to call Mr Adam* (add an activity todo)_`;
      } else {
        response += `*You currently have no task*.\nWhat do you want to do later?\n\n_one at a time_
          `;
      }

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
