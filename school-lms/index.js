const express = require("express");
const passport = require("passport");

require("./config/db");
require("./config/passportGoogle");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

app.use(passport.initialize());

/* ROUTES */
app.use("/auth", require("./routes/auth/googleAuthRoutes"));
app.use("/api/admin", require("./routes/admin/adminRoutes"));
app.use("/api/teacher", require("./routes/teacher/teacherRoutes"));
app.use("/api/student", require("./routes/student/studentRoutes"));
app.use("/api/attendance", require("./routes/attendance/attendanceRoutes"));

app.get("/", (req, res) => {
  res.json({ message: "School LMS API Running" });
});

app.listen(3000, () => console.log("SERVER STARTED ON PORT 3000"));
