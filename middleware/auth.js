const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

    req.user = decoded;
    console.log("on auth, req.body:", req.body);
    next();
  } catch (ex) {
    console.log(ex);
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
