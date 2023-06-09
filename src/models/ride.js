const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const RideSchema = new Schema({
  riderId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  driverId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  paymentSourceId: {
    type: Schema.Types.ObjectId,
    ref: "paymentSources",
    required: true,
  },
  startTime: { type: Date, required: true },
  startLocation: {
    type: locationSchema,
    required: true,
  },
  endTime: { type: Date },
  endLocation: {
    type: locationSchema,
  },
  pricePerKm: { type: Number, required: true },
  pricePerMin: { type: Number, required: true },
  baseFee: { type: Number, required: true },
  totalPrice: { type: Number },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["active", "finish", "cancel"],
      message: "Estado del ride invalido!",
    },
    default: "active",
  },
});

module.exports = mongoose.model("ride", RideSchema);
