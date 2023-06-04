const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
});

module.exports = mongoose.model("Task", taskSchema);
