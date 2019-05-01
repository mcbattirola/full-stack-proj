const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

router.get("/", (req, res) => {
  res.send("its alive!");
});

module.exports = router;
