const Student = require("../models/student/Student");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtUtil");

/* ================= STUDENT LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = generateToken(student._id, "STUDENT");

    console.log("STUDENT LOGIN:", email);
    res.json({ message: "Login success", token, role: "STUDENT" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= VIEW OWN PROFILE ================= */
exports.profile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
