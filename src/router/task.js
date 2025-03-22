const express = require("express");
const router = express.Router();
const task = require("../controllers/taskController");
const { isAuthenticated } = require("../middleware/auth");


router.route("/").post(isAuthenticated, task.create).get(isAuthenticated,task.getAll);
router.route("/:id").patch(isAuthenticated, task.update).delete(isAuthenticated,task.deleteTask);



module.exports = router;
