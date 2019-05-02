const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const databaseDebugger = require("debug")("app:db");

contacts_get = (req, res) => {
  console.log("CONTACTS get", req.params.id);
  try {
    res.send(req.params);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

contacts_put = (req, res) => {
  console.log("CONTACTS put", req.params.id);
  try {
    res.send(req.params);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
