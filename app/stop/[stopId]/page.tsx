import { notFound } from "next/navigation";
import fetchStopMonitoring from "./fetchStopMonitoring";
import StopVisitsList from "./components/StopVisitsList";
import FavoriteStopButton from "../../favorites/FavoriteStopButton";
import DataAttribution from "@/ui/DataAttribution";
import fetchStopPlaces from "./fetchStopPlaces";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ stopId: string }>;
}) {
  const stopIdSlug = (await params).stopId;

  const stopId = parseInt(stopIdSlug);
  if (isNaN(stopId)) notFound();

  const [stopPlaceResponse, stopMonitoringResponse] = await Promise.allSettled([
    fetchStopPlaces(stopId),
    fetchStopMonitoring(stopId),
  ]);

  // Handle Errors
  if (stopPlaceResponse.status !== "fulfilled")
    throw new Error(stopPlaceResponse.reason);
  if (stopMonitoringResponse.status !== "fulfilled")
    throw new Error(stopMonitoringResponse.reason);

  const stopPlace =
    stopPlaceResponse.value?.Siri?.ServiceDelivery?.DataObjectDelivery
      ?.dataObjects?.SiteFrame?.stopPlaces?.StopPlace;

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
          <h1 className="text-xl font-bold">
            <Link
              className="hover:underline"
              href={`//maps.apple.com?q=${encodeURIComponent(
                `${stopPlace.PostalAddress.AddressLine1}, ${stopPlace.PostalAddress.Town}`
              )}`}
            >
              {stopPlace.Name}
            </Link>
          </h1>
          <span className="text-sm text-secondary">
            Stop #{stopPlace?.PublicCode}
          </span>
        </div>
        {firstStopVisit && <FavoriteStopButton currentStop={firstStopVisit} />}
      </header>

      <div className="mt-4">
        {stopVisits?.length ? (
          <StopVisitsList stopVisits={stopVisits} />
        ) : (
          <p className="text-lg">
            Data on upcoming departures is not available at this time.
          </p>
        )}
      </div>
      <DataAttribution />
    </main>
  );
}
