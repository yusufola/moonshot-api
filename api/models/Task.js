const mongoose = require("mongoose");
const mongooseAutopopulate = require("mongoose-autopopulate");

const Schema = mongoose.Schema;

const model = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true
    },
    title: String,
    description: String,
    isDone: Boolean,
    deadline: Date
  },
  {
    timestamps: true
  }
);

model.plugin(mongooseAutopopulate);

const Task = mongoose.model("Task", model);

module.exports = Task;
