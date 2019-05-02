const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const transferSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    // required: true //turning it off for debugging
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
  date: { type: Date, default: Date.now, required: true },
  amount: {
    type: Number,
    required: true
  }
});

//makes a class from mongoose schema
const Transfer = mongoose.model("Transfer", transferSchema);

//validate schema for Users comming through api calls
function validateTransfer(transfer) {
  const schema = {
    // email: Joi.string()
    //   .regex(/(.+)@(.+){2,}\.(.+){2,}/)
    //   .min(1)
    //   .max(255),
    // name: Joi.string()
    //   .min(1)
    //   .max(255),
    // userId: Joi.string()
  };

  return Joi.validate(transfer, schema);
}

exports.Transfer = Transfer;
exports.validate = validateTransfer;
exports.transferSchema = transferSchema;
