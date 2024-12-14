"use client";

import { redirect, RedirectType } from "next/navigation";
import fetchVehicleMonitoring from "./fetchVehicleMonitoring";

export default function RandomVehicleButton() {
  return (
    <button
      onClick={async () => {
        const allVehicles = await fetchVehicleMonitoring();
        // Get all vehicles which have onward calls
        const vehicleActivities =
          allVehicles.Siri.ServiceDelivery?.VehicleMonitoringDelivery?.VehicleActivity.filter(
            (vehicle) => vehicle.MonitoredVehicleJourney.OnwardCalls
          );

        const randomNumber = Math.floor(
          Math.random() * vehicleActivities.length
        );
        // Pick random vehicle
        const randomVehicleID = vehicleActivities
          .filter(
            (activity) =>
              activity.MonitoredVehicleJourney.OnwardCalls?.OnwardCall
          )
          .at(randomNumber)?.MonitoredVehicleJourney.VehicleRef;

        console.log(randomVehicleID);
        if (randomVehicleID)
          redirect(`/vehicle/${randomVehicleID}`, RedirectType.push);
      }}
    >
      Random vehicle
    </button>
  );
}
