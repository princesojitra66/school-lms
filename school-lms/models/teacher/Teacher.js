const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  qualification: { type: String, required: true },
  experience: { type: String, required: true },

  status: {
    type: String,
    enum: ["NEW", "ACTIVE"],
    default: "NEW"
  },

  role: {
    type: String,
    default: "TEACHER"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

/* 🔥 THIS LINE MUST SAY Teacher */
module.exports =
  mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);
