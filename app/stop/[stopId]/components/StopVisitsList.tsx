import dayjs from "dayjs";
import Link from "next/link";

const StopVisitsList = ({
  stopVisits,
}: {
  stopVisits: MonitoredVehicleJourney[];
}) => {
  const stopsByLine: Record<string, MonitoredVehicleJourney[]> = {};
  for (const stopVisit of stopVisits) {
    const lineName = stopVisit.LineRef;
    if (lineName in stopsByLine) {
      stopsByLine[lineName] = [...stopsByLine[lineName], stopVisit];
    } else {
      stopsByLine[lineName] = [stopVisit];
    }
  }

  return (
    <ul className="flex flex-col list-none gap-4">
      {Object.entries(stopsByLine).map(([lineName, stopVisits], index) => {
        return (
          <li
            key={index}
            className="flex items-center p-4 gap-4"
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
            <h3 className="text-2xl font-bold flex-grow">{lineName} </h3>
            {stopVisits.length > 0 && (
              <div>
                {stopVisits.map((stopVisit, stopVisitIndex) => {
                  const arrivalTime = dayjs(
                    stopVisit.MonitoredCall?.ExpectedArrivalTime ||
                      stopVisit.MonitoredCall?.AimedArrivalTime
                  );
                  const timeDifference = arrivalTime.fromNow(true);
                  return (
                    <>
                      {stopVisit.VehicleRef ? (
                        <Link
                          href={`/vehicle/${stopVisit.VehicleRef}`}
                          className="hover:underline"
                        >
                          {timeDifference}
                        </Link>
                      ) : (
                        timeDifference
                      )}

                      {stopVisitIndex < stopVisits.length - 1 ? ", " : ""}
                    </>
                  );
                })}
              </div>
            )}
            {stopVisits.length === 0 && <span>No upcoming arrivals</span>}
          </li>
        );
      })}
    </ul>
  );
};
export default StopVisitsList;
