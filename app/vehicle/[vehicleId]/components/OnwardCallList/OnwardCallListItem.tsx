import Link from "next/link";
import RelativeTime from "../../../../../ui/RelativeTime";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

const OnwardCallListItem = ({
  nextStop,
  onwardCall,
}: {
  nextStop: boolean;
  onwardCall: OnwardCall | MonitoredCall;
}) => {
  const expectedArrivalTime = dayjs(
    onwardCall.ExpectedArrivalTime ||
      onwardCall.ExpectedDepartureTime ||
      onwardCall.AimedArrivalTime
  );
  const scheduledArrivalTime = dayjs(onwardCall.AimedArrivalTime);

  return (
    <li
      className="flex items-center p-4"
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
      {/* Left col */}
      <div className="flex flex-col flex-grow">
        {nextStop && <span className="text-secondary">Next stop</span>}
        <Link
          href={`/stop/${onwardCall.StopPointRef}`}
          className="hover:underline"
        >
          <h3 className="mb-1 font-bold text-xl">{onwardCall.StopPointName}</h3>
        </Link>
        <p>
          <RelativeTime
            scheduled={scheduledArrivalTime.toDate()}
            expected={expectedArrivalTime.toDate()}
          />
        </p>
      </div>
      {/* Right col */}
      <div className="text-xl shrink-0">
        <span>{expectedArrivalTime.format("LT")}</span>
      </div>
    </li>
  );
};

export default OnwardCallListItem;
