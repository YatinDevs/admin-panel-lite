const jwt = require("jsonwebtoken");
const jwtKey = require("../config/authConfig");

function verifyToken(req, res, next) {
  const token = req.session.name;

  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, jwtKey.secret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
module.exports = verifyToken;
