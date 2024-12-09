import { notFound } from "next/navigation";
import fetchScheduledDepartures from "./fetchScheduledDepartures";

export default async function Page({
  params,
}: {
  params: Promise<{ stopId: string }>;
}) {
  const stopIdSlug = (await params).stopId;

  // Parse vehicle ID to number
  const stopId = parseInt(stopIdSlug);
  if (isNaN(stopId)) notFound();

  const stopMonitoringResponse = await fetchScheduledDepartures(stopId);

  console.log(stopMonitoringResponse);

  return (
    <main>
      <h1 className="text-4xl leading-loose font-bold">Stop #</h1>
      {/* {vehicleJourney?.LineRef && vehicleJourney?.DestinationName && (
        <h3 className="text-xl font-bold">
          {vehicleJourney.LineRef} {vehicleJourney.PublishedLineName} to{" "}
          {vehicleJourney.DestinationName}
        </h3>
      )} */}
    </main>
  );
}
