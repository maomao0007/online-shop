const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Please log in first." });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Save decoded user info for later use
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ success: false, message: "JWT verification failed." });
  }
}

module.exports = authenticateToken;
