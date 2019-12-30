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
      const tasks = await Task.find({});
      return tasks;
    } catch (error) {
      throw error;
    }
  };

  return {
    create,
    getByAuthor
  };
};

module.exports = taskService;
