import { notFound } from "next/navigation";
import DataAttribution from "@/ui/DataAttribution";
import Link from "next/link";
import Breadcrumbs from "@/ui/Breadcrumbs";
import fetchStops from "../../fetchStops";
import getStopsByName from "../../getStopsByName";
import fetchStopMonitoring from "../../fetchStopMonitoring";
import StopVisitsList from "../../components/StopVisitsList";
import Alert from "@/ui/Alert";
import FavoriteStopButton from "@/app/favorites/FavoriteStopButton";

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

  const stopVisits = stopMonitoringResponses.reduce(
    (acc: MonitoredVehicleJourney[], response) => {
      if (response.status === "fulfilled") {
        return [
          ...acc,
          ...response.value.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit.map(
            (stopVisit) => stopVisit.MonitoredVehicleJourney
          ),
        ];
      }
      return acc;
    },
    []
  );

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
