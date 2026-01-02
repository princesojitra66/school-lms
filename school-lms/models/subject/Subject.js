const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: String,
  subjectCode: String,

  classId: String,
  section: String,

  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Subject", subjectSchema);
