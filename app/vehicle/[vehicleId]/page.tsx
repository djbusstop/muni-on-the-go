import { notFound } from "next/navigation";
import fetchVehicleMonitoring, {
  getStops,
  getVehicleJourney,
} from "./fetchVehicleMonitoring";
import OnwardCallList from "./_components/OnwardCallList";

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
    <main className="p-5">
      <h1 className="text-4xl leading-loose font-bold">
        Vehicle #{vehicleJourney.VehicleRef}
      </h1>
      {vehicleJourney?.LineRef && vehicleJourney?.DestinationName && (
        <h3 className="text-xl font-bold">
          {vehicleJourney.LineRef} {vehicleJourney.PublishedLineName} to{" "}
          {vehicleJourney.DestinationName}
        </h3>
      )}

      <div className="mt-8">
        {stops.length ? (
          <OnwardCallList onwardCalls={stops} />
        ) : (
          <h2>Tracking is not available. Please refresh to try again</h2>
        )}
      </div>
    </main>
  );
}
