"use client";

import Alert from "@/ui/Alert";
import { useEffect, useState } from "react";
import getNearbyVehicles, { LatLng } from "./getNearbyVehicles";
import RouteDisplay from "@/ui/RouteDisplay";
import { getStops } from "../fetchVehicleMonitoring";
import ListItemLink from "@/ui/ListItemLink";
import clsx from "clsx";
import { localDate } from "@/lib/date";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

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
    <ul className={clsx(["flex", "flex-col", "gap-3"])}>
      {nearbyVehicles.map(({ vehicle }, index) => {
        const stops = getStops(vehicle);
        if (!stops.at(0)) return null;

        const nextStop = stops[0];

        const expectedArrivalTime = localDate(
          nextStop.ExpectedArrivalTime ||
            nextStop.ExpectedDepartureTime ||
            nextStop.AimedArrivalTime
        );

        return (
          <ListItemLink
            key={index}
            href={vehicle.VehicleRef && `/vehicle/${vehicle.VehicleRef}`}
          >
            {/* Row */}
            <div className={clsx(["flex", "items-center", "gap-2"])}>
              {/* Left col */}
              <div className="flex flex-col flex-grow leading-relaxed">
                <h3 className="font-semibold text-md">
                  <RouteDisplay route={vehicle.LineRef} />{" "}
                  {vehicle.PublishedLineName}
                </h3>
                <span className="text-xs">
                  Next stop {nextStop.StopPointName}{" "}
                  {expectedArrivalTime.fromNow()}
                </span>
              </div>
              {/* Right col */}
              <div></div>
            </div>
          </ListItemLink>
        );
      })}
    </ul>
  );
};

export default NearbyVehiclesList;
