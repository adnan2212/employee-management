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
    return res.status(400).json({ message: "All the Feilds required" });
  }

  try {
    const newTask = await Task.create({
      employeeId: req.user._id,
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
