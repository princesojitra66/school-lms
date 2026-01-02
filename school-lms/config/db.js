const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/school_lms");
console.log("Database connected successfully");

module.exports = mongoose;
