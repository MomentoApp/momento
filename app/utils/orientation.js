const deg2rad = deg => deg * (Math.PI / 180);

const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const getVideoDistanceInKm = (video, currentPosition) =>
  Math.round(
    10 * getDistanceInKm(
    video.point.coordinates[0],
    video.point.coordinates[1],
    currentPosition.latitude,
    currentPosition.longitude
    )
  ) / 10;


module.exports.getDistanceInKm = getDistanceInKm;
module.exports.getVideoDistanceInKm = getVideoDistanceInKm;
