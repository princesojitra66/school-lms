const router = require("express").Router();
const auth = require("../../middleware/auth");
const roleAuth = require("../../middleware/roleAuth");
const c = require("../../controllers/studentController");

/* AUTH */
router.post("/login", c.login);

/* PROFILE */
router.get("/profile", auth, roleAuth("STUDENT"), c.getProfile);
router.put("/update-profile", auth, roleAuth("STUDENT"), c.updateProfile);

/* PASSWORD */
router.put("/change-password", auth, roleAuth("STUDENT"), c.changePassword);

/* ATTENDANCE */
router.get("/attendance", auth, roleAuth("STUDENT"), c.getMyAttendance);
/* ATTENDANCE PERCENTAGE */
router.get("/attendance-percentage",auth,roleAuth("STUDENT"),c.getAttendancePercentage);

/* SUBJECT LIST */
router.get("/subjects",auth,roleAuth("STUDENT"),c.getMySubjects);

module.exports = router;
