const { UserRegister, UserLogin } = require("../controllers/AuthController");

const router = require("express").Router();

router.post("/login", UserLogin);
router.post("/create", UserRegister);

module.exports = router;