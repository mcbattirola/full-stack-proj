const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

router.get("/", (req, res) => {
  res.sendFile("../public/index.html");
});

module.exports = router;
