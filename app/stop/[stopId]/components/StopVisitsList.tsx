import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import RelativeTime, { getRelativeMinutes } from "@/ui/RelativeTime";
import OptionalLink from "@/ui/OptionalLink";
import clsx from "clsx";

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
          <li
            key={index}
            style={{
              borderTopRightRadius: "5px",
              borderTopLeftRadius: "5px",
              borderLeft: "1px solid lightgrey",
              borderRight: "1px solid lightgrey",
              borderTop: "1px solid lightgrey",
              borderBottom: "3px solid #cd3545",
            }}
          >
            <OptionalLink
              href={
                stopVisit.VehicleRef
                  ? `/vehicle/${stopVisit.VehicleRef}`
                  : undefined
              }
            >
              {/* Row */}
              <div
                className={clsx([
                  "flex",
                  "items-center",
                  "gap-2",
                  "p-3",
                  "bg-stone-100",
                  stopVisit.VehicleRef && [
                    "hover:bg-stone-200",
                    "active:bg-stone-200",
                  ],
                ])}
              >
                {/* Left col */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-md font-semibold">
                    {stopVisit.LineRef} {stopVisit.PublishedLineName}
                  </h3>
                  <span className="text-sm">
                    to {stopVisit.DestinationName}
                  </span>
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
            </OptionalLink>
          </li>
        );
      })}
    </ul>
  );
};
export default StopVisitsList;
