const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  taskType: {
    type: String,
    required: true,
  },
  subTaskType: {
    type: String,
    required: true,
  },
  hoursSpent: {
    type: Number,
    required: true,
    min: 0,
  },
  comment: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
