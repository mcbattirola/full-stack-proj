const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const databaseDebugger = require("debug")("app:db");
const { Account, validate } = require("../models/accounts");

module.exports = router;

router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find().sort({ ownerId: 1, name: 1 });
    res.send(accounts);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Account.findById(req.params.id);
    // const acc = accounts.find(c => c.id === parseInt(req.params.id));
    if (!result) {
      // 404 resource not found
      res.status(404).send("Account with the given ID was not found");
    }
    res.send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  //check if the body of the call was ok
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //save in database
  let account = new Account({
    number: req.body.number,
    name: req.body.name,
    ownerId: req.body.ownerId,
    active: true
  });
  try {
    account = await account.save();
    databaseDebugger(account);
    res.send(account);
  } catch (err) {
    databaseDebugger(err);
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  // 400 Bad Request
  const { error } = validate(req.body); // result. error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const account = new Account({
    _id: req.params.id,
    number: req.body.number,
    name: req.body.name,
    ownerId: req.body.ownerId,
    active: true
  });

  //look up for the account and update
  try {
    const acc = await Account.findByIdAndUpdate(req.params.id, account, {
      new: true
    });
    databaseDebugger(acc);
    res.send(acc);
    // return 404 if it doesnt exist
    if (!acc) res.status(404).send("Account with the given ID was not found");
  } catch (err) {
    databaseDebugger(err);
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const acc = await Account.findByIdAndRemove(req.params.id);
    if (!acc) res.status(404).send("Account with the given ID was not found");
    res.send(acc);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
