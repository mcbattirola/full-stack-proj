const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const creditCardSchema = new mongoose.Schema({
  number: { type: Number, required: true, length: 16 }
});

//makes a class from mongoose schema
const CreditCard = mongoose.model("CreditCard", creditCardSchema);

//validate schema for Users comming through api calls
function validateCreditCard(cc) {
  const schema = {
    number: Joi.number().length(16)
  };

  return Joi.validate(cc, schema);
}

exports.CreditCard = CreditCard;
exports.validate = validateCreditCard;
exports.creditCardSchema = creditCardSchema;