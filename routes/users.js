const express = require("express");
const router = express.Router();
const _ = require("lodash");
const mongoose = require("mongoose");
const databaseDebugger = require("debug")("app:db");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

const { User, validateUser } = require("../models/user");

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });

    res.send(_.map(users, u => _.pick(u, ["_id", "name", "email", "kt"])));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/self", auth, async (req, res) => {
  console.log("-----GET USER SELF-----");
  try {
    const result = await User.findById(req.user._id);

    // const acc = users.find(c => c.id === parseInt(req.params.id));
    if (!result) {
      // 404 resource not found
      res.status(404).send("User with the given ID was not found");
    }

    res.send(_.pick(result, ["_id", "name", "email", "kt", "balance"]));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//create user
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  let user = populateUserFromRequest(req);
  console.log("user: ", user);

  //checks if the email is already used
  const unavailable = await User.findOne({ email: req.body.email });
  if (unavailable)
    return res.status(400).send("Email already registered in our database");

  //assign an account number
  currentMaxAccount = await User.findOne().sort("-account");
  user.account = currentMaxAccount ? currentMaxAccount.account + 1 : 0;

  //starting balance as 100 for debugging reasons
  user.balance = 100;
  //assign creation_date
  user.creation_date = new Date();

  //hashing password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  //save in database
  try {
    user = await user.save();

    databaseDebugger(user);
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["name", "email", "account", "kt", "balance"]));
  } catch (err) {
    databaseDebugger(err);
    res.status(400).send(err.message);
  }
});

//update user
router.put("/self", auth, async (req, res) => {
  const user = populateUserFromRequest(req);
  user._id = req.user._id;
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //look up for the user and update
  try {
    const acc = await User.findByIdAndUpdate(req.user._id, user, {
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

//delete user
router.delete("/self", auth, async (req, res) => {
  try {
    const acc = await User.findByIdAndRemove(req.user._id);
    if (!acc) res.status(404).send("User with the given ID was not found");
    res.send(acc);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//contacts
const { Contact, validateContacts } = require("../models/contact");
router.get("/self/contacts/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.send(user ? user.contacts : "Cannot find user with the given ID.");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/self/contacts/:contactId", auth, async (req, res) => {
  try {
    const user = await User.findById({
      _id: req.user._id
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

router.post("/self/contacts/", auth, async (req, res) => {
  //check if the body of the call was ok

  console.log("--------------------");
  console.log("post contact method called");
  console.log("--------------------");

  // const { error } = validateUser(req.body);
  // if (error) {
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }

  let user = await User.findById(req.user._id);
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

//transfers
const { Transfer, validateTransfers } = require("../models/transfer");
router.get("/self/transfers/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.send(user ? user.transfers : "Cannot find user with the given ID.");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/self/transfers/:transferId", auth, async (req, res) => {
  try {
    const user = await User.findById({
      _id: req.paramreq.user._id
    });
    if (!user) {
      // 404 resource not found
      res.status(404).send("User with the given ID was not found");
    }
    const transfer = user.transfers.id(req.params.transferId);
    if (!transfer) {
      // 404 resource not found
      res.status(404).send("Transfer with the given ID was not found");
    }
    res.send(transfer);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/self/transfers/", auth, async (req, res) => {
  //check if the body of the call was ok

  console.log("--------------------");
  console.log("post transfer method called");
  console.log("--------------------");

  // const { error } = validateUser(req.body);
  // if (error) {
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }

  let user = await User.findById(req.user._id);
  if (!user) res.status(404).send("User with the given ID was not found");

  const transfer = populateTransfer(req);
  transfer.date = Date.now;
  databaseDebugger("transfer: ", transfer);
  user.transfers.push(transfer);
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

//credit cards
const { CreditCard, validateCreditCards } = require("../models/creditCard");
router.get("/self/creditCards/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.send(user ? user.creditCards : "Cannot find user with the given ID.");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/self/creditCards/:creditCardId", auth, async (req, res) => {
  try {
    const user = await User.findById({
      _id: req.user._id
    });
    if (!user) {
      // 404 resource not found
      res.status(404).send("User with the given ID was not found");
    }
    const creditCard = user.creditCards.id(req.params.creditCardId);
    if (!creditCard) {
      // 404 resource not found
      res.status(404).send("CC with the given ID was not found");
    }
    res.send(creditCard);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/self/creditCards/", auth, async (req, res) => {
  //check if the body of the call was ok

  console.log("--------------------");
  console.log("post creditCards method called");
  console.log("--------------------");

  // const { error } = validateUser(req.body);
  // if (error) {
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }

  let user = await User.findById(req.user._id);
  if (!user) res.status(404).send("User with the given ID was not found");

  const creditCard = populateCreditCard(req);
  databaseDebugger("user: ", user);
  databaseDebugger("creditCard: ", creditCard);
  user.creditCards.push(creditCard);
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
function populateUserFromRequest(req) {
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
function populateTransfer(req) {
  return new Transfer({
    email: req.body.email,
    kt: req.body.kt,
    name: req.body.name,
    account: req.body.account,
    amount: req.body.amount
  });
}
function populateCreditCard(req) {
  return new CreditCard({
    number: req.body.number
  });
}

module.exports = router;
