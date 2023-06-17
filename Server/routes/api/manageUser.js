const express = require("express");
const router = express.Router();
const registerController = require("../../controllers/manageUser");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const verifyJWT = require("../../middleware/verifyJWT");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), registerController.getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), registerController.deleteUser);
router.get("/:id", registerController.getUser);
router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.Admin), registerController.getUser);

router.post(
  "/adminregister",
  verifyJWT,
  verifyRoles(ROLES_LIST.Admin),
  registerController.handleNewUserByAdmin
);

module.exports = router;
