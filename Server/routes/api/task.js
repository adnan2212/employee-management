const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/taskController");
const verifyJWT = require("../../middleware/verifyJWT");

router
  .route("/")
  .post(taskController.createNewTask)
  .get(taskController.getAllTasks);

router.get("/details", taskController.getAllTaskData);
router.put("/:taskId", taskController.updateTask);
router.delete("/:taskId", taskController.deleteTask);

module.exports = router;
