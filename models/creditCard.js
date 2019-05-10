const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const creditCardSchema = new mongoose.Schema({
  number: { type: Number, required: true, min: 10000000, max: 99999999 },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    trim: true
  }
});

//makes a class from mongoose schema
const CreditCard = mongoose.model("CreditCard", creditCardSchema);

//validate schema for Users comming through api calls
function validateCreditCard(cc) {
  const schema = {
    number: Joi.number().max(16),
    name: Joi.string()
      .max(255)
      .required()
  };

  return Joi.validate(cc, schema);
}

exports.CreditCard = CreditCard;
exports.validateCreditCard = validateCreditCard;
exports.creditCardSchema = creditCardSchema;
