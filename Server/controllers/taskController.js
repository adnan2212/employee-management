const Task = require("../model/Task");

const createNewTask = async (req, res) => {
  console.log("LINE 4: ", req.cookies);
  console.log("LINE 5: ", req.user);
  if (
    !req?.user ||
    !req?.cookies?.userId ||
    !req?.body?.taskType ||
    !req?.body?.subTaskType ||
    !req?.body?.hoursSpent
  ) {
    return res.status(400).json({ message: "All the fields are required" });
  }

  try {
    const newTask = await Task.create({
      userId: req.cookies.userId,
      userName: req.user,
      taskType: req.body.taskType,
      subTaskType: req.body.subTaskType,
      hoursSpent: req.body.hoursSpent,
    });
    console.log("LINE 24: ", newTask);

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllTasks = async (req, res) => {
  // Extract the userId from the request query
  const userId = req?.cookies?.userId;
  console.log("line 6", req.cookies?.userId);
  let tasks;

  if (userId) {
    // Retrieve tasks associated with the provided userId
    tasks = await Task.find({ userId: req?.cookies?.userId }).exec();
    console.log(tasks);
  } else {
    // Retrieve all tasks if no userId is provided
    // tasks = await Task.find();
    tasks = [];
    console.log(tasks);
  }

  // Check if tasks are found
  if (!tasks || tasks.length === 0) {
    // Return a 204 No Content status if no tasks are found
    return res.status(204).json({ message: "No tasks found" });
  }

  // Return the retrieved tasks
  res.json(tasks);
};

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTaskData = req.body; // Updated task data from the request body

    // Update the task in the database using the taskId and updatedTaskData
    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData, {
      new: true,
    });

    // Return the updated task as the response
    res.json(updatedTask);
  } catch (error) {
    console.error("Error editing task:", error);
    res.status(500).json({ error: "Failed to edit task" });
  }
};

/* const updateTask = async (req, res) => {
  if (!req?.cookies?.userId) {
    return res.status(400).json({ message: "userId parameter is required." });
  }

  const task = await Task.findOne({
    userId: req.cookies.userId,
  }).exec();
  if (!task) {
    return res
      .status(204)
      .json({ message: `No mosque matches userId ${req.cookies.userId}.` });
  }

  if (req.body?.taskType) task.taskType = req.body.taskType;
  if (req.body?.subTaskType) task.subTaskType = req.body.subTaskType;
  if (req.body?.hoursSpent) task.hoursSpent = req.body.hoursSpent;

  const result = await task.save();
  res.json(result);
}; */

const updateTaskOld = async (req, res) => {
  // Extract the taskId from the request parameters
  const taskId = req.params._id;

  // Extract the userId from the request query
  const userId = req?.cookies?.userId;

  // Extract the updated task from the request body
  const updatedTask = req.body;

  // Check if the updated task is empty
  if (!updatedTask) {
    // Return a 400 Bad Request status if the updated task is empty
    return res.status(400).json({ message: "Task details are required" });
  }

  // Check if the taskId is provided
  if (!taskId) {
    // Return a 400 Bad Request status if the taskId is not provided
    return res.status(400).json({ message: "Task ID is required" });
  }

  // Check if the userId is provided
  if (!userId) {
    // Return a 400 Bad Request status if the userId is not provided
    return res.status(400).json({ message: "User ID is required" });
  }

  // Retrieve the task associated with the provided taskId and userId
  const task = await Task.findOne({ _id: taskId, userId: userId }).exec();

  // Check if the task is found
  if (!task) {
    // Return a 404 Not Found status if the task is not found
    return res.status(404).json({ message: "Task not found" });
  }

  // Update the task
  task.taskType = updatedTask.taskType;
  task.subTaskType = updatedTask.subTaskType;
  task.hoursSpent = updatedTask.hoursSpent;

  // Save the updated task
  await task.save();

  // Return the updated task
  res.json(task);
};

const deleteTask = async (req, res) => {
  // Extract the taskId from the request parameters
  const taskId = req.params.taskId;

  // Extract the userId from the request query
  const userId = req?.cookies?.userId;

  // Check if the taskId is provided
  if (!taskId) {
    // Return a 400 Bad Request status if the taskId is not provided
    return res.status(400).json({ message: "Task ID is required" });
  }

  // Check if the userId is provided
  if (!userId) {
    // Return a 400 Bad Request status if the userId is not provided
    return res.status(400).json({ message: "User ID is required" });
  }

  // Retrieve the task associated with the provided taskId and userId
  const task = await Task.findOne({ _id: taskId, userId: userId }).exec();

  // Check if the task is found
  if (!task) {
    // Return a 404 Not Found status if the task is not found
    return res.status(404).json({ message: "Task not found" });
  }

  // Delete the task
  await task.delete();

  // Return a 204 No Content status
  res.status(204).json();
};

module.exports = {
  createNewTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
