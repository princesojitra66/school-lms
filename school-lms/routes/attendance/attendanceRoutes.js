const router = require("express").Router();

const auth = require("../../middleware/auth");
const roleAuth = require("../../middleware/roleAuth");
const c = require("../../controllers/attendanceController");

/* TEACHER MARK ATTENDANCE */
router.post("/mark",auth,roleAuth("TEACHER"),c.markAttendance);

/* ADMIN / TEACHER VIEW STUDENT ATTENDANCE */
router.get("/student/:studentId",auth,c.getStudentAttendance);

module.exports = router;
