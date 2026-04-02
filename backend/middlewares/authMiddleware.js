const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // "Decoding token from Bearer <token>"
  if (!token)
    return res.status(401).json({ message: "Invalid authorization header" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Verifying whether user is Active or not and caching the profile data
    const user = await User.findById(decoded.userId).select("isActive role");
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User no longer exists" });
    if (!user.isActive)
      return res
        .status(403)
        .json({ success: false, message: "Account is deactivated" });

    // Attach user info to request so downstream handlers can reuse it
    req.user = {
      userId: decoded.userId,
      role: user.role,
      profile: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };
