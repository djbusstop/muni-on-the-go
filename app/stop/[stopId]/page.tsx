import { notFound } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import fetchStopMonitoring from "./fetchStopMonitoring";
import StopVisitsList from "./components/StopVisitsList";

dayjs.extend(relativeTime);

export default async function Page({
  params,
}: {
  params: Promise<{ stopId: string }>;
}) {
  const stopIdSlug = (await params).stopId;

  const stopId = parseInt(stopIdSlug);
  if (isNaN(stopId)) notFound();

  const stopMonitoringResponse = await fetchStopMonitoring(stopId);
  const stopVisits =
    stopMonitoringResponse.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit.map(
      (stopVisit) => stopVisit.MonitoredVehicleJourney
    );
  const currentStop = stopVisits.at(0)?.MonitoredCall;

  if (!currentStop) notFound();

  return (
    <main>
      <h1 className="text-4xl leading-loose font-bold">
        Stop #{currentStop?.StopPointRef}
      </h1>
      {currentStop?.StopPointName && (
        <h3 className="text-xl font-bold">{currentStop.StopPointName}</h3>
      )}

      <div className="mt-6">
        <StopVisitsList stopVisits={stopVisits} />
      </div>
    </main>
  );
}
