import { notFound } from "next/navigation";
import fetchScheduledDepartures, {
  getStopVisits,
} from "./fetchScheduledDepartures";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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
  const stopVisits = getStopVisits(stopMonitoringResponse);
  const currentStop = stopVisits.at(0)?.TargetedCall;

  if (!currentStop) notFound();

  return (
    <main>
      <h1 className="text-4xl leading-loose font-bold">
        Stop #{currentStop?.StopPointRef}
      </h1>
      {currentStop?.StopPointName && (
        <h3 className="text-xl font-bold">{currentStop.StopPointName}</h3>
      )}

      <h2>Departures</h2>
      <ul>
        {stopVisits.map((stopVisit, index) => {
          const arrivalTime = dayjs(
            stopVisit.TargetedCall.ExpectedArrivalTime ||
              stopVisit.TargetedCall.AimedArrivalTime
          );

          const timeDifference = arrivalTime.fromNow();

          console.log(timeDifference);

          return (
            <li key={index}>
              {stopVisit.LineRef} {stopVisit.DirectionRef} {timeDifference}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
