const router = require("express").Router();

const { getAdminProfile } = require("../controllers/AdminController");
const { getUserList } = require("../controllers/UserController");
const { auth, isAdmin } = require("../middlewares/AuthMiddleware");


router.post("/profile", auth, isAdmin, getAdminProfile);
router.post("/user-list", auth, isAdmin, getUserList);

module.exports = router;