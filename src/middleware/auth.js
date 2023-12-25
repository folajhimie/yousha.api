const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {

  const authHeader = req.headers['authorization'];

  // console.log("all the code in the header..", req.header, req.headers, "req in the header..", authHeader);


  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]; // Split the token from the 'Bearer ' string
    req.token = token; // Set the token on the request object for future use
    if (!token)
      return res.status(401).send("Access denied. Not authenticated...");

    try {
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      const decoded = jwt.verify(token, jwtSecretKey);
  
      req.user = decoded;
      // console.log("req in the user...", req.user, " the other token..", req.token);
      next();
    } catch (ex) {
      res.status(400).send("Invalid auth token...");
    }
  }

};

// For User Profile
const isUser = (req, res, next) => {
  auth(req, res, () => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Access denied. Not authorized...");
    }
  });
};

// For Admin
const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Access denied. Not authorized...");
    }
  });
};

module.exports = { auth, isUser, isAdmin };
