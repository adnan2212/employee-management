const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/taskController");

router.route("/").post(taskController.createNewTask);

module.exports = router;
