const Student = require("../models/student/Student");
const Attendance = require("../models/attendance/Attendance");
const StudentAssign = require("../models/assign/student/StudentAssign");
const Subject = require("../models/subject/Subject");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtUtil");

/* ================= STUDENT LOGIN ================= */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });
  if (!student) {
    return res.status(404).json({ success: false, message: "Student not found" });
  }

  const match = await bcrypt.compare(password, student.password);
  if (!match) {
    return res.status(401).json({ success: false, message: "Wrong password" });
  }

  const token = generateToken(student._id, "STUDENT");

  res.json({
    success: true,
    message: "Login success",
    token,
    role: "STUDENT"
  });
};

/* ================= VIEW PROFILE ================= */
exports.getProfile = async (req, res) => {
  const student = await Student.findById(req.user.id).select("-password");

  res.json({
    success: true,
    data: student
  });
};

/* ================= UPDATE PROFILE ================= */
exports.updateProfile = async (req, res) => {
  const { phone, address } = req.body;

  await Student.findByIdAndUpdate(req.user.id, {
    phone,
    address
  });

  res.json({
    success: true,
    message: "Profile updated successfully"
  });
};

/* ================= CHANGE PASSWORD ================= */
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const student = await Student.findById(req.user.id);

  const match = await bcrypt.compare(oldPassword, student.password);
  if (!match) {
    return res.status(401).json({
      success: false,
      message: "Old password incorrect"
    });
  }

  student.password = await bcrypt.hash(newPassword, 10);
  await student.save();

  res.json({
    success: true,
    message: "Password changed successfully"
  });
};

/* ================= VIEW OWN ATTENDANCE ================= */
exports.getMyAttendance = async (req, res) => {
  const records = await Attendance.find({
    studentId: req.user.id
  });

  res.json({
    success: true,
    data: records
  });
};

/* ================= ATTENDANCE PERCENTAGE ================= */
exports.getAttendancePercentage = async (req, res) => {
  const records = await Attendance.find({
    studentId: req.user.id
  });

  const total = records.length;
  const present = records.filter(r => r.status === "PRESENT").length;

  const percentage = total === 0 ? 0 : ((present / total) * 100).toFixed(2);

  res.json({
    success: true,
    totalDays: total,
    presentDays: present,
    attendancePercentage: percentage + "%"
  });
};

/* ================= STUDENT SUBJECT LIST ================= */
exports.getMySubjects = async (req, res) => {
  const assignments = await StudentAssign.find({
    studentId: req.user.id
  }).populate("subjectId");

  const subjects = assignments.map(a => a.subjectId);

  res.json({
    success: true,
    count: subjects.length,
    data: subjects
  });
};