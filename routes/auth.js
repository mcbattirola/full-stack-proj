const express = require("express");
const router = express.Router();
const _ = require("lodash");
const mongoose = require("mongoose");
const databaseDebugger = require("debug")("app:db");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const path = require("path");
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  console.log("AUTH POST REQUESTED: ", req.body);
  const failedLoginMessage = "Invalid email or password.";
  const { error } = validateAuth(req.body);
  if (error) {
    res.status(400).send(JSON.stringify({ error: error.details[0].message }));
    return;
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send(JSON.stringify({ error: failedLoginMessage }));

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send(JSON.stringify({ error: failedLoginMessage }));

  const token = user.generateAuthToken();
  //res.send({ token });
  res.send({ token });
});

function validateAuth(request) {
  const schema = {
    email: Joi.string()
      .min(3)
      .max(255)
      .required(),
    password: Joi.string().required()
  };

  return Joi.validate(request, schema);
}

module.exports = router;
