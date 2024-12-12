import { notFound } from "next/navigation";
import fetchVehicleMonitoring, {
  getStops,
  getVehicleJourney,
} from "./fetchVehicleMonitoring";
import OnwardCallList from "./components/OnwardCallList";
import DataAttribution from "@/ui/DataAttribution";
import Link from "next/link";

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
      <h1 className="text-xl font-bold">
        {vehicleJourney.LineRef} {vehicleJourney.PublishedLineName}
      </h1>
      <h2 className="text-md">
        to{" "}
        <Link
          href={`/stop/${vehicleJourney.DestinationRef}`}
          className="hover:underline"
        >
          {vehicleJourney.DestinationName}
        </Link>
      </h2>
      {vehicleJourney?.LineRef && vehicleJourney?.DestinationName && (
        <span className="text-sm text-secondary leading-loose">
          Vehicle #{vehicleJourney.VehicleRef}
        </span>
      )}

      <div className="mt-4">
        {stops.length ? (
          <OnwardCallList onwardCalls={stops} />
        ) : (
          <p className="text-lg">
            Tracking is not available. Please refresh to try again
          </p>
        )}
      </div>
      <DataAttribution />
    </main>
  );
}
