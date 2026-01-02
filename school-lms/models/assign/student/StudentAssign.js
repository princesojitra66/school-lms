const mongoose = require("mongoose");

const studentAssignSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
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
  mongoose.models.StudentAssign ||
  mongoose.model("StudentAssign", studentAssignSchema);
