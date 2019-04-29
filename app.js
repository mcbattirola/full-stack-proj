const express = require("express");
const Joi = require("@hapi/joi");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.json());

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

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("its alive!");
});

app.get("/api/account", (req, res) => {
  res.send(accounts);
});

// /api/accounts/1
app.get("/api/account/:id", (req, res) => {
  const acc = accounts.find(c => c.id === parseInt(req.params.id));
  if (!acc) {
    // 404 resource not found
    res.status(404).send("Account with the given ID was not found");
  }
  res.send(acc);
});

app.post("/api/accounts", (req, res) => {
  const schema = {
    number: Joi.number()
      .min(3)
      .required(),
    user: Joi.number()
      .min(3)
      .required()
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error);
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
