const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Joi = require("@hapi/joi");
const { contactSchema } = require("./contact");
const { transferSchema } = require("./transfer");
const { creditCardSchema } = require("./creditCard");
const jwt = require("jsonwebtoken");
const config = require("config");

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
  password: { type: String, required: true, minlength: 4, maxlength: 1024 },
  kt: { type: Number, required: true, unique: true },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true
  },
  account: { type: Number, required: true, length: 8, unique: true },
  balance: { type: Number, required: true },
  creation_date: { type: Date },
  contacts: { type: [contactSchema] },
  transfers: { type: [transferSchema] },
  creditCards: { type: [creditCardSchema] }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
};

userSchema.plugin(uniqueValidator);

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
    password: Joi.string(),
    kt: Joi.number().unsafe(),
    account: Joi.number()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;
