const greetActions = require("../actions/greet.action");
const taskActions = require("../actions/task.action");

const actionService = (req, res, next) => {
  const { welcome } = greetActions(req, res, next);
  const {
    createTask,
    deleteTask,
    deleteAllAuthorTasks,
    completeTask
  } = taskActions(req, res, next);

  const greet = (input, a) => welcome(input, a);
  const createTaskAction = (input, a) => createTask(input, a);
  const deleteAllTasksAction = (input, a) => deleteAllAuthorTasks(input, a);
  const deleteTaskAction = (input, a) => deleteTask(input, a);
  const completeTaskAction = (input, a) => completeTask(input, a);

  return {
    greet,
    createTaskAction,
    completeTaskAction,
    deleteTaskAction,
    deleteAllTasksAction
  };
};

module.exports = actionService;
