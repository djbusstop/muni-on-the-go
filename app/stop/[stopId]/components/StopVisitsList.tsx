import dayjs from "dayjs";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import RelativeTime from "@/ui/RelativeTime";

dayjs.extend(relativeTime);

const StopVisitsList = ({
  stopVisits,
}: {
  stopVisits: MonitoredVehicleJourney[];
}) => {
  return (
    <ul className="flex flex-col list-none gap-4">
      {stopVisits.map((stopVisit, index) => {
        const arrivalTime = dayjs(
          stopVisit.MonitoredCall?.ExpectedArrivalTime ||
            stopVisit.MonitoredCall?.ExpectedDepartureTime ||
            stopVisit.MonitoredCall?.AimedArrivalTime
        );
        const timeDifference = arrivalTime.fromNow(true);
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
              <h3 className="text-2xl font-bold flex-grow">
                {stopVisit.LineRef} {stopVisit.PublishedLineName}
              </h3>
              <span>
                to {stopVisit.DestinationName}{" "}
                {stopVisit.MonitoredCall?.AimedDepartureTime && (
                  <>
                    •{" "}
                    <RelativeTime
                      scheduled={
                        new Date(stopVisit.MonitoredCall?.AimedArrivalTime)
                      }
                      expected={arrivalTime.toDate()}
                    />
                  </>
                )}
              </span>
            </div>
            <div className="text-xl shrink-0">
              {stopVisit.VehicleRef ? (
                <Link
                  href={`/vehicle/${stopVisit.VehicleRef}`}
                  className="hover:underline "
                >
                  {timeDifference}
                </Link>
              ) : (
                timeDifference
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default StopVisitsList;
