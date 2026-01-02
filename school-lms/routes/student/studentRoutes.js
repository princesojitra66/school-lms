const router = require("express").Router();
const auth = require("../../middleware/auth");
const roleAuth = require("../../middleware/roleAuth");
const c = require("../../controllers/studentController");

/* ===== STUDENT AUTH ===== */
router.post("/login", c.login);

/* ===== STUDENT ACTIONS ===== */
router.get("/profile", auth, roleAuth("STUDENT"), c.profile);

module.exports = router;
