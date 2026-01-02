const jwt = require("jsonwebtoken");

exports.generateToken = (id, role) => {
  return jwt.sign({ id, role }, "SECRET_KEY", { expiresIn: "1d" });
};
