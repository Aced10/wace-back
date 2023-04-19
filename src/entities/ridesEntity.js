// Models
const paymentSourceModel = require("../models/payment.source");
const usersModel = require("../models/user");
const ridesModel = require("../models/ride");

// Const
const {
  BASE_FEE,
  PRICE_PER_KM,
  PRICE_PER_MIN,
} = require("../helpers/rideConstans");

// Utils
const { calculateDistance } = require("../helpers/rideCalculation");

const newRide = async (riderId, rideData) => {
  let { startLocation } = rideData;

  // Only for this case asign rider location
  if (!startLocation) startLocation = await getRiderLocation(riderId);
  if (!riderId || !startLocation)
    return {
      status: 400,
      message: "El id del usuario y los datos del viaje son requeridos",
    };
  try {
    const { _id } = await paymentSourceModel.findOne(
      {
        userId: riderId,
        status: "AVAILABLE",
      },
      {}
    );

    const { driverId } = await nearestDriver(startLocation);
    const newRide = await ridesModel.create({
      riderId,
      driverId,
      paymentSourceId: _id ?? "",
      startLocation,
      startTime: new Date(),
      pricePerKm: PRICE_PER_KM,
      pricePerMin: PRICE_PER_MIN,
      baseFee: BASE_FEE,
    });
    return {
      status: 200,
      message: "Viaje creado exitosamente!",
      data: newRide,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Se presento un error al crear el viaje!",
      data: error,
    };
  }
};

const findRide = async (rideId) => {
  if (!userId) return { status: 400, message: "El ID del viaje es requerido!" };
  try {
    const costumer = await ridesModel.findById(rideId);
    return {
      status: 200,
      message: "Se encontro el viaje de manera exitosa!",
      data: costumer,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Se presento un error al buscar el viaje!",
      data: error,
    };
  }
};

const endRide = async (paymentSourceId) => {
  if (!userId)
    return { status: 400, message: "El ID del metodo de pago es requerido!" };
  try {
    const costumer = await paymentSource.findById(paymentSourceId);
    return {
      status: 200,
      message: "Se encontro el metodo de pago de manera exitosa!",
      data: costumer,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Se presento un error al buscar el metodo de pago!",
      data: error,
    };
  }
};

const nearestDriver = async (startLocation) => {
  const availablesDrivers = await usersModel.find(
    { role: "driver" },
    { currentLocation: 1 }
  );
  const driversDistances = calculateDriversDistance(
    availablesDrivers,
    startLocation
  );
  return driversDistances.sort(
    (driverA, driverB) => driverA.distance - driverB.distance
  )[0];
};

const calculateDriversDistance = (availablesDrivers, startLocation) => {
  return availablesDrivers.map((driver) => {
    return {
      driverId: _id,
      distance: calculateDistance(
        startLocation.latitude,
        startLocation.longitude,
        driver.currentLocation?.latitude,
        driver.currentLocation?.longitude
      ),
    };
  });
};

const generateEndLocation = () => {};

const getRiderLocation = async (riderId) => {
  const { currentLocation } = await usersModel.findById(riderId);
  return currentLocation;
};

module.exports = {
  findRide,
  newRide,
  endRide,
};
