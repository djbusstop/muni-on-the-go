import { notFound } from "next/navigation";
import fetchStopMonitoring from "./fetchStopMonitoring";
import StopVisitsList from "./components/StopVisitsList";
import FavoriteStopButton from "../../favorites/FavoriteStopButton";

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
  const currentStop = stopVisits.at(0);
  const currentStopCall = currentStop?.MonitoredCall;

  if (!currentStop || !currentStopCall) notFound();

  return (
    <main>
      <header className="flex items-center">
        <div className="flex-grow">
          <h1 className="text-4xl leading-loose font-bold">
            Stop #{currentStopCall?.StopPointRef}
          </h1>
          {currentStopCall?.StopPointName && (
            <h3 className="text-xl font-bold">
              {currentStopCall.StopPointName}
            </h3>
          )}
        </div>
        <FavoriteStopButton currentStop={currentStop} />
      </header>

      <div className="mt-6">
        <StopVisitsList stopVisits={stopVisits} />
      </div>
    </main>
  );
}
