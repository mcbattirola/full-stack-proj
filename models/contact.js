const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 3,
    maxlength: 255,
    validate: /(.+)@(.+){2,}\.(.+){2,}/,
    trim: true
  },
  kt: { type: Number, required: true },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    trim: true
  },
  account: { type: Number, required: true, length: 8 },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

//makes a class from mongoose schema
const Contact = mongoose.model("Contact", contactSchema);

//validate schema for Users comming through api calls
function validateContact(contact) {
  const schema = {
    email: Joi.string()
      .regex(/(.+)@(.+){2,}\.(.+){2,}/)
      .min(1)
      .max(255),
    name: Joi.string()
      .min(1)
      .max(255),
    userId: Joi.string(),
    account: Joi.number(),
    kt: Join.number()
  };

  return Joi.validate(contact, schema);
}

exports.Contact = Contact;
exports.validate = validateContact;
exports.contactSchema = contactSchema;
