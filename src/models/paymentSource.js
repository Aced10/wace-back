const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSourceSchema = new Schema({
  customer_ID: { type: Schema.Types.ObjectId, ref: "users", required: true },
  customer_email: { type: String, required: true, unique: true },
  acceptance_token: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  role: {
    type: String,
    required: true,
    enum: { values: ["rider", "driver"], message: "El role no es válido" },
    default: "client",
  },
});

module.exports = mongoose.model("paymentSource", PaymentSourceSchema);
