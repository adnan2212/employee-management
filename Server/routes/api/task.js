const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/taskController");
const ROLES_LIST = require("../../config/roles_list");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .post(taskController.createNewTask)
  .get(taskController.getAllTasks);

router.get(
  "/details",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  taskController.getAllTaskData
);
router.put("/:taskId", taskController.updateTask);
router.delete("/:taskId", taskController.deleteTask);

router.delete(
  "/admin/:taskId",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  taskController.deleteUserTaskByAdmin
);

router.put(
  "/admin/:taskId",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  taskController.updateUserTaskByAdmin
);

module.exports = router;
