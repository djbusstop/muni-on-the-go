import DataAttribution from "@/ui/DataAttribution";
import Breadcrumbs from "@/ui/Breadcrumbs";
import fetchVehicleMonitoring from "../fetchVehicleMonitoring";
import { Metadata } from "next";
import NearbyVehiclesList from "./NearbyVehiclesList";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Nearby stops - Muni On the Go`,
    description: `Find your nearest Muni vehicle`,
  };
}

export default async function Page() {
  const vehicleMonitoringResponse = await fetchVehicleMonitoring();

  return (
    <main>
      <header>
        <Breadcrumbs links={[<span key="stop">Nearby vehicles</span>]} />
        <div className="flex items-center justify-between mt-3">
          <h1 className="text-xl font-bold">Nearby vehicles</h1>
        </div>
      </header>

      <section className="my-3">
        <NearbyVehiclesList
          vehicles={vehicleMonitoringResponse.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity.map(
            (vehicle) => vehicle.MonitoredVehicleJourney
          )}
        />
      </section>
      <DataAttribution />
    </main>
  );
}
