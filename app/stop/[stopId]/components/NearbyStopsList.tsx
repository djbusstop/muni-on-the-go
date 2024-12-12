import distance from "@turf/distance";
import { point } from "@turf/helpers";
import Link from "next/link";

const NearbyStopsList = ({
  selectedStop,
  stops,
}: {
  selectedStop: StopPlace;
  stops: ScheduledStopPoint[];
}) => {
  const selectedStopPoint = point([
    parseFloat(selectedStop.Centroid.Location.Longitude),
    parseFloat(selectedStop.Centroid.Location.Latitude),
  ]);

  // List of all stops < .25km away from the selected stop point
  const stopsWithDistance = stops.reduce(
    (
      acc: { stop: ScheduledStopPoint; distance: number }[],
      stop: ScheduledStopPoint
    ) => {
      if (stop) {
        const lnglat = [
          parseFloat(stop.Location.Longitude),
          parseFloat(stop.Location.Latitude),
        ];
        const newPoint = point(lnglat, stop);
        const distanceFromSelectedStop = distance(selectedStopPoint, newPoint);
        // Only return firstitems < .25 km away
        if (distanceFromSelectedStop !== 0 && distanceFromSelectedStop < 0.25)
          return [...acc, { stop, distance: distanceFromSelectedStop }];
      }
      return acc;
    },
    []
  );

  const nearestStops = stopsWithDistance
    .sort((firstStop, secondStop) => firstStop.distance - secondStop.distance)
    .slice(0, 4);

  return (
    <>
      <h4 className="text-lg">Nearby Stops</h4>
      <ul className="mt-2 text-lg leading">
        {nearestStops.map(({ stop }) => {
          return (
            <li key={stop.id}>
              <Link href={`/stop/${stop.id}`} className="hover:underline">
                🚏 {stop.Name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default NearbyStopsList;
