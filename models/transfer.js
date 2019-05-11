const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const transferSchema = new mongoose.Schema({
  account: { type: Number, required: true, length: 8 },
  date: { type: Date, default: Date.now, required: true },
  amount: {
    type: Number,
    required: true
  },
  transferReceiver: { type: String },
  received: { type: Boolean }
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
