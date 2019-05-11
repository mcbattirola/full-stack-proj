const express = require("express");
const router = express.Router();
const path = require("path");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");
const { User, validateUser } = require("../models/user");
const { Transfer } = require("../models/transfer");
const moment = require("moment");

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
  console.log("--------------------");
  console.log("post transfer method called, body:\n", req.body);
  console.log("--------------------");

  //sender
  let transfer = populateTransferFromRequest(req);
  let sender = await User.findById(req.user._id);

  //if the transfers value is greater than 1000, requires password
  if (transfer.amount > 1000) {
    if (!req.body.password) {
      return res.status(400).send(
        JSON.stringify({
          error: "Transfers greater than 1000 require password."
        })
      );
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      sender.password
    );
    if (!validPassword)
      return res.status(400).send(
        JSON.stringify({
          error: "Incorrect password."
        })
      );
  }

  if (!sender)
    return res
      .status(404)
      .send(JSON.stringify({ error: "Sender user was not found" }));

  //IF THE SAME TRANSFER IS SEND IN A INTERVAL LESS THAN 2 MINUTES, CANCEL THE FIRST ONE.
  //look for a transfer of the same value, to the same account
  let lastTranCancel = false;
  sender.transfers.find(t => {
    if (
      t.account === transfer.account &&
      t.amount === transfer.amount &&
      t.id !== transfer.id &&
      moment().diff(t.date, "seconds") < 120
    ) {
      console.log("t.date: ", t.date, " now: ", moment());
      console.log("dif in secs: ", moment().diff(t.date, "seconds"));
      //cancel de first one
      t.remove();
      console.log("TRANSACAO PASSADA FOI CANCELADA");

      lastTranCancel = true;
    }
  });

  transfer.received = false;
  sender.transfers.push(transfer);
  if (!lastTranCancel) {
    sender.balance = sender.balance - transfer.amount;
  }

  //receiver
  let receiver = await User.findOne({ account: req.body.account });
  if (!receiver)
    res
      .status(404)
      .send(JSON.stringify({ error: "Receiver user was not found" }));

  let receiverTransfer = populateTransferFromRequest(req);

  receiverTransfer.received = true;
  receiverTransfer.transferReceiver = sender.name;
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
    received: false,
    transferReceiver: req.body.transferReceiver
  });
}

module.exports = router;
