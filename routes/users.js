const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const databaseDebugger = require("debug")("app:db");

const { User, validateUser } = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });
    res.send(users);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    // const acc = users.find(c => c.id === parseInt(req.params.id));
    if (!result) {
      // 404 resource not found
      res.status(404).send("User with the given ID was not found");
    }
    res.send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  //check if the body of the call was ok

  console.log("--------------------");
  console.log("post method called");
  console.log("--------------------");

  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let user = populateUser(req);
  //assign an account number
  currentMaxAccount = await User.findOne().sort("-account");
  user.account = currentMaxAccount ? currentMaxAccount.account + 1 : 0;
  //assign creation_date
  user.creation_date = Date.now;

  //save in database
  try {
    user = await user.save();
    databaseDebugger(user);
    res.send(user);
  } catch (err) {
    databaseDebugger(err);
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  // 400 Bad Request
  // const { error } = validate(req.body); // result. error
  // if (error) {
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }

  const user = populateUser(req);
  user._id = req.params.id;
  //look up for the user and update
  try {
    const acc = await User.findByIdAndUpdate(req.params.id, user, {
      new: true
    });
    databaseDebugger(acc);
    // return 404 if it doesnt exist
    if (!acc) res.status(404).send("User with the given ID was not found");
    res.send(acc);
  } catch (err) {
    databaseDebugger(err);
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const acc = await User.findByIdAndRemove(req.params.id);
    if (!acc) res.status(404).send("User with the given ID was not found");
    res.send(acc);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//contacts
const { Contact, validateContacts } = require("../models/contact");
router.get("/:id/contacts/", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user ? user.contacts : "Cannot find user with the given ID.");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id/contacts/:contactId", async (req, res) => {
  try {
    const user = await User.findById({
      _id: req.params.id
    });
    if (!user) {
      // 404 resource not found
      res.status(404).send("User with the given ID was not found");
    }
    const contact = user.contacts.id(req.params.contactId);
    if (!contact) {
      // 404 resource not found
      res.status(404).send("Contact with the given ID was not found");
    }
    res.send(contact);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/:id/contacts/", async (req, res) => {
  //check if the body of the call was ok

  console.log("--------------------");
  console.log("post contact method called");
  console.log("--------------------");

  // const { error } = validateUser(req.body);
  // if (error) {
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }

  let user = await User.findById(req.params.id);
  if (!user) res.status(404).send("User with the given ID was not found");

  const contact = populateContact(req);
  databaseDebugger("contact: ", contact);
  user.contacts.push(contact);
  //save in database
  try {
    user = await user.save();
    databaseDebugger(user);
    res.send(user);
  } catch (err) {
    databaseDebugger(err);
    res.status(400).send(err.message);
  }
});

//helper methods
function populateUser(req) {
  return new User({
    email: req.body.email,
    password: req.body.password,
    kt: req.body.kt,
    name: req.body.name,
    account: req.body.account,
    balance: req.body.balance,
    creation_date: req.body.creation_date,
    contacts: req.body.contacts,
    transfers: req.body.transfers,
    credit_cards: req.body.credit_cards
  });
}

function populateContact(req) {
  return new Contact({
    email: req.body.email,
    kt: req.body.kt,
    name: req.body.name,
    account: req.body.account
  });
}

module.exports = router;
