const router = require("express").Router();

const auth = require("../../middleware/auth");
const roleAuth = require("../../middleware/roleAuth");
const c = require("../../controllers/adminController");

/* AUTH */
router.post("/register", c.register);
router.post("/login", c.login);

/* STUDENT */
router.post("/add-student", auth, roleAuth("ADMIN"), c.addStudent);
router.put("/update-student/:id", auth, roleAuth("ADMIN"), c.updateStudent);
router.delete("/delete-student/:id", auth, roleAuth("ADMIN"), c.deleteStudent);

/* TEACHER */
router.post("/add-teacher", auth, roleAuth("ADMIN"), c.addTeacher);
router.put("/update-teacher/:id", auth, roleAuth("ADMIN"), c.updateTeacher);
router.delete("/delete-teacher/:id", auth, roleAuth("ADMIN"), c.deleteTeacher);
router.put("/activate-teacher/:id", auth, roleAuth("ADMIN"), c.activateTeacher);

/* SUBJECT */
router.post("/add-subject", auth, roleAuth("ADMIN"), c.addSubject);

/* ASSIGNMENTS */
router.post("/assign-student-subject", auth, roleAuth("ADMIN"), c.assignSubjectToStudent);
router.post("/assign-teacher-subject", auth, roleAuth("ADMIN"), c.assignTeacherToSubject);

module.exports = router;
