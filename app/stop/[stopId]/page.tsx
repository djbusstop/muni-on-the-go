import { notFound } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import fetchStopMonitoring from "./fetchStopMonitoring";

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
      {/* <h1 className="text-4xl leading-loose font-bold">
        Stop #{currentStop?.StopPointRef}
      </h1>
      {currentStop?.StopPointName && (
        <h3 className="text-xl font-bold">{currentStop.StopPointName}</h3>
      )} */}

      <h2>Departures</h2>
      {/* <ul>
        {stopVisits.map((stopVisit, index) => {
          const arrivalTime = dayjs(
            stopVisit.TargetedCall.ExpectedArrivalTime ||
              stopVisit.TargetedCall.AimedArrivalTime
          );

          const timeDifference = arrivalTime.fromNow();

          console.log(timeDifference);

          return (
            <li key={index}>
              <Link href={`/vehicle`}>
                {stopVisit.LineRef} {stopVisit.DirectionRef} {timeDifference}
              </Link>
            </li>
          );
        })}
      </ul> */}
    </main>
  );
}
