const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/manageUser");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), registerController.getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), registerController.deleteUser);
router.get("/:id", registerController.getUser);
router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.Admin), registerController.getUser);

module.exports = router;
