const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the cookie
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request object
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = authMiddleware;
