import dayjs from "dayjs";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import RelativeTime, { getRelativeMinutes } from "@/ui/RelativeTime";

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
            className="flex items-center gap-4 p-4"
            style={{
              backgroundColor: "whitesmoke",
              borderTopRightRadius: "5px",
              borderTopLeftRadius: "5px",
              borderLeft: "1px solid lightgrey",
              borderRight: "1px solid lightgrey",
              borderTop: "1px solid lightgrey",
              borderBottom: "5px solid #cd3545",
            }}
          >
            <div className="flex flex-col flex-grow">
              <h3 className="text-md font-semibold flex-grow">
                {stopVisit.LineRef} {stopVisit.PublishedLineName}
              </h3>
              <span className="text-sm">to {stopVisit.DestinationName}</span>
              {scheduledTime && expectedTime && (
                <span className="text-xs mt-1">
                  <RelativeTime
                    hideIfOnTime
                    scheduled={scheduledTime}
                    expected={expectedTime}
                  />
                </span>
              )}
            </div>
            <div className="shrink-0 text-center leading-none">
              {stopVisit.VehicleRef ? (
                <Link
                  href={`/vehicle/${stopVisit.VehicleRef}`}
                  className="hover:underline "
                >
                  <p className="text-xl leading-none">{delayInMinutes}</p>
                  <span className="text-sm text-secondary">min</span>
                </Link>
              ) : (
                <>
                  <p className="text-xl leading-none">{delayInMinutes}</p>
                  <span className="text-sm text-secondary">min</span>
                </>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default StopVisitsList;
