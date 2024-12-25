"use client";

import Alert from "@/ui/Alert";
import { useEffect, useState } from "react";
import getNearbyStops, { LatLng } from "./getNearbyStops";
import Link from "next/link";

const NearbyStopsList = ({ stops }: { stops: ScheduledStopPoint[] }) => {
  const [latlng, setLatlng] = useState<LatLng>();

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
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

  if (!latlng) {
    return <Alert label="Location permission is required for this feature." />;
  }

  const nearbyStops = getNearbyStops(stops, latlng);

  if (!nearbyStops?.length) {
    return <Alert label="No stops within half of a mile" />;
  }

  return (
    <ul>
      {nearbyStops.map((stop, index) => {
        return (
          <li
            key={stop.normalizedName + index}
            className="mb-4 last:mb-0 text-md"
          >
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
