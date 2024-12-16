import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import RelativeTime, { getRelativeMinutes } from "@/ui/RelativeTime";
import clsx from "clsx";
import ListItemLink from "@/ui/ListItemLink";
import RouteDisplay from "@/ui/RouteDisplay";
import DirectionPicker from "@/ui/DirectionPicker";

dayjs.extend(relativeTime);

const StopVisitsList = ({
  direction,
  stopVisits,
}: {
  direction?: Direction;
  stopVisits: MonitoredVehicleJourney<MonitoredCall>[];
}) => {
  // Available directions. There will be at least one stop with each direction
  const directions = stopVisits.reduce((acc: Direction[], stopVisit) => {
    if (!acc.includes(stopVisit.DirectionRef))
      return [...acc, stopVisit.DirectionRef];
    return acc;
  }, []);

  // Filter stop visits by direction
  const filteredStopVisits = direction
    ? stopVisits.filter((stopVisit) => {
        return stopVisit.DirectionRef === direction;
      })
    : stopVisits;

  return (
    <>
      {directions.length >= 2 && (
        <div className="mb-2">
          <DirectionPicker value={direction} directions={directions} />
        </div>
      )}
      <ul className="flex flex-col list-none gap-3">
        {filteredStopVisits.map((stopVisit, index) => {
          const scheduledTime = new Date(
            stopVisit.MonitoredCall?.AimedArrivalTime
          );

          const expectedTime = new Date(
            stopVisit.MonitoredCall.ExpectedArrivalTime ||
              stopVisit.MonitoredCall.ExpectedDepartureTime ||
              stopVisit.MonitoredCall.AimedArrivalTime
          );

          const delayInMinutes = getRelativeMinutes(new Date(), expectedTime);

          return (
            <ListItemLink
              key={index.toString() + stopVisit.DatedVehicleJourneyRef}
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
                    <RouteDisplay route={stopVisit.LineRef} />{" "}
                    {stopVisit.PublishedLineName}{" "}
                  </h3>
                  <span className="text-sm">
                    {stopVisit.DirectionRef} to {stopVisit.DestinationName}
                  </span>
                  <span className="text-xs mt-0.5">
                    <RelativeTime
                      hideIfOnTime
                      scheduled={scheduledTime}
                      expected={expectedTime}
                    />
                  </span>
                </div>
                {/* Right col */}
                <div
                  // If there is no vehicle monitoring, greyscale the text
                  className={`shrink-0 text-center leading-none ${
                    stopVisit.VehicleRef ? "" : "text-secondary"
                  } `}
                >
                  <p className="text-xl leading-none">{delayInMinutes}</p>
                  <span className="text-sm text-secondary">min</span>
                </div>
              </div>
            </ListItemLink>
          );
        })}
      </ul>
    </>
  );
};
export default StopVisitsList;
