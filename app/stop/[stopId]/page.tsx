import { notFound } from "next/navigation";
import fetchStopMonitoring from "../fetchStopMonitoring";
import StopVisitsList from "../StopVisitsList";
import FavoriteStopButton from "../../../ui/favorites/FavoriteStopButton";
import DataAttribution from "@/ui/DataAttribution";
import fetchStopPlace from "../fetchStopPlace";
import Link from "next/link";
import Breadcrumbs from "@/ui/Breadcrumbs";
import Alert from "@/ui/Alert";
import { Metadata } from "next";
import { normalizeStopName } from "../getStopsByName";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stopId: string }>;
}): Promise<Metadata> {
  const stopId = (await params).stopId;
  const stopPlaceResponse = await fetchStopPlace(stopId);
  const stopPlace =
    stopPlaceResponse.Siri?.ServiceDelivery?.DataObjectDelivery?.dataObjects
      ?.SiteFrame?.stopPlaces?.StopPlace;

  return {
    title: `Stop #${stopId} - Muni On the Go`,
    description: `Live departures for Muni buses and trains at ${
      stopPlace?.Name ? stopPlace.Name : `#${stopId}`
    }`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ stopId: string }>;
}) {
  const stopIdSlug = (await params).stopId;

  const stopId = parseInt(stopIdSlug);
  if (isNaN(stopId)) notFound();

  const [stopPlaceResponse, stopMonitoringResponse] = await Promise.all([
    fetchStopPlace(stopId),
    fetchStopMonitoring(stopId),
  ]);

  const stopPlace =
    stopPlaceResponse.Siri?.ServiceDelivery?.DataObjectDelivery?.dataObjects
      ?.SiteFrame?.stopPlaces?.StopPlace;

  const stopVisits =
    stopMonitoringResponse.ServiceDelivery?.StopMonitoringDelivery?.MonitoredStopVisit?.map(
      (stopVisit) => stopVisit.MonitoredVehicleJourney
    );

  if (!stopPlace || !stopVisits) notFound();

  const firstStopVisit = stopVisits.at(0);

  return (
    <main>
      <header>
        <Breadcrumbs
          links={[
            <span className="-ml-1" key={stopPlace.PublicCode}>
              🚏
            </span>,
          ]}
        />
        <div className="flex items-center justify-between mt-3 gap-2">
          <div>
            <h1 className="text-xl font-bold leading-tight">
              <Link
                className="hover:underline"
                href={`//maps.apple.com?q=${encodeURIComponent(
                  `${stopPlace.PostalAddress.AddressLine1}, ${stopPlace.PostalAddress.Town}`
                )}`}
              >
                {stopPlace.Name}
              </Link>
            </h1>
            <Link
              href={`/stop/group/${encodeURIComponent(
                normalizeStopName(stopPlace.Name)
              )}`}
              className="text-xs hover:underline"
            >
              Show parent station
            </Link>
          </div>
          {firstStopVisit && (
            <FavoriteStopButton
              stopOptions={{
                name: stopPlace.Name,
                id: stopPlace["@id"],
                direction: firstStopVisit.DirectionRef,
              }}
            />
          )}
        </div>
      </header>

      <section className="my-3">
        {stopVisits?.length ? (
          <StopVisitsList stopVisits={stopVisits} />
        ) : (
          <Alert label="Upcoming departures are not available. Refresh to try again." />
        )}
      </section>
      <DataAttribution />
    </main>
  );
}
