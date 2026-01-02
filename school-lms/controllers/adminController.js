const bcrypt = require("bcryptjs");

/* ===== MODELS ===== */
const Admin = require("../models/admin/Admin");
const Student = require("../models/student/Student");
const Teacher = require("../models/teacher/Teacher");
const Subject = require("../models/subject/Subject");

const StudentAssign = require("../models/assign/student/StudentAssign");
const TeacherAssign = require("../models/assign/teacher/TeacherAssign");

const { generateToken } = require("../utils/jwtUtil");

/* ================= ADMIN REGISTER ================= */
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !email || !password) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const exists = await Admin.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const admin = new Admin({
    firstName,
    lastName,
    email,
    password: hash
  });

  await admin.save();

  console.log("ADMIN REGISTERED:", email);
  res.json({ message: "Admin registered successfully" });
};

/* ================= ADMIN LOGIN ================= */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    return res.status(401).json({ message: "Wrong password" });
  }

  const token = generateToken(admin._id, "ADMIN");

  console.log("ADMIN LOGIN:", email);
  res.json({
    message: "Login success",
    token,
    role: "ADMIN"
  });
};

/* ================= ADD STUDENT ================= */
exports.addStudent = async (req, res) => {
  const hash = await bcrypt.hash("1234", 10);

  const student = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
    classId: req.body.classId,
    section: req.body.section,
    rollNumber: req.body.rollNumber
  });

  await student.save();

  console.log("ADMIN ADDED STUDENT:", student.email);
  res.json({ message: "Student added successfully" });
};

/* ================= UPDATE STUDENT ================= */
exports.updateStudent = async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  console.log("ADMIN UPDATED STUDENT:", req.params.id);
  res.json({ message: "Student updated successfully" });
};

/* ================= DELETE STUDENT ================= */
exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  console.log("ADMIN DELETED STUDENT:", req.params.id);
  res.json({ message: "Student deleted successfully" });
};

/* ================= ADD TEACHER ================= */
exports.addTeacher = async (req, res) => {
  const { firstName, lastName, email, qualification, experience } = req.body;

  if (!firstName || !lastName || !email || !qualification || !experience) {
    return res.status(400).json({
      success: false,
      message: "All teacher fields are required"
    });
  }

  const exists = await Teacher.findOne({ email });
  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Teacher already exists"
    });
  }

  const hash = await bcrypt.hash("1234", 10);

  const teacher = new Teacher({
    firstName,
    lastName,
    email,
    password: hash,
    qualification,
    experience,
    status: "NEW"
  });

  await teacher.save();

  console.log("TEACHER SAVED:", teacher.email);

  res.status(201).json({
    success: true,
    message: "Teacher added successfully",
    data: {
      id: teacher._id,
      email: teacher.email,
      status: teacher.status
    }
  });
};


/* ================= ACTIVATE TEACHER ================= */

exports.activateTeacher = async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }

  teacher.status = "ACTIVE";
  await teacher.save();

  console.log("TEACHER ACTIVATED:", teacher.email);

  res.json({
    message: "Teacher activated successfully"
  });
};


/* ================= UPDATE TEACHER ================= */
exports.updateTeacher = async (req, res) => {
  await Teacher.findByIdAndUpdate(req.params.id, req.body);
  console.log("ADMIN UPDATED TEACHER:", req.params.id);
  res.json({ message: "Teacher updated successfully" });
};

/* ================= DELETE TEACHER ================= */
exports.deleteTeacher = async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  console.log("ADMIN DELETED TEACHER:", req.params.id);
  res.json({ message: "Teacher deleted successfully" });
};

/* ================= ADD SUBJECT ================= */
exports.addSubject = async (req, res) => {
  const subject = new Subject({
    subjectName: req.body.subjectName,
    subjectCode: req.body.subjectCode,
    classId: req.body.classId,
    section: req.body.section
  });

  await subject.save();

  console.log("ADMIN ADDED SUBJECT:", subject.subjectName);
  res.json({ message: "Subject added successfully" });
};

/* ================= ASSIGN SUBJECT TO STUDENT ================= */
exports.assignSubjectToStudent = async (req, res) => {
  const { studentId, subjectId, classId, section } = req.body;

  const assign = new StudentAssign({
    studentId,
    subjectId,
    classId,
    section,
    assignedBy: req.user.id
  });

  await assign.save();

  console.log("ADMIN ASSIGNED SUBJECT TO STUDENT");
  res.json({ message: "Subject assigned to student successfully" });
};

/* ================= ASSIGN TEACHER TO SUBJECT ================= */
exports.assignTeacherToSubject = async (req, res) => {
  const { teacherId, subjectId, classId, section } = req.body;

  const assign = new TeacherAssign({
    teacherId,
    subjectId,
    classId,
    section,
    assignedBy: req.user.id
  });

  await assign.save();

  console.log("ADMIN ASSIGNED TEACHER TO SUBJECT");
  res.json({ message: "Teacher assigned to subject successfully" });
};
