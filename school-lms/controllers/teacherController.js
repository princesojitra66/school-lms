const Teacher = require("../models/teacher/Teacher");
const Student = require("../models/student/Student");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtUtil");

/* ================= TEACHER LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const match = await bcrypt.compare(password, teacher.password);
    if (!match) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = generateToken(teacher._id, "TEACHER");

    console.log("TEACHER LOGIN:", email);
    res.json({ message: "Login success", token, role: "TEACHER" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= VIEW STUDENTS ================= */
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE STUDENT ================= */
exports.updateStudent = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);

    console.log("TEACHER UPDATED STUDENT:", req.params.id);
    res.json({ message: "Student updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.completeProfile = async (req, res) => {
  const teacher = await Teacher.findById(req.user.id);

  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }

  if (teacher.status !== "ACTIVE") {
    return res.status(403).json({
      message: "Teacher not active"
    });
  }

  teacher.phone = req.body.phone;
  teacher.address = req.body.address;
  teacher.bio = req.body.bio;

  await teacher.save();

  console.log("TEACHER PROFILE COMPLETED:", teacher.email);

  res.json({
    message: "Profile completed successfully"
  });
};
