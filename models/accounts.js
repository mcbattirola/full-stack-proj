const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

//makes a class from mongoose schema
const Account = mongoose.model(
  "Account",
  new mongoose.Schema({
    number: { type: Number, require: true },
    name: { type: String, required: true, minlength: 3, maxlength: 255 },
    ownerId: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    active: Boolean
  })
);

//validate schema for accounts comming through api calls
function validateAccount(acc) {
  const schema = {
    number: Joi.number()
      .min(3)
      .required(),
    name: Joi.string()
      .required()
      .min(3)
      .max(255),
    ownerId: Joi.number().required()
  };

  return Joi.validate(acc, schema);
}

exports.Account = Account;
exports.validade = validateAccount;
