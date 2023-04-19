const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

// Converts numeric degrees to radians
const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const calculateRidePrice = (rideData) => {
  const { baseFee, distance, pricePerKm, time, pricePerMin } = rideData;
  return (
    baseFee +
    calculateDistancePrice(distance, pricePerKm) +
    calculateTimePrice(time, pricePerMin)
  );
};

const calculateDistancePrice = (distanceKm, pricePerKm) => {
  return distanceKm * pricePerKm;
};

const calculateTimePrice = (timeMin, pricePerMin) => {
  return timeMin * pricePerMin;
};

module.exports = {
  calculateDistance,
  calculateRidePrice,
  calculateDistancePrice,
  calculateTimePrice,
};
