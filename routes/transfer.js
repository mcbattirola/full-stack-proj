const express = require("express");
const router = express.Router();
const path = require("path");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");
const { User, validateUser } = require("../models/user");
const { Transfer } = require("../models/transfer");

router.get("/", (req, res) => {
  const token = req.header("x-auth-token");
  console.log("token: ", token);

  //todo
});

router.post("/", auth, async (req, res) => {
  //const { error } = validateUser(req.body);
  //   if (error) {
  //     res.status(400).send(error.details[0].message);
  //     console.log(error.details[0].message);
  //     return;
  //   }

  //BUSINESS RULES

  //sender
  let transfer = populateTransferFromRequest(req);
  let sender = await User.findById(req.user._id);

  if (!sender)
    return res
      .status(404)
      .send(JSON.stringify({ error: "Sender user was not found" }));

  transfer.received = false;
  sender.transfers.push(transfer);
  sender.balance = sender.balance - transfer.amount;

  //receiver
  let receiver = await User.findOne({ account: req.body.account });
  if (!receiver)
    res
      .status(404)
      .send(JSON.stringify({ error: "Receiver user was not found" }));

  let receiverTransfer = populateTransferFromRequest(req);

  receiverTransfer.received = false;
  receiver.transfers.push(receiverTransfer);
  receiver.balance = receiver.balance + transfer.amount;

  //BUSINESS RULES
  if (receiver._id.equals(sender._id)) {
    res
      .status(400)
      .send(JSON.stringify({ error: "Can't transfer to yourself." }));
    return;
  }

  try {
    sender = await sender.save();
    receiver = await receiver.save();
    res.send(_.pick(sender, ["name", "email", "account", "kt", "balance"]));
  } catch (err) {
    return res.status(400).send(JSON.stringify({ error: err.message }));
  }
});

//helper methods
function populateTransferFromRequest(req) {
  return new Transfer({
    account: req.body.account,
    amount: req.body.amount,
    received: false
  });
}

module.exports = router;
