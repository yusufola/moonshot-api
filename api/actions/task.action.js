const taskService = require("../services/task.service");
const { NerManager } = require("node-nlp");

const entityManager = new NerManager({ threshold: 0.8 });

const taskAction = (req, res, next) => {
  const createTask = async (input, a) => {
    try {
      const { user, body } = req;
      const username = user.username || user.mobile_number;

      const taskToAdd = entityManager.addNamedEntity("taskToAdd", "trim");
      taskToAdd.addAfterCondition("en", "want to");
      taskToAdd.addAfterCondition("en", "i want to");
      taskToAdd.addAfterCondition("en", "i will");
      taskToAdd.addAfterCondition("en", "will");

      const entitiesResult = await entityManager.findEntities(body.Body, "en");
      const entities = await entitiesResult.reduce((x, current, i) => {
        x[current.entity] = !x[current.entity]
          ? current.utteranceText
          : x[current.entity];
        return x;
      }, []);

      if (!entities.taskToAdd)
        return "Didn't get that.\nKindly rephase e.g _I want to go shopping_";

      const task = entities.taskToAdd; //TODO: find an alternative to this
      const createdTask = await taskService().create({
        title: task,
        author: user.id,
        isDone: false
      });

      let response = `Got it! \n_${createdTask.title}_\n<br>Any other thing you want to do later?`;
      response += `<br>*_Hint_* | _Say something like_:\n\n_*show plans* (see planned activities)_\n\n_*done with 1* (marks first task/or any number you provide as done)_\n\n_*cancel 1* (deletes first task/or any number you provide)_`;

      return response;
    } catch (error) {
      throw error;
    }
  };

  const deleteAllAuthorTasks = async (input, a) => {
    try {
      const { user, body } = req;
      const username = user.username || user.mobile_number;

      const createdTask = await taskService().deleteAllAuthorTasks(user.id);

      let response = `Your tasks have been cleared\n<br>*You currently have no tasks.*\nYou can add new things to do any time you want.`;

      response += `<br>*_Hint_* | _Say something like_:\n\n_*I want to clean my workspace* (adds an activity to do)_\n\n_*what can you do?* (tells you eveything I can do)_`;

      return response;
    } catch (error) {
      throw error;
    }
  };

  const deleteTask = async (input, a) => {
    try {
      const { user, body } = req;
      const username = user.username || user.mobile_number;

      const entitiesResult = await entityManager.findEntities(body.Body, "en");

      const entities = await entitiesResult.reduce((x, current, i) => {
        if (current.entity === "number")
          x[current.entity] = !x[current.entity]
            ? current.resolution.value
            : x[current.entity];
        return x;
      }, []);

      const tasks = await taskService().getByAuthor(user.id);
      const task = tasks[entities.number - 1];

      if (!task) return "Couldn't find the task";

      const deletedTask = await taskService().deleteOne({
        authorId: user.id,
        taskId: task.id
      });

      let response = `Your task _${task.title}_ has been deleted.\n<br>You can add new things to do any time you want.`;

      response += `<br>*_Hint_* | _Say something like_:\n\n_*I want to clean my workspace* (adds an activity to do)_\n\n_*what can you do?* (tells you eveything I can do)_`;

      return response;
    } catch (error) {
      throw error;
    }
  };

  const completeTask = async (input, a) => {
    try {
      const { user, body } = req;
      const username = user.username || user.mobile_number;

      const entitiesResult = await entityManager.findEntities(body.Body, "en");

      const entities = await entitiesResult.reduce((x, current, i) => {
        if (current.entity === "number")
          x[current.entity] = !x[current.entity]
            ? current.resolution.value
            : x[current.entity];
        return x;
      }, []);

      const tasks = await taskService().getByAuthor(user.id);
      const task = tasks[entities.number - 1];

      if (!task) return "Couldn't find the task";

      const completedTask = await taskService().toggleCompletion({
        isDone: true,
        taskId: task.id
      });

      let response = `Well done! 👏\n_${task.title}_ has been checked as done. ✅\n`;

      response += `<br>*_Hint_* | _Say something like_:\n\n_*show completed* (shows all activities you are done with)_`;

      return response;
    } catch (error) {
      throw error;
    }
  };

  const showPending = async (input, a) => {
    try {
      const { user } = req;
      const username = user.username || `@${user.mobile_number}`;

      const userTasks = await taskService().getByAuthor(req.user.id);

      let response = "";

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
        } to do*\n\n${taskToString}`;

        response += `<br>*_Hint_* | _Say something like_:\n\n_*done with 1* (marks first task/or any number you provide as done)_\n\n_*cancel 1* (deletes first task/or any number you provide)_`;
      } else {
        response += `*You currently have nothing planned*.\n\nWhat do you plan to do later?`;

        response += `<br>*_Hint_* | _Say something like_:\n\n_*I want to clean my workspace* (adds an activity to do)_\n\n_*what can you do?* (tells you eveything I can do)_`;
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  const showCompleted = async (input, a) => {
    try {
      const { user } = req;
      const username = user.username || `@${user.mobile_number}`;

      const userTasks = await taskService().getByAuthor(req.user.id, true);

      let response = "";

      if (userTasks.length > 0) {
        const taskToString = await userTasks.reduce(
          (string, currentTask, i) => {
            string += `✅ ${currentTask.title}. ${
              currentTask.isDone ? "✅" : ""
            }\n`;
            return string;
          },
          ""
        );
        response += `*_${userTasks.length}_ job${
          userTasks.length > 1 ? "s" : ""
        }  well done!* 👏\n\n${taskToString}`;

        response += `<br>*_Hint_* | _Say something like_:\n\n_*I want to clean my workspace* (adds an activity to do)_\n\n_*what can you do?* (tells you eveything I can do)_`;
      } else {
        response += `Hmm!\n*You haven't completed any activity*.`;
        response += `<br>*_Hint_* | _Say something like_:\n\n_*show plans* (see planned activities)_\n\n_*done with 1* (marks first task/or any number you provide as done)_\n\n_*cancel 1* (deletes first task/or any number you provide)_`;
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    createTask,
    deleteAllAuthorTasks,
    deleteTask,
    showPending,
    showCompleted,
    completeTask
  };
};

module.exports = taskAction;
