const LocationMath = {};

LocationMath.locDegreesToKilometers = degrees => {
  const kmPerNinety = 10000 / 90;
  // 10,000 km per 90 degrees
  return degrees * kmPerNinety;
};

LocationMath.locDegreesToFeet = degrees => {
  const ftPerKm = 3280.4;
  // 3280.4 feet per kilometer
  const km = LocationMath.locDegreesToKilometers(degrees);
  return ftPerKm * km;
};


LocationMath.relativeLocsInFeet = (start, end) => {
  const id = end.id || undefined;
  const z = -1 * LocationMath.locDegreesToFeet(end.point.coordinates[0] - start.latitude).toFixed(1);
  const x = LocationMath.locDegreesToFeet(end.point.coordinates[1] - start.longitude).toFixed(1);
  return { id, x, z };
};

export default LocationMath;