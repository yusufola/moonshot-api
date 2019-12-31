const greetActions = require("../actions/greet.action");
const taskActions = require("../actions/task.action");

const actionService = (req, res, next) => {
  const { welcome, abilityEnquiry } = greetActions(req, res, next);
  const {
    createTask,
    deleteTask,
    deleteAllAuthorTasks,
    completeTask,
    showPending
  } = taskActions(req, res, next);

  const greet = (input, a) => welcome(input, a);
  const abilityEnquiryAction = (input, a) => abilityEnquiry(input, a);

  const createTaskAction = (input, a) => createTask(input, a);
  const deleteAllTasksAction = (input, a) => deleteAllAuthorTasks(input, a);
  const deleteTaskAction = (input, a) => deleteTask(input, a);
  const completeTaskAction = (input, a) => completeTask(input, a);
  const showPendingAction = (input, a) => showPending(input, a);

  return {
    greet,
    abilityEnquiryAction,
    createTaskAction,
    completeTaskAction,
    deleteTaskAction,
    showPendingAction,
    deleteAllTasksAction,
    abilityEnquiryAction
  };
};

module.exports = actionService;
