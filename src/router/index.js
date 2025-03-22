const router = require("express").Router();
const auth = require("./auth");
const task = require("./task");

router.use("/auth", auth);
router.use("/task", task);

module.exports = router;
