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
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    // Return the updated task as the response
    res.json(updatedTask);
  } catch (error) {
    console.error("Error editing task:", error);
    res.status(500).json({ error: "Failed to edit task" });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  console.log("taskId:", taskId); // Debug statement

  if (!taskId) {
    return res.status(400).json({ message: "Task ID is required" });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    console.log("deletedTask:", deletedTask); // Debug statement

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).json();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

const getAllTaskData = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createNewTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getAllTaskData,
};
