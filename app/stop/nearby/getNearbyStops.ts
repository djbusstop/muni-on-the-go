import { point } from "@turf/helpers";
import { groupStopsByName, normalizeStopName } from "../getStopsByName";
import distance from "@turf/distance";

export type LatLng = {
  lat: number;
  lng: number;
};

export type NormalizedStopWithDistance = {
  stop: ScheduledStopPoint;
  distance: number;
  normalizedName: string;
};

const getNearbyStops = (stops: ScheduledStopPoint[], latlng: LatLng) => {
  const userLocationPoint = point([latlng.lng, latlng.lat]);

  const stopsByName = groupStopsByName(stops);

  // Get all stops < .4 miles away
  const nearbyStops = Object.entries(stopsByName).reduce(
    (acc: NormalizedStopWithDistance[], [, value]) => {
      const firstStop = value.stops.at(0);
      if (firstStop) {
        try {
          const stopPoint = point([
            parseFloat(firstStop.Location.Longitude),
            parseFloat(firstStop.Location.Latitude),
          ]);

          const distanceBetween = distance(userLocationPoint, stopPoint, {
            units: "miles",
          });

          if (distanceBetween < 0.4) {
            return [
              ...acc,
              {
                stop: firstStop,
                normalizedName: normalizeStopName(firstStop.Name),
                distance: distanceBetween,
              },
            ];
          }
        } catch {
          // If there was an error finding the distance, just skip
          return acc;
        }
      }
      return acc;
    },
    []
  );

  const sortedStops = nearbyStops.sort((first, second) => {
    return first.distance - second.distance;
  });

  return sortedStops;
};

export default getNearbyStops;
