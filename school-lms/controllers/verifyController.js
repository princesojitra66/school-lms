const Admin = require("../models/admin/Admin");
const Teacher = require("../models/teacher/Teacher");
const Student = require("../models/student/Student");

exports.verify = async (req, res) => {
  try {
    let user = null;

    if (req.user.role === "ADMIN") {
      user = await Admin.findById(req.user.id).select("-password");
    }

    if (req.user.role === "TEACHER") {
      user = await Teacher.findById(req.user.id).select("-password");
    }

    if (req.user.role === "STUDENT") {
      user = await Student.findById(req.user.id).select("-password");
    }

    if (!user) {
      return res.status(401).json({ message: "User not verified" });
    }

    res.json({
      message: "User verified successfully",
      role: req.user.role,
      user
    });

  } catch (err) {
    console.log("VERIFY ERROR:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
