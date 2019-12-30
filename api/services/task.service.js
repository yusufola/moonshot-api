const User = require("../models/User");
const Task = require("../models/Task");

const taskService = () => {
  const create = async data => {
    try {
      const task = await Task.create(data);
      return task;
    } catch (error) {
      throw error;
    }
  };

  const getByAuthor = async authorId => {
    try {
      const tasks = await Task.find({ author: authorId });
      return tasks;
    } catch (error) {
      throw error;
    }
  };

  const deleteAllAuthorTasks = async authorId => {
    try {
      const tasks = await Task.deleteMany({ author: authorId });
      return tasks;
    } catch (error) {
      throw error;
    }
  };

  return {
    create,
    getByAuthor,
    deleteAllAuthorTasks
  };
};

module.exports = taskService;
