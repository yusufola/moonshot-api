const greetActions = require("../actions/greet.action");
const taskActions = require("../actions/task.action");

const actionService = (req, res, next) => {
  const { welcome } = greetActions(req, res, next);
  const { createTask, deleteAllAuthorTasks } = taskActions(req, res, next);

  const greet = (input, a) => welcome(input, a);
  const createTaskAction = (input, a) => createTask(input, a);
  const deleteAllTasksAction = (input, a) => deleteAllAuthorTasks(input, a);

  return {
    greet,
    createTaskAction,
    deleteAllTasksAction
  };
};

module.exports = actionService;
