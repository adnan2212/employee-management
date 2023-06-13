const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/taskController");

router.route("/").post(taskController.createNewTask);
router.get("/", taskController.getAllTasks);
router.put("/", taskController.updateTask);

module.exports = router;
