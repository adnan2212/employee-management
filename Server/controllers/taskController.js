const Task = require("../model/Task");

const createNewTask = async (req, res) => {
  console.log("+++++++++++++++++++++++");
  console.log("⏩⏩⏩⏩", req);
  console.log("+++++++++++++++++++++++");
  if (
    !req?.body?.taskType ||
    !req?.body?.subTaskType ||
    !req?.body?.hoursSpent
  ) {
    return res.status(400).json({ message: "All the fields are required" });
  }

  try {
    const userId = req.body;

    const newTask = await Task.create({
      employeeId: userI,
      taskType: req.body.taskType,
      subTaskType: req.body.subTaskType,
      hoursSpent: req.body.hoursSpent,
    });

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createNewTask,
};
