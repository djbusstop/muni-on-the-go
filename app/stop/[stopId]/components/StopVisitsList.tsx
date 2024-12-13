import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import RelativeTime, { getRelativeMinutes } from "@/ui/RelativeTime";
import clsx from "clsx";
import ListItemLink from "@/ui/ListItemLink";

dayjs.extend(relativeTime);

const StopVisitsList = ({
  stopVisits,
}: {
  stopVisits: MonitoredVehicleJourney[];
}) => {
  return (
    <ul className="flex flex-col list-none gap-4">
      {stopVisits.map((stopVisit, index) => {
        const scheduledTime = stopVisit.MonitoredCall
          ? new Date(stopVisit.MonitoredCall?.AimedArrivalTime)
          : null;

        const expectedTime = stopVisit.MonitoredCall
          ? new Date(
              stopVisit.MonitoredCall.ExpectedArrivalTime ||
                stopVisit.MonitoredCall.ExpectedDepartureTime ||
                stopVisit.MonitoredCall.AimedArrivalTime
            )
          : null;

        const delayInMinutes =
          scheduledTime && expectedTime
            ? getRelativeMinutes(new Date(), expectedTime)
            : null;

        return (
          <ListItemLink
            key={index + stopVisit.DatedVehicleJourneyRef}
            href={
              stopVisit.VehicleRef
                ? `/vehicle/${stopVisit.VehicleRef}`
                : undefined
            }
          >
            {/* Row */}
            <div className={clsx(["flex", "items-center", "gap-2"])}>
              {/* Left col */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-md font-semibold">
                  {stopVisit.LineRef} {stopVisit.PublishedLineName}{" "}
                  {/* If there is vehicle monitoring */}
                  {stopVisit.VehicleRef && "📍"}
                </h3>
                <span className="text-sm">to {stopVisit.DestinationName}</span>
                {scheduledTime && expectedTime && (
                  <span className="text-xs mt-0.5">
                    <RelativeTime
                      hideIfOnTime
                      scheduled={scheduledTime}
                      expected={expectedTime}
                    />
                  </span>
                )}
              </div>
              {/* Right col */}
              <div className="shrink-0 text-center leading-none">
                <p className="text-xl leading-none">{delayInMinutes}</p>
                <span className="text-sm text-secondary">min</span>
              </div>
            </div>
          </ListItemLink>
        );
      })}
    </ul>
  );
};
export default StopVisitsList;
