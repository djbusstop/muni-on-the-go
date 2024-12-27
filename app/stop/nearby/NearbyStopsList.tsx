"use client";

import Alert from "@/ui/Alert";
import { useEffect, useState } from "react";
import getNearbyStops, { LatLng } from "./getNearbyStops";
import ListItemLink from "@/ui/ListItemLink";
import clsx from "clsx";
import { normalizeStopName } from "../getStopsByName";

const NearbyStopsList = ({ stops }: { stops: ScheduledStopPoint[] }) => {
  const [latlng, setLatlng] = useState<LatLng>();
  const [locationPermisisonDenied, setLocationPermissionDenied] =
    useState(false);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatlng({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setLocationPermissionDenied(true);
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  if (locationPermisisonDenied) {
    return <Alert label="Location permission is required for this feature." />;
  }

  if (!latlng) {
    return <Alert label="Finding nearby stops." icon="⚙️" />;
  }

  const nearbyStops = getNearbyStops(stops, latlng);

  if (!nearbyStops?.length) {
    return <Alert label="No stops within a half-mile." />;
  }

  return (
    <ul className="flex flex-col gap-3">
      {nearbyStops.map(({ stop, distance }, index) => {
        return (
          <ListItemLink
            key={index.toString()}
            href={stop.id ? `/stop/${stop.id}` : undefined}
          >
            {/* Row */}
            <div className={clsx(["flex", "items-center", "gap-2"])}>
              {/* col */}
              <div className="text-2xl">🚏</div>
              {/* col */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-md font-semibold">
                  {normalizeStopName(stop.Name)}
                </h3>

                <span className="text-xs mt-0.5">
                  {Math.round(distance * 100) / 100} miles away
                </span>
              </div>
            </div>
          </ListItemLink>
        );
      })}
    </ul>
  );
};

export default NearbyStopsList;
