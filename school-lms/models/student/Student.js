const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  classId: { type: String,  },
  section: { type: String, },
  rollNumber: { type: String, },

  status: {
    type: String,
    enum: ["NEW", "ACTIVE"],
    default: "NEW"
  },

  role: {
    type: String,
    default: "STUDENT"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
