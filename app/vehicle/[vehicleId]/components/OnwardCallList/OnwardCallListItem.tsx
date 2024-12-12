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
      className="flex items-center p-3"
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
      <div className="flex flex-col flex-grow gap-1">
        {nextStop && <span className="text-secondary text-xs">Next stop</span>}
        <Link
          href={`/stop/${onwardCall.StopPointRef}`}
          className="hover:underline"
        >
          <h3 className="font-bold text-md">{onwardCall.StopPointName}</h3>
        </Link>
        <span className="text-xs">
          <RelativeTime
            scheduled={scheduledArrivalTime.toDate()}
            expected={expectedArrivalTime.toDate()}
          />
        </span>
      </div>
      {/* Right col */}
      <div className="text-md shrink-0">
        <span>{expectedArrivalTime.format("HH:mm")}</span>
      </div>
    </li>
  );
};

export default OnwardCallListItem;
