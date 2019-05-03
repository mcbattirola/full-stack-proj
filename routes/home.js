const express = require("express");
const router = express.Router();
const path = require("path");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");

router.get(["/", "home"], (req, res) => {
  const token = req.header("x-auth-token");
  console.log("token: ", token);
  //if user dont have token on the header, go to login page
  // if (!token) {
  //res.sendFile(path.resolve("./public/login.html"));
  //   return;
  // } else {
  //   //otherwise, send user to the home
  res.sendFile(path.resolve("./public/login.html"));
  //   return;
  //res.redirect(path.resolve("./public/home.html"));

  // }
});

router.get(["/main/:token"], (req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
  } catch (ex) {
    console.log(ex);
    res.status(400).send("Invalid token.");
  }

  res.sendFile(path.resolve("./public/home.html"));
});

module.exports = router;
