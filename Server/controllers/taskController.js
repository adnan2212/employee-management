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

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createNewTask,
};
