import { notFound } from "next/navigation";
import fetchVehicleMonitoring, {
  getStops,
  getVehicleJourney,
} from "./fetchVehicleMonitoring";
import DataAttribution from "@/ui/DataAttribution";
import Link from "next/link";
import Breadcrumbs from "@/ui/Breadcrumbs";
import Alert from "@/ui/Alert";
import OnwardCallList from "./OnwardCallList";
import RouteDisplay from "@/ui/RouteDisplay";

export default async function Page({
  params,
}: {
  params: Promise<{ vehicleId: string }>;
}) {
  const vehicleIdSlug = (await params).vehicleId;

  // Parse vehicle ID to number
  const vehicleId = parseInt(vehicleIdSlug);
  if (isNaN(vehicleId)) notFound();

  const vehicleMonitoringResponse = await fetchVehicleMonitoring(vehicleId);
  const vehicleJourney = getVehicleJourney(vehicleMonitoringResponse);

  if (!vehicleJourney) notFound();

  const stops = getStops(vehicleJourney);

  return (
    <main>
      <header>
        <Breadcrumbs
          links={[
            <span key="vehicle">Vehicle</span>,
            <span key={vehicleJourney.VehicleRef}>
              #{vehicleJourney.VehicleRef}
            </span>,
          ]}
        />

        <h1 className="text-xl font-bold mt-3">
          <RouteDisplay route={vehicleJourney.LineRef} />{" "}
          {vehicleJourney.PublishedLineName}
        </h1>
        {vehicleJourney.DestinationRef && (
          <h2 className="text-md">
            to{" "}
            <Link
              href={`/stop/${vehicleJourney.DestinationRef}`}
              className="hover:underline"
            >
              {vehicleJourney.DestinationName}
            </Link>
          </h2>
        )}
      </header>

      <section className="my-3">
        {stops.length ? (
          <OnwardCallList onwardCalls={stops} />
        ) : (
          <Alert label="Tracking is not available. Refresh to try again." />
        )}
      </section>
      <DataAttribution />
    </main>
  );
}
