const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/taskController");
const verifyJWT = require("../../middleware/verifyJWT");

router
  .route("/")
  .post(taskController.createNewTask)
  .get(taskController.getAllTasks);

router.put("/:taskId", taskController.updateTask);


module.exports = router;
