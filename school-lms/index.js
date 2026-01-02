const express = require("express");
require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("METHOD:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("BODY:", req.body);
  console.log("------------------");
  next();
});

/*  VERIFY ROUTE ADDED HERE */
app.use("/api", require("./routes/verifyRoutes"));

app.use("/api/admin", require("./routes/admin/adminRoutes"));
app.use("/api/teacher", require("./routes/teacher/teacherRoutes"));
app.use("/api/student", require("./routes/student/studentRoutes"));


app.listen(3000, () => {
  console.log("SERVER STARTED ON PORT 3000");
});
