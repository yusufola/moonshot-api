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

  //returns pending tasks
  const getByAuthor = async (authorId, isDone = false) => {
    try {
      const tasks = await Task.find({ author: authorId, isDone });
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

  const deleteOne = async ({ authorId, taskId }) => {
    try {
      const task = await Task.findOneAndRemove({
        _id: taskId,
        author: authorId
      });
      return task;
    } catch (error) {
      throw error;
    }
  };

  const toggleCompletion = async ({ taskId, isDone }) => {
    try {
      const task = await Task.findByIdAndUpdate(taskId, { isDone });
      return task;
    } catch (error) {
      throw error;
    }
  };

  const update = async (taskId, data) => {
    try {
      const task = await Task.findByIdAndUpdate(taskId, data);
      return task;
    } catch (error) {
      throw error;
    }
  };

  const findByTitle = async title => {
    const task = await Task.findOne({
      title: { $regex: title, $options: "i" }
    });
    return task;
  };

  return {
    create,
    getByAuthor,
    deleteAllAuthorTasks,
    deleteOne,
    toggleCompletion,
    update,
    findByTitle
  };
};

module.exports = taskService;
