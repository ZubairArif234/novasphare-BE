const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth");


router.route("/register").post(auth.register);
router.route("/login").post(auth.login);
router.route("/me").get(isAuthenticated, auth.getMe);



module.exports = router;
