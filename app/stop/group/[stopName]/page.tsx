import { notFound } from "next/navigation";
import DataAttribution from "@/ui/DataAttribution";
import Link from "next/link";
import Breadcrumbs from "@/ui/Breadcrumbs";
import fetchStops from "../../fetchStops";
import getStopsByName from "../../getStopsByName";
import fetchStopMonitoring from "../../fetchStopMonitoring";
import Alert from "@/ui/Alert";
import FavoriteStopButton from "@/app/favorites/FavoriteStopButton";
import StopVisitsList from "../../StopVisitsList";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stopName: string }>;
}): Promise<Metadata> {
  const stopName = (await params).stopName;
  const decodedStopName = decodeURIComponent(stopName);

  return {
    title: `${decodedStopName} - Muni On the Go`,
    description: `Live departures for Muni buses and trains at ${decodedStopName}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ stopName: string }>;
}) {
  const stopNameSlug = (await params).stopName;
  const stopName = decodeURIComponent(stopNameSlug);

  const stopsResponse = await fetchStops();

  const stops = getStopsByName(
    stopName,
    stopsResponse.Contents.dataObjects.ScheduledStopPoint
  );

  if (stops.length === 0) notFound();

  const stopMonitoringResponses = await Promise.allSettled(
    stops.map((stop) => fetchStopMonitoring(stop.id))
  );

  // All stop visits sorted by arrival time
  const stopVisits = stopMonitoringResponses
    .reduce((acc: MonitoredVehicleJourney<MonitoredCall>[], response) => {
      if (response.status === "fulfilled") {
        return [
          ...acc,
          ...response.value.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit.map(
            (stopVisit) => stopVisit.MonitoredVehicleJourney
          ),
        ];
      }
      return acc;
    }, [])
    .sort((firstVisit, secondVisit) => {
      return (
        new Date(
          firstVisit.MonitoredCall.ExpectedArrivalTime ||
            firstVisit.MonitoredCall.ExpectedDepartureTime ||
            firstVisit.MonitoredCall.AimedArrivalTime
        ).getTime() -
        new Date(
          secondVisit.MonitoredCall.ExpectedArrivalTime ||
            secondVisit.MonitoredCall.ExpectedDepartureTime ||
            secondVisit.MonitoredCall.AimedArrivalTime
        ).getTime()
      );
    });

  return (
    <main>
      <header>
        <Breadcrumbs
          links={[
            <span key="stop">Stop</span>,
            <span key={stopName}>{stopName}</span>,
          ]}
        />
        <div className="flex items-center justify-between mt-3">
          <h1 className="text-xl font-bold">
            <Link
              className="hover:underline"
              href={`//maps.apple.com?q=${encodeURIComponent(
                `${stopName}, San Francisco`
              )}`}
            >
              {stopName}
            </Link>
          </h1>
          <FavoriteStopButton stopOptions={{ name: stopName }} />
        </div>
      </header>

      <section className="my-3">
        {stopVisits?.length ? (
          <StopVisitsList stopVisits={stopVisits} />
        ) : (
          <Alert label="Upcoming departures are not available right now." />
        )}
      </section>
      <DataAttribution />
    </main>
  );
}
