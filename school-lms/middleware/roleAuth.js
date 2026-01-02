module.exports = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        message: "You are not authorized to access this route"
      });
    }

    next();
  };
};
