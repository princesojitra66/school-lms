const mongoose = require("mongoose");

const teacherAssignSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },

  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true
  },

  classId: {
    type: String,
    required: true
  },

  section: {
    type: String,
    required: true
  },

  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports =
  mongoose.models.TeacherAssign ||
  mongoose.model("TeacherAssign", teacherAssignSchema);
