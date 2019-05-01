const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

//fake database for now, just for debugging
const accounts = [
  {
    id: 1,
    number: "00154",
    user: 1
  },
  {
    id: 2,
    number: "77891",
    user: 1
  },
  {
    id: 3,
    number: "44457",
    user: 2
  }
];

router.get("/", (req, res) => {
  res.send(accounts);
});

router.get(":id", (req, res) => {
  const acc = accounts.find(c => c.id === parseInt(req.params.id));
  if (!acc) {
    // 404 resource not found
    res.status(404).send("Account with the given ID was not found");
  }
  res.send(acc);
});

router.post("/", (req, res) => {
  const { error } = validateAccount(req.body); // result. error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const account = {
    id: accounts.length + 1,
    number: req.body.number,
    user: req.body.user
  };

  accounts.push(account);
  res.send(account);
});

router.put("/:id", (req, res) => {
  //look up for the account
  const acc = accounts.find(c => c.id === parseInt(req.params.id));

  // return 404 if it doesnt exist
  if (!acc) {
    res.status(404).send("Account with the given ID was not found");
  }

  // 400 Bad Request
  const { error } = validateAccount(req.body); // result. error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //update
  acc.number = req.body.number;
  acc.user = req.body.user;
  res.send(ac);
});

function validateAccount(acc) {
  const schema = {
    number: Joi.number()
      .min(3)
      .required(),
    user: Joi.number().required()
  };

  return Joi.validate(acc, schema);
}

module.exports = router;
