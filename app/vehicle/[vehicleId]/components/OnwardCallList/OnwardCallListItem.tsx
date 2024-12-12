import Link from "next/link";
import RelativeTime from "./RelativeTime";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const OnwardCallListItem = ({
  nextStop,
  onwardCall,
}: {
  nextStop: boolean;
  onwardCall: OnwardCall | MonitoredCall;
}) => {
  const expectedArrivalTime = new Date(
    onwardCall.ExpectedArrivalTime ||
      onwardCall.ExpectedDepartureTime ||
      onwardCall.AimedArrivalTime
  );
  const scheduledArrivalTime = new Date(onwardCall.AimedArrivalTime);

  const timeDifference = dayjs(scheduledArrivalTime).fromNow(true);

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
            scheduled={scheduledArrivalTime}
            expected={expectedArrivalTime}
          />{" "}
          • {expectedArrivalTime.toLocaleTimeString("en-US")}
        </p>
      </div>
      {/* Right col */}
      <div className="text-xl shrink-0">
        <span>{timeDifference}</span>
      </div>
    </li>
  );
};

export default OnwardCallListItem;
