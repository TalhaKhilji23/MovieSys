const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ msg: "Not authorized. No token" });
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];

    // Update the expiresIn option based on your preferred expiration time
    const expiresIn = "1d"; 

    jwt.verify(token, process.env.JWT_SECRET, { expiresIn }, (err, data) => {
      if (err) return res.status(403).json({ msg: "Wrong or expired token" });
      else {
        req.user = data; 
        next();
      }
    });
  }
};

module.exports = verifyToken;
