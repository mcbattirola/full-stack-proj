const express = require("express");
const Joi = require("@hapi/joi");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const logger = require("./Middlewares/logger");
const authenticate = require("./Middlewares/authenticate");
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("tiny")); //for logging
app.use(logger);
app.use(authenticate);

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

app.get("/api/accounts", (req, res) => {
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

app.put("/api/accounts/:id", (req, res) => {
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
