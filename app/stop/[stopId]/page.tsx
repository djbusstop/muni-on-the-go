import { notFound } from "next/navigation";
import fetchStopMonitoring from "./fetchStopMonitoring";
import StopVisitsList from "./components/StopVisitsList";
import FavoriteStopButton from "../../favorites/FavoriteStopButton";
import DataAttribution from "@/app/_components/DataAttribution";
import fetchStopPlace from "./fetchStopPlace";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ stopId: string }>;
}) {
  const stopIdSlug = (await params).stopId;

  const stopId = parseInt(stopIdSlug);
  if (isNaN(stopId)) notFound();

  const [stopResponse, stopMonitoringResponse] = await Promise.allSettled([
    fetchStopPlace(stopId),
    fetchStopMonitoring(stopId),
  ]);

  // Handle Errors
  if (stopResponse.status !== "fulfilled") throw new Error(stopResponse.reason);
  if (stopMonitoringResponse.status !== "fulfilled")
    throw new Error(stopMonitoringResponse.reason);

  const stopPlace =
    stopResponse.value?.Siri?.ServiceDelivery?.DataObjectDelivery?.dataObjects
      ?.SiteFrame?.stopPlaces?.StopPlace;

  const stopVisits =
    stopMonitoringResponse.value?.ServiceDelivery?.StopMonitoringDelivery?.MonitoredStopVisit?.map(
      (stopVisit) => stopVisit.MonitoredVehicleJourney
    );

  if (!stopPlace || !stopVisits) notFound();

  const firstStopVisit = stopVisits.at(0);

  return (
    <main>
      <header className="flex items-center gap-2">
        <div className="flex-grow">
          <h1 className="text-3xl leading-loose font-bold">
            Stop #{stopPlace?.PublicCode}
          </h1>
          <h3 className="text-xl font-bold">
            <Link
              className="hover:underline"
              href={`//maps.apple.com?ll=${stopPlace.Centroid.Location.Latitude},${stopPlace.Centroid.Location.Longitude}`}
            >
              {stopPlace.Name}
            </Link>
          </h3>
        </div>
        {firstStopVisit && <FavoriteStopButton currentStop={firstStopVisit} />}
      </header>

      <div className="mt-6">
        <StopVisitsList stopVisits={stopVisits} />
      </div>
      <DataAttribution />
    </main>
  );
}
