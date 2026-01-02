const router = require("express").Router();
const auth = require("../../middleware/auth");
const roleAuth = require("../../middleware/roleAuth");
const c = require("../../controllers/teacherController");

/* ===== TEACHER AUTH ===== */
router.post("/login", c.login);

/* ===== TEACHER ACTIONS ===== */
router.get("/students", auth, roleAuth("TEACHER"), c.getStudents);
router.put("/update-student/:id", auth, roleAuth("TEACHER"), c.updateStudent);
router.put("/complete-profile",auth,roleAuth("TEACHER"),c.completeProfile);

module.exports = router;
