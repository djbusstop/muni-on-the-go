import { point } from "@turf/helpers";
import distance from "@turf/distance";

export type LatLng = {
  lat: number;
  lng: number;
};

export type VehicleWithDistance = {
  vehicle: MonitoredVehicleJourney;
  distance: number;
};

const getNearbyVehicles = (
  vehicles: MonitoredVehicleJourney[],
  latlng: LatLng
) => {
  const userLocationPoint = point([latlng.lng, latlng.lat]);

  // Get all stops < .5 miles away
  const nearbyVehicles = vehicles.reduce(
    (acc: VehicleWithDistance[], vehicle) => {
      // VehicleRef is required
      if (!vehicle.VehicleRef) return acc;

      try {
        const stopPoint = point([
          parseFloat(vehicle.VehicleLocation.Longitude),
          parseFloat(vehicle.VehicleLocation.Latitude),
        ]);

        const distanceBetween = distance(userLocationPoint, stopPoint, {
          units: "miles",
        });

        if (distanceBetween < 0.5) {
          return [
            ...acc,
            {
              vehicle,
              distance: distanceBetween,
            },
          ];
        }
      } catch {
        // If there was an error finding the distance, just skip
        return acc;
      }
      return acc;
    },
    []
  );

  const sortedVehicles = nearbyVehicles.sort((first, second) => {
    return first.distance - second.distance;
  });

  return sortedVehicles;
};

export default getNearbyVehicles;
