import { notFound } from "next/navigation";
import fetchStopMonitoring from "./fetchStopMonitoring";
import StopVisitsList from "./components/StopVisitsList";
import FavoriteStopButton from "../../favorites/FavoriteStopButton";
import DataAttribution from "@/ui/DataAttribution";
import fetchStopPlaces from "./fetchStopPlaces";
import Link from "next/link";
import Breadcrumbs from "@/ui/Breadcrumbs";
import Alert from "@/ui/Alert";

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
      <header>
        <Breadcrumbs
          links={[
            <span key={stopPlace.PublicCode}>
              Stop #{stopPlace?.PublicCode}
            </span>,
          ]}
        />
        <div className="flex items-center justify-between mt-3">
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
          {firstStopVisit && (
            <FavoriteStopButton currentStop={firstStopVisit} />
          )}
        </div>
      </header>

      <div className="my-3">
        {stopVisits?.length ? (
          <StopVisitsList stopVisits={stopVisits} />
        ) : (
          <Alert label="Upcoming departures are not available. Refresh to try again." />
        )}
      </div>
      <DataAttribution />
    </main>
  );
}
