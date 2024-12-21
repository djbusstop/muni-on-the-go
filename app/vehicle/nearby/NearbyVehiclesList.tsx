"use client";

import Alert from "@/ui/Alert";
import { useEffect, useState } from "react";
import Link from "next/link";
import getNearbyVehicles, { LatLng } from "./getNearbyVehicles";
import RouteDisplay from "@/ui/RouteDisplay";
import { getStops } from "../fetchVehicleMonitoring";

const NearbyVehiclesList = ({
  vehicles,
}: {
  vehicles: MonitoredVehicleJourney[];
}) => {
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

  const nearbyVehicles = getNearbyVehicles(vehicles, latlng);

  if (!nearbyVehicles?.length) {
    return <Alert label="No vehicles found." />;
  }

  return (
    <ul>
      {nearbyVehicles.map(({ vehicle }) => {
        const nextStop = getStops(vehicle).at(0);
        if (!nextStop) return null;

        return (
          <li key={vehicle.VehicleRef} className="mb-3 last:mb-0 text-md">
            <Link href={`/vehicle/${vehicle.VehicleRef}`}>
              <div className="leading-tight">
                <RouteDisplay route={vehicle.LineRef} />{" "}
                <span className="hover:underline">
                  {vehicle.PublishedLineName}
                </span>
                <br />
                <span className="text-secondary text-xs">
                  Next stop: {nextStop?.StopPointName}
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NearbyVehiclesList;
