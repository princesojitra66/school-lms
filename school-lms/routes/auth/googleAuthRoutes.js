const router = require("express").Router();
const passport = require("passport");

/* ===== ADMIN GOOGLE LOGIN ===== */
router.get(
  "/google/admin",
  passport.authenticate("google-admin", {
    scope: ["profile", "email"],
    session: false
  })
);

router.get(
  "/google/admin/callback",
  passport.authenticate("google-admin", { session: false }),
  (req, res) => {
    res.json({
      success: true,
      role: "ADMIN",
      token: req.user.token
    });
  }
);

/* ===== TEACHER GOOGLE LOGIN ===== */
router.get(
  "/google/teacher",
  passport.authenticate("google-teacher", {
    scope: ["profile", "email"],
    session: false
  })
);

router.get(
  "/google/teacher/callback",
  passport.authenticate("google-teacher", { session: false }),
  (req, res) => {
    res.json({
      success: true,
      role: "TEACHER",
      token: req.user.token
    });
  }
);

/* ===== STUDENT GOOGLE LOGIN ===== */
router.get(
  "/google/student",
  passport.authenticate("google-student", {
    scope: ["profile", "email"],
    session: false
  })
);

router.get(
  "/google/student/callback",
  passport.authenticate("google-student", { session: false }),
  (req, res) => {
    res.json({
      success: true,
      role: "STUDENT",
      token: req.user.token
    });
  }
);

module.exports = router;
