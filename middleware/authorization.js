module.exports = (...role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!role.includes(userRole)) {
      return res.status(403).json({
        status: "fail",
        error: "You are not Authorized to access this",
      });
    }
    next();
  };
};
