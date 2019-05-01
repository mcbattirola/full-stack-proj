const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { contactSchema } = require("./contact");
const { transferSchema } = require("./transfer");
const { creditCardSchema } = require("./creditCard");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    validate: /(.+)@(.+){2,}\.(.+){2,}/,
    trim: true,
    unique: true
  },
  password: { type: String, required: true, minlength: 4, maxlength: 255 },
  kt: { type: Number, required: true, unique: true },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true,
    unique: true
  },
  account: { type: Number, required: true, length: 8, unique: true },
  balance: { type: Number, required: true, default: 0 },
  creation_date: { type: Date, default: Date.now },
  contacts: { type: [contactSchema], default: [] },
  transfers: { type: [transferSchema], default: [] },
  credit_cards: { type: [creditCardSchema], default: [] }
});

//makes a class from mongoose schema
const User = mongoose.model("User", userSchema);

//validate schema for Users comming through api calls
function validateUser(user) {
  const schema = {
    email: Joi.string()
      .regex(/(.+)@(.+){2,}\.(.+){2,}/)
      .min(3)
      .max(255)
      .required()
      .error(() => "Invalid email"),
    name: Joi.string()
      .required()
      .min(3)
      .max(255),
    password: Joi.number(),
    kt: Joi.number(),
    account: Joi.number()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;
