"use client";

import Alert from "@/ui/Alert";
import { useEffect, useState } from "react";
import getNearbyStops, { LatLng } from "./getNearbyStops";
import Link from "next/link";

const NearbyStopsList = ({ stops }: { stops: ScheduledStopPoint[] }) => {
  const [permisison, setPermisison] = useState(false);
  const [latlng, setLatlng] = useState<LatLng>();

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPermisison(true);
        setLatlng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  console.log(permisison);
  console.log(latlng);

  if (!permisison || !latlng) {
    return <Alert label="Location permission is required for this feature." />;
  }

  const nearbyStops = getNearbyStops(stops, latlng);
  console.log(nearbyStops);

  if (!nearbyStops?.length) {
    return <h3>No stops within half of a mile..</h3>;
  }

  return (
    <ul>
      {nearbyStops.map((stop) => {
        return (
          <li key={stop.normalizedName} className="mb-3 last:mb-0 text-md">
            <Link
              className="flex gap-2 items-center"
              href={`/stop/group/${stop.normalizedName}`}
            >
              <div className="text-lg">🚏</div>
              <div className="leading-none hover:underline">
                {stop.normalizedName} <br />
                <span className="text-secondary text-xs">
                  {Math.round(stop.distance * 100) / 100} miles
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NearbyStopsList;