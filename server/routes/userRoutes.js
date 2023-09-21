const { register, login, users, logOut } = require("../controllers/usersControllers");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/usersRoute/:id", users);
router.get("/logout/:id", logOut)

module.exports = router;