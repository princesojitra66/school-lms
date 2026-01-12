const Attendance = require("../models/attendance/Attendance");

/* ===== MARK ATTENDANCE (TEACHER) ===== */
exports.markAttendance = async (req, res) => {
  const { studentId, subjectId, date, status } = req.body;

  if (!studentId || !subjectId || !date || !status) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const attendance = new Attendance({
    studentId,
    subjectId,
    teacherId: req.user.id,
    markedBy: req.user.id,
    date,
    status
  });

  await attendance.save();

  console.log("ATTENDANCE MARKED:", studentId, date);

  res.status(201).json({
    success: true,
    message: "Attendance marked successfully"
  });
};

/* ===== GET STUDENT ATTENDANCE ===== */
exports.getStudentAttendance = async (req, res) => {
  const records = await Attendance.find({
    studentId: req.params.studentId
  });

  res.json({
    success: true,
    data: records
  });
};
