const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,

  email: {
    type: String,
    unique: true
  },

  password: String,

  phone: String,
  address: String,

  role: {
    type: String,
    default: "ADMIN"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);
